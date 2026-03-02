/**
 * Error message type for tagged errors
 */
export type ErrorMsg = {
  msg?: string
  cause?: unknown
}

/**
 * Creates an error factory function for tagged errors
 *
 * @example
 * ```typescript
 * class UserNotFoundError extends Data.TaggedError('Repository/User/NotFound')<ErrorMsg> {
 *   static new = createErrorFactory(this)
 * }
 *
 * // Usage with caught error
 * yield* Effect.fail(UserNotFoundError.new('User not found')(error))
 *
 * // Usage without cause
 * yield* Effect.fail(UserNotFoundError.new('User not found')())
 * ```
 */
export function createErrorFactory<T extends new (args: ErrorMsg) => InstanceType<T>>(
  ErrorClass: T
): (message?: string) => (cause?: unknown) => InstanceType<T> {
  return (message?: string) => (cause?: unknown) => {
    return new ErrorClass({
      msg: message,
      cause,
    }) as InstanceType<T>
  }
}

/**
 * Helper to extract error message from unknown error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'Unknown error'
}
