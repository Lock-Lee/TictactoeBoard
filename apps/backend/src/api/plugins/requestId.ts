import { Elysia } from 'elysia'
import { v4 as uuidv4 } from 'uuid'
import { createRequestLogger, logger } from '../../libs/logger'

// ANSI color codes
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
}

// Sensitive fields to mask in logs
const sensitiveFields = ['password', 'token', 'refreshToken', 'secret', 'apiKey', 'authorization']

// Mask sensitive data in object
const maskSensitive = (obj: unknown): unknown => {
  if (!obj || typeof obj !== 'object') return obj
  const masked: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (sensitiveFields.includes(key.toLowerCase())) {
      masked[key] = '***'
    } else if (typeof value === 'object') {
      masked[key] = maskSensitive(value)
    } else {
      masked[key] = value
    }
  }
  return masked
}

// Get emoji and color based on status code
const getStatusStyle = (status: number) => {
  if (status >= 200 && status < 300) {
    return { emoji: '😊', color: colors.green }
  }
  if (status >= 400 && status < 500) {
    return { emoji: '😠', color: colors.red }
  }
  if (status >= 500) {
    return { emoji: '💀', color: colors.red }
  }
  return { emoji: '🤔', color: colors.yellow }
}

export const requestIdPlugin = new Elysia({ name: 'requestId' })
  .derive({ as: 'global' }, ({ headers, request }) => {
    // Get request ID from header or generate new one
    const requestId = (headers['x-request-id'] as string) || uuidv4()
    const requestLogger = createRequestLogger(requestId)

    // Log incoming request
    const method = request.method
    const url = new URL(request.url)
    const path = url.pathname

    // Build query string if exists
    const queryParams = Object.fromEntries(url.searchParams)
    const queryStr = Object.keys(queryParams).length > 0 ? ` ?${JSON.stringify(queryParams)}` : ''

    requestLogger.info(`--> ${method} ${path}${queryStr}`)

    return {
      requestId,
      log: requestLogger,
    }
  })
  .onAfterResponse({ as: 'global' }, ({ request, log, set }) => {
    const method = request.method
    const url = new URL(request.url)
    const path = url.pathname
    const status = typeof set.status === 'number' ? set.status : 200
    const { emoji, color } = getStatusStyle(status)

    // Use log if available from derive, otherwise use base logger
    const responseLogger = log ?? logger
    responseLogger.info(`${emoji} ${color}<-- ${method} ${path} ${status}${colors.reset}`)
  })
  .onError({ as: 'global' }, ({ error, request, requestId, log, set }) => {
    const method = request.method
    const url = new URL(request.url)
    const path = url.pathname
    const status = typeof set.status === 'number' ? set.status : 500
    const { emoji, color } = getStatusStyle(status)

    // Add request ID to response headers for error responses
    set.headers['x-request-id'] = requestId

    // Use log if available from derive, otherwise use base logger
    const errorLogger = log ?? logger
    // Get short error message
    let errorMsg = ''
    if (error instanceof Error) {
      errorMsg = (error.message?.split('\n')[0] ?? '').slice(0, 100) // First line, max 100 chars
    } else {
      errorMsg = String(error).slice(0, 100)
    }
    errorLogger.error(
      `${emoji} ${color}!!! ${method} ${path} ${status} - ${errorMsg}${colors.reset}`
    )
  })
  .onBeforeHandle({ as: 'global' }, ({ body, params, log, request }) => {
    const reqLogger = log ?? logger
    const method = request.method

    // Log body for POST, PUT, PATCH requests (mask sensitive data)
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      reqLogger.info(`    body: ${JSON.stringify(maskSensitive(body))}`)
    }

    // Log params if exists
    if (params && Object.keys(params).length > 0) {
      reqLogger.info(`    params: ${JSON.stringify(params)}`)
    }
  })
  .onTransform({ as: 'global' }, ({ set, requestId }) => {
    // Set request ID header early (before validation) to ensure it's included in all responses
    set.headers['x-request-id'] = requestId
  })
  .onAfterHandle({ as: 'global' }, ({ set, requestId }) => {
    // Add request ID to response headers (ensure it's set)
    set.headers['x-request-id'] = requestId
  })
