export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// List of allowed API origins - only these URLs can receive requests with credentials
export const ALLOWED_ORIGINS: string[] = [
  API_BASE_URL,
  // Add additional allowed origins here if needed
].filter(Boolean)

// Credentials mode for fetch requests
// 'include' - send credentials (cookies, auth headers) with cross-origin requests
// 'same-origin' - only send credentials to same-origin URLs
// 'omit' - never send credentials
export const CREDENTIALS_MODE: RequestCredentials = 'include'

export const DEFAULT_CLIENT_REQUEST_HEADERS = {
  'Content-Type': 'application/json',
}

/**
 * Validates if a URL is allowed to receive requests with credentials
 * Prevents credential leakage to unauthorized domains
 */
export function isAllowedOrigin(url: string): boolean {
  try {
    const targetUrl = new URL(url, window.location.origin)
    const targetOrigin = targetUrl.origin

    return ALLOWED_ORIGINS.some((allowedUrl) => {
      const allowed = new URL(allowedUrl)
      return allowed.origin === targetOrigin
    })
  } catch {
    return false
  }
}

/**
 * Builds a full URL and validates it against allowed origins
 * Throws an error if the URL is not in the allowed list
 */
export function buildAndValidateUrl(path: string, baseUrl: string = API_BASE_URL): string {
  const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path}`

  if (!isAllowedOrigin(fullUrl)) {
    throw new Error(`Request blocked: ${fullUrl} is not in the allowed origins list`)
  }

  return fullUrl
}
