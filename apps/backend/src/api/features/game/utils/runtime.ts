import { ManagedRuntime } from 'effect'
import { CacheProviderDefault } from '../../../providers/cache'

const GAME_DEPENDENCIES = CacheProviderDefault()
export const GAME_RUNTIME = ManagedRuntime.make(GAME_DEPENDENCIES)
