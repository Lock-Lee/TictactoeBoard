import { Data, Effect } from 'effect'
import { prisma } from '../../../../config/database'
import { createErrorFactory, type ErrorMsg } from '../../../../libs/effect'

export class FindOrCreatePlayerError extends Data.TaggedError(
  'Repository/FindOrCreatePlayer/Error'
)<ErrorMsg> {
  static new = createErrorFactory(this)
}

interface FindOrCreatePlayerProps {
  email: string
  name: string | null
  image: string | null
  provider: string
  providerId: string
}

export const findOrCreatePlayerRepository = (props: FindOrCreatePlayerProps) => {
  return Effect.gen(function* () {
    const player = yield* Effect.tryPromise({
      try: () =>
        prisma.gamePlayer.upsert({
          where: {
            provider_providerId: {
              provider: props.provider,
              providerId: props.providerId,
            },
          },
          update: {
            name: props.name,
            image: props.image,
            email: props.email,
          },
          create: {
            email: props.email,
            name: props.name,
            image: props.image,
            provider: props.provider,
            providerId: props.providerId,
          },
        }),
      catch: (e) => FindOrCreatePlayerError.new('Failed to find or create player')(e),
    })

    return player
  })
}
