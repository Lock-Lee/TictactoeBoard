import { Context, Data, Duration, Effect, Layer, Option } from 'effect'
import Redis from 'ioredis'
import { createErrorFactory, type ErrorMsg } from '../../libs/effect'
import { logger } from '../../libs/logger'

// Error types
export class CacheGetError extends Data.TaggedError('Cache/Get/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class CacheSetError extends Data.TaggedError('Cache/Set/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class CacheGetOrSetError extends Data.TaggedError('Cache/GetOrSet/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class CacheRemoveError extends Data.TaggedError('Cache/Remove/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class CacheClearError extends Data.TaggedError('Cache/Clear/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}

// Service interface
export interface CacheService {
  get: <T>(key: string) => Effect.Effect<Option.Option<T>, CacheGetError>
  set: <T>(
    key: string,
    value: T,
    ttl?: Option.Option<Duration.Duration>
  ) => Effect.Effect<void, CacheSetError>
  getOrSet: <T, E>(
    key: string,
    factory: Effect.Effect<T, E>,
    ttl?: Option.Option<Duration.Duration>
  ) => Effect.Effect<T, E | CacheGetOrSetError>
  remove: (key: string) => Effect.Effect<void, CacheRemoveError>
  clear: (pattern?: string) => Effect.Effect<void, CacheClearError>
}

export const CacheProvider = Context.GenericTag<CacheService>('CacheProvider')

// Implementation
const makeCache = Effect.gen(function* () {
  // Check if Redis is enabled
  const redisUrl = process.env.REDIS_URL
  let redis: Redis | null = null

  if (redisUrl) {
    try {
      redis = new Redis(redisUrl)
      logger.info('Redis cache enabled')
    } catch (_error) {
      logger.warn('Redis connection failed, using memory cache')
    }
  } else {
    logger.info('Redis not configured, using memory cache')
  }

  // Memory cache fallback
  const memoryCache = new Map<string, { value: string; expiry: number }>()

  return CacheProvider.of({
    get: <T>(key: string) =>
      Effect.gen(function* () {
        try {
          if (redis) {
            const value = yield* Effect.tryPromise({
              try: () => redis.get(key),
              catch: (e) => CacheGetError.new('Failed to get from Redis cache')(e),
            })

            if (!value) return Option.none()
            return Option.some(JSON.parse(value) as T)
          }

          // Memory cache
          const cached = memoryCache.get(key)
          if (!cached) return Option.none()
          if (cached.expiry < Date.now()) {
            memoryCache.delete(key)
            return Option.none()
          }
          return Option.some(JSON.parse(cached.value) as T)
        } catch (error) {
          return yield* Effect.fail(CacheGetError.new('Failed to get from cache')(error))
        }
      }),

    set: <T>(key: string, value: T, ttl?: Option.Option<Duration.Duration>) =>
      Effect.gen(function* () {
        try {
          const serialized = JSON.stringify(value)
          const ttlSeconds = ttl ? Option.map(ttl, (d) => Duration.toSeconds(d)) : Option.none()

          if (redis) {
            if (Option.isSome(ttlSeconds)) {
              yield* Effect.tryPromise({
                try: () => redis.setex(key, ttlSeconds.value, serialized),
                catch: (e) => CacheSetError.new('Failed to set in Redis cache')(e),
              })
            } else {
              yield* Effect.tryPromise({
                try: () => redis.set(key, serialized),
                catch: (e) => CacheSetError.new('Failed to set in Redis cache')(e),
              })
            }
          } else {
            // Memory cache
            const expiry = Option.isSome(ttlSeconds)
              ? Date.now() + ttlSeconds.value * 1000
              : Date.now() + 3600000 // 1 hour default
            memoryCache.set(key, { value: serialized, expiry })
          }
        } catch (error) {
          return yield* Effect.fail(CacheSetError.new('Failed to set in cache')(error))
        }
      }),

    getOrSet: <T, E>(
      key: string,
      factory: Effect.Effect<T, E>,
      ttl?: Option.Option<Duration.Duration>
    ) =>
      Effect.gen(function* () {
        // Try to get from cache
        const getResult = yield* Effect.either(
          Effect.gen(function* () {
            if (redis) {
              const value = yield* Effect.tryPromise({
                try: () => redis.get(key),
                catch: (e) => CacheGetError.new('Failed to get from Redis cache')(e),
              })
              if (!value) return Option.none<T>()
              return Option.some(JSON.parse(value) as T)
            }

            const cached = memoryCache.get(key)
            if (!cached) return Option.none<T>()
            if (cached.expiry < Date.now()) {
              memoryCache.delete(key)
              return Option.none<T>()
            }
            return Option.some(JSON.parse(cached.value) as T)
          })
        )

        // If cache hit, return cached value
        if (getResult._tag === 'Right' && Option.isSome(getResult.right)) {
          return getResult.right.value
        }

        // Execute factory and cache result
        const value = yield* factory

        // Try to set cache, but don't fail if it errors
        yield* Effect.either(
          Effect.gen(function* () {
            const serialized = JSON.stringify(value)
            const ttlSeconds = ttl ? Option.map(ttl, (d) => Duration.toSeconds(d)) : Option.none()

            if (redis) {
              if (Option.isSome(ttlSeconds)) {
                yield* Effect.tryPromise({
                  try: () => redis.setex(key, ttlSeconds.value, serialized),
                  catch: (e) => CacheSetError.new('Failed to set in Redis cache')(e),
                })
              } else {
                yield* Effect.tryPromise({
                  try: () => redis.set(key, serialized),
                  catch: (e) => CacheSetError.new('Failed to set in Redis cache')(e),
                })
              }
            } else {
              const expiry = Option.isSome(ttlSeconds)
                ? Date.now() + ttlSeconds.value * 1000
                : Date.now() + 3600000
              memoryCache.set(key, { value: serialized, expiry })
            }
          })
        )

        return value
      }).pipe(
        Effect.catchAll((error) => Effect.fail(CacheGetOrSetError.new('Failed in getOrSet')(error)))
      ),

    remove: (key: string) =>
      Effect.gen(function* () {
        try {
          if (redis) {
            yield* Effect.tryPromise({
              try: () => redis.del(key),
              catch: (e) => CacheRemoveError.new('Failed to remove from Redis cache')(e),
            })
          } else {
            memoryCache.delete(key)
          }
        } catch (error) {
          return yield* Effect.fail(CacheRemoveError.new('Failed to remove from cache')(error))
        }
      }),

    clear: (pattern?: string) =>
      Effect.gen(function* () {
        try {
          if (redis) {
            if (pattern) {
              const keys = yield* Effect.tryPromise({
                try: () => redis.keys(pattern),
                catch: (e) => CacheClearError.new('Failed to find keys in Redis cache')(e),
              })

              if (keys.length > 0) {
                yield* Effect.tryPromise({
                  try: () => redis.del(...keys),
                  catch: (e) => CacheClearError.new('Failed to clear Redis cache')(e),
                })
              }
            } else {
              yield* Effect.tryPromise({
                try: () => redis.flushdb(),
                catch: (e) => CacheClearError.new('Failed to flush Redis cache')(e),
              })
            }
          } else {
            if (pattern) {
              const regex = new RegExp(pattern.replace('*', '.*'))
              for (const key of memoryCache.keys()) {
                if (regex.test(key)) {
                  memoryCache.delete(key)
                }
              }
            } else {
              memoryCache.clear()
            }
          }
        } catch (error) {
          return yield* Effect.fail(CacheClearError.new('Failed to clear cache')(error))
        }
      }),
  })
})

export const CacheProviderLive = Layer.effect(CacheProvider, makeCache)

export const CacheProviderDefault = () => Layer.mergeAll(CacheProviderLive)
