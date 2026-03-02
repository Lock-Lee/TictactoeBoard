import winston from 'winston'

const { combine, timestamp, printf, colorize, errors } = winston.format

// Custom format for console output (clean, minimal)
const consoleFormat = printf(({ level, message, timestamp, requestId }) => {
  // Show full request ID for easier debugging
  const reqId = requestId ? `[${String(requestId)}]` : ''
  return `${timestamp} ${level} ${reqId} ${message}`
})

// Custom format for file/JSON output
const jsonFormat = printf(({ level, message, timestamp, requestId, ...metadata }) => {
  return JSON.stringify({
    timestamp,
    level,
    requestId,
    message,
    ...metadata,
  })
})

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true })),
  defaultMeta: { service: 'tictactoe-backend' },
  transports: [
    // Console transport with colors
    new winston.transports.Console({
      format: combine(colorize({ all: true }), timestamp({ format: 'HH:mm:ss' }), consoleFormat),
    }),
  ],
})

// Add file transports in production
if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), jsonFormat),
    })
  )
  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), jsonFormat),
    })
  )
}

// Create child logger with request ID
export const createRequestLogger = (requestId: string) => {
  return logger.child({ requestId })
}

// Log levels helper
export const logLevels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
} as const

export type LogLevel = (typeof logLevels)[keyof typeof logLevels]
