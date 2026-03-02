import { Context, Data, Effect, Layer } from 'effect'
import * as jose from 'jose'
import { createErrorFactory, type ErrorMsg } from '../../libs/effect'
import { logger } from '../../libs/logger'

// Error types
export class TokenGenerationError extends Data.TaggedError(
  'Provider/Token/Generation/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class TokenVerificationError extends Data.TaggedError(
  'Provider/Token/Verification/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class JWKRotationError extends Data.TaggedError('Provider/JWK/Rotation/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}

// Token payload type
export interface TokenPayload {
  userId: string
  username: string
  roleId: string
  tenantId: string
  sessionId: string
}

// Token configuration
const TOKEN_CONFIG = {
  accessTokenExpiry: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
}

// Service interface
export interface TokenService {
  generateToken: (payload: TokenPayload) => Effect.Effect<string, TokenGenerationError>
  generateRefreshToken: (payload: TokenPayload) => Effect.Effect<string, TokenGenerationError>
  verifyToken: (token: string) => Effect.Effect<TokenPayload, TokenVerificationError>
  verifyRefreshToken: (token: string) => Effect.Effect<TokenPayload, TokenVerificationError>
  rotateJWK: () => Effect.Effect<void, JWKRotationError>
}

export const TokenProvider = Context.GenericTag<TokenService>('TokenProvider')

// Implementation
const makeTokenProvider = Effect.gen(function* () {
  // Get or create active JWK
  const getActiveJWK = Effect.gen(function* () {
    try {
      // For MVP, use simple secret-based JWT (not JWK)
      // Can be upgraded to JWK in production
      const secret = process.env.JWT_SECRET
      if (!secret) {
        return yield* Effect.fail(TokenGenerationError.new('JWT_SECRET not configured')())
      }

      return {
        secret: new TextEncoder().encode(secret),
        algorithm: 'HS256' as const,
      }
    } catch (error) {
      return yield* Effect.fail(TokenGenerationError.new('Failed to get JWK')(error))
    }
  })

  return TokenProvider.of({
    generateToken: (payload: TokenPayload) =>
      Effect.gen(function* () {
        try {
          const { secret, algorithm } = yield* getActiveJWK

          const token = yield* Effect.tryPromise({
            try: () =>
              new jose.SignJWT({ ...payload, type: 'access' } as jose.JWTPayload)
                .setProtectedHeader({ alg: algorithm })
                .setIssuedAt()
                .setExpirationTime(TOKEN_CONFIG.accessTokenExpiry)
                .sign(secret),
            catch: (e) => TokenGenerationError.new('Failed to sign JWT')(e),
          })

          return token
        } catch (error) {
          return yield* Effect.fail(TokenGenerationError.new('Failed to generate token')(error))
        }
      }),

    generateRefreshToken: (payload: TokenPayload) =>
      Effect.gen(function* () {
        try {
          const { secret, algorithm } = yield* getActiveJWK

          const token = yield* Effect.tryPromise({
            try: () =>
              new jose.SignJWT({ ...payload, type: 'refresh' } as jose.JWTPayload)
                .setProtectedHeader({ alg: algorithm })
                .setIssuedAt()
                .setExpirationTime(TOKEN_CONFIG.refreshTokenExpiry)
                .sign(secret),
            catch: (e) => TokenGenerationError.new('Failed to sign refresh token')(e),
          })

          return token
        } catch (error) {
          return yield* Effect.fail(
            TokenGenerationError.new('Failed to generate refresh token')(error)
          )
        }
      }),

    verifyToken: (token: string) =>
      Effect.gen(function* () {
        const { secret } = yield* Effect.mapError(getActiveJWK, (err) =>
          TokenVerificationError.new('Failed to get JWT secret')(err)
        )

        const { payload } = yield* Effect.tryPromise({
          try: () => jose.jwtVerify(token, secret),
          catch: (e) => TokenVerificationError.new('Invalid or expired token')(e),
        })

        // Validate payload structure and token type
        if (
          !payload.userId ||
          !payload.username ||
          !payload.roleId ||
          !payload.tenantId ||
          !payload.sessionId
        ) {
          return yield* Effect.fail(TokenVerificationError.new('Invalid token payload')())
        }

        // Allow tokens without type for backward compatibility, but reject refresh tokens
        if (payload.type && payload.type !== 'access') {
          return yield* Effect.fail(TokenVerificationError.new('Invalid token type')())
        }

        return payload as unknown as TokenPayload
      }),

    verifyRefreshToken: (token: string) =>
      Effect.gen(function* () {
        const { secret } = yield* Effect.mapError(getActiveJWK, (err) =>
          TokenVerificationError.new('Failed to get JWT secret')(err)
        )

        const { payload } = yield* Effect.tryPromise({
          try: () => jose.jwtVerify(token, secret),
          catch: (e) => TokenVerificationError.new('Invalid or expired refresh token')(e),
        })

        // Validate payload structure and token type
        if (
          !payload.userId ||
          !payload.username ||
          !payload.roleId ||
          !payload.tenantId ||
          !payload.sessionId
        ) {
          return yield* Effect.fail(TokenVerificationError.new('Invalid refresh token payload')())
        }

        if (payload.type !== 'refresh') {
          return yield* Effect.fail(
            TokenVerificationError.new('Invalid token type - expected refresh token')()
          )
        }

        return payload as unknown as TokenPayload
      }),

    rotateJWK: () =>
      Effect.succeed(
        // For MVP with HS256, rotation means updating JWT_SECRET
        // In production with RS256, this would generate new key pairs
        logger.info('JWK rotation not implemented for HS256 algorithm')
      ),
  })
})

export const TokenProviderLive = Layer.effect(TokenProvider, makeTokenProvider)

export const TokenProviderDefault = () => Layer.mergeAll(TokenProviderLive)
