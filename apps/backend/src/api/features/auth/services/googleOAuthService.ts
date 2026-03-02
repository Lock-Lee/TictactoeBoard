import { Data, Effect } from 'effect'
import * as jose from 'jose'
import { createErrorFactory, type ErrorMsg } from '../../../../libs/effect'
import { TokenProvider } from '../../../providers/token'
import {
  type FindOrCreatePlayerError,
  findOrCreatePlayerRepository,
} from '../repositories/findOrCreatePlayerRepository'

export class GoogleOAuthServiceError extends Data.TaggedError(
  'Service/GoogleOAuth/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

const GOOGLE_JWKS_URI = 'https://www.googleapis.com/oauth2/v3/certs'
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com']

interface GoogleOAuthServiceProps {
  credential: string
}

export const googleOAuthService = (props: GoogleOAuthServiceProps) => {
  return Effect.gen(function* () {
    // Verify Google ID token
    const googlePayload = yield* Effect.tryPromise({
      try: async () => {
        const JWKS = jose.createRemoteJWKSet(new URL(GOOGLE_JWKS_URI))
        const { payload } = await jose.jwtVerify(props.credential, JWKS, {
          issuer: GOOGLE_ISSUERS,
          audience: process.env.GOOGLE_CLIENT_ID,
        })
        return {
          email: payload.email as string,
          name: payload.name as string | null,
          picture: payload.picture as string | null,
          sub: payload.sub as string,
        }
      },
      catch: (e) => GoogleOAuthServiceError.new('Failed to verify Google ID token')(e),
    })

    // Find or create player
    const player = yield* findOrCreatePlayerRepository({
      email: googlePayload.email,
      name: googlePayload.name,
      image: googlePayload.picture,
      provider: 'google',
      providerId: googlePayload.sub,
    }).pipe(
      Effect.mapError((e: FindOrCreatePlayerError) =>
        GoogleOAuthServiceError.new(e.msg ?? 'Failed to sync player')()
      )
    )

    // Generate app token
    const tokenProvider = yield* TokenProvider
    const token = yield* tokenProvider
      .generateToken({
        userId: player.id,
        username: player.email,
        roleId: 'player',
        tenantId: 'game',
        sessionId: crypto.randomUUID(),
      })
      .pipe(
        Effect.mapError((e) => GoogleOAuthServiceError.new(e.msg ?? 'Failed to generate token')())
      )

    return {
      token,
      player: {
        id: player.id,
        email: player.email,
        name: player.name,
        image: player.image,
        score: player.score,
      },
    }
  })
}
