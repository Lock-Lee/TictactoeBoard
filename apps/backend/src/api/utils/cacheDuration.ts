import { Duration } from 'effect'

/**
 * Global cache duration configuration
 * Used across all services for consistent caching
 */
export const CACHE_DURATION = Duration.hours(1)
