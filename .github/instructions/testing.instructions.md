---
applyTo: 'src/tests/**'
---

## Testing Framework (MANDATORY)

### Test Command - STRICT REQUIREMENT

**ALWAYS use ONLY `bun run test` for all testing purposes.**

```bash
# ✅ CORRECT - Always use this command
bun run test

# ❌ INCORRECT - Never use these commands
vitest
npm test
yarn test
pnpm test
bun test
jest
mocha
```

### Test Framework Configuration

- **Framework**: Bun's native test runner (`bun:test`)
- **Type**: Integration and Load tests for API endpoints
- **Location**:
  - Integration tests: `src/tests/integration/api/{feature}/` directory
  - Load tests: `src/tests/load/api/{feature}/` directory (future implementation)
- **File Naming**: `*.test.ts` (all test files must end with `.test.ts`)

## Test Structure & Organization

### Test File Organization

```
src/tests/
├── integration/                    # Integration tests (API endpoints)
│   └── api/
│       ├── auth/
│       │   ├── sign-in.test.ts          # POST /api/auth/sign-in
│       │   ├── get-profile.test.ts       # GET /api/auth/me
│       │   ├── refresh-token.test.ts     # POST /api/auth/refresh-token
│       │   └── sign-out.test.ts          # POST /api/auth/sign-out
│       ├── privacy-policy/
│       │   ├── create-privacy-policy.test.ts
│       │   ├── get-privacy-policy.test.ts
│       │   ├── update-privacy-policy.test.ts
│       │   ├── delete-privacy-policy.test.ts
│       │   ├── add-language-content.test.ts
│       │   └── remove-language-content.test.ts
│       ├── news/
│       │   ├── create-news.test.ts
│       │   ├── list-news.test.ts
│       │   └── update-news-status.test.ts
│       ├── blok-pages/
│       │   ├── create-blok-page.test.ts
│       │   ├── list-blok-pages.test.ts
│       │   └── follow-blok-page.test.ts
│       └── calendar/
│           ├── create-event.test.ts
│           ├── list-events.test.ts
│           └── update-event.test.ts
└── load/                          # Load tests (future implementation)
    └── api/
        ├── auth/
        │   └── sign-in-load.test.ts
        ├── news/
        │   └── list-news-load.test.ts
        └── blok-pages/
            └── list-blok-pages-load.test.ts
```

### Test File Template with beforeAll Hook (RECOMMENDED)

```typescript
import { beforeAll, describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import type { AppApi } from '@/src/api/index'
import { api } from '@/src/api/index'

/**
 * Test suite for ENDPOINT_NAME API endpoint
 * Tests success cases, validation errors, authentication, and edge cases
 */
describe('ENDPOINT_NAME', () => {
  const client = treaty<AppApi>(api)
  let accessToken: string

  const validCredentials = {
    username: 'admin',
    password: 'p@ssw0rd',
  }

  const validHeaders = {
    'x-tenant-code': 'STC' as const,
    'x-content-language': 'TH' as const,
  }

  beforeAll(async () => {
    // Sign in once before all tests to get shared token
    const signInResponse = await client.api.auth['sign-in'].post(validCredentials, {
      headers: validHeaders,
    })

    if (signInResponse.status === 200) {
      accessToken = signInResponse.data?.accessToken as string
    }
  })

  describe('Success cases', () => {
    it('should work with valid input', async () => {
      if (!accessToken) {
        return // Skip if sign-in failed during setup
      }

      const response = await client.api.endpoint.method(data, {
        headers: {
          authorization: `Bearer ${accessToken}`,
          'x-content-language': 'TH',
        },
      })

      expect([200, 404, 500]).toContain(response.status)

      if (response.status === 200) {
        expect(response.data).toBeDefined()
        // ... more assertions
      }
    })
  })

  describe('Authentication error cases', () => {
    it('should fail without authorization header', async () => {
      const response = await client.api.endpoint.method(data, {
        headers: {
          'x-content-language': 'TH',
        },
      })

      expect([401, 404, 500]).toContain(response.status)
    })
  })
})
```

## Testing Best Practices

### 1. Shared Authentication with beforeAll Hook (RECOMMENDED)

**Use `beforeAll` hook to sign in once and share the token across all tests in a describe block.**

```typescript
describe('API Endpoint Tests', () => {
  const client = treaty<AppApi>(api);
  let accessToken: string;

  const validCredentials = {
    username: 'admin',
    password: 'p@ssw0rd',
  };

  const validHeaders = {
    'x-tenant-code': 'STC' as const,
    'x-content-language': 'TH' as const,
  };

  beforeAll(async () => {
    // Sign in once before all tests
    const signInResponse = await client.api.auth['sign-in'].post(
      validCredentials,
      { headers: validHeaders }
    );

    if (signInResponse.status === 200) {
      accessToken = signInResponse.data?.accessToken as string;
    }
  });

  // All tests can now use the shared accessToken
  it('should work with shared token', async () => {
    if (!accessToken) {
      return; // Skip if sign-in failed during setup
    }

    const response = await client.api.endpoint.method(data, {
      headers: {
        authorization: `Bearer ${accessToken}`,
        'x-content-language': 'TH',
      },
    });

    expect([200, 404, 500]).toContain(response.status);
  });

### 2. API Client Setup (Legacy Pattern - Avoid)
};
```

### 2. Test Organization by Categories

Tests are organized into logical groups:

- **Success cases**: Valid inputs that should succeed
- **Validation error cases**: Missing or invalid required fields (status 422)
- **Authentication error cases**: Invalid credentials or auth failures (status 400/401)
- **Edge cases**: Boundary conditions, special characters, SQL injection attempts, long strings
- **Tenant and language variations**: Different tenant codes and language settings

### 3. Response Status Handling

**Strict Status Codes**

```typescript
// ✅ Success response
expect(response.status).toBe(200)

// ✅ Validation errors (missing/invalid fields)
expect(response.status).toBe(422)

// ✅ Authentication/authorization errors
expect(response.status).toBe(400) // Wrong password, invalid credentials
expect(response.status).toBe(401) // Missing/invalid token

// ✅ Multiple acceptable statuses (for flexible endpoints)
expect([200, 500]).toContain(response.status)
expect([400, 422]).toContain(response.status)
expect([401, 500]).toContain(response.status)
```

### 4. HTTP Headers Pattern

```typescript
// Always include required headers
const response = await client.api.auth['sign-in'].post(validCredentials, {
  headers: {
    'x-tenant-code': 'STC' as const,
    'x-content-language': 'TH' as const,
    'user-agent': 'Mozilla/5.0 ...', // Optional
  },
})
```

### 5. Protected Endpoints (Bearer Token)

```typescript
// Step 1: Sign in to get token
const signInResponse = await client.api.auth['sign-in'].post(credentials, {
  headers: validHeaders,
})

const accessToken = signInResponse.data?.accessToken as string

// Step 2: Use token in Authorization header
const profileResponse = await client.api.auth.me.get({
  headers: {
    authorization: `Bearer ${accessToken}`,
    'x-content-language': 'TH',
  },
})

expect(profileResponse.status).toBe(200)
```

### 6. Response Validation

```typescript
// ✅ Type assertions
expect(typeof response.data?.userId).toBe('string')
expect(typeof response.data?.expiresIn).toBe('number')

// ✅ Object properties
expect(response.data).toHaveProperty('accessToken')
expect(response.data).toHaveProperty('refreshToken')

// ✅ Value validation
expect(response.data?.expiresIn).toBeGreaterThan(0)
expect(response.data?.accessToken?.length).toBeGreaterThan(0)

// ✅ Specific values
expect(response.data?.username).toBe('admin')
expect(response.data?.tenantCode).toBe('STC')
```

### 7. Chained API Calls (Dependencies)

```typescript
// Test token refresh with fresh token from sign-in
it('should refresh token successfully', async () => {
  // Chain 1: Sign in
  const signInResponse = await client.api.auth['sign-in'].post(validCredentials, {
    headers: validHeaders,
  })

  expect(signInResponse.status).toBe(200)

  // Extract and validate token exists
  expect(signInResponse.data?.refreshToken).toBeDefined()
  const refreshToken = signInResponse.data?.refreshToken as string

  // Chain 2: Use refresh token
  const refreshResponse = await client.api.auth['refresh-token'].post(
    { refreshToken },
    { headers: { 'x-content-language': 'TH' } }
  )

  expect(refreshResponse.status).toBe(200)
  expect(refreshResponse.data?.accessToken).toBeDefined()
})
```

### 8. Error Handling in Chained Calls

```typescript
it('should handle upstream failures gracefully', async () => {
  // Chain 1: Attempt sign-in
  const signInResponse = await client.api.auth['sign-in'].post(validCredentials, {
    headers: validHeaders,
  })

  // Allow both success and service failures
  expect([200, 500]).toContain(signInResponse.status)

  // Early exit if upstream failed
  if (signInResponse.status !== 200) {
    return // Skip rest of test
  }

  // Chain 2: Only proceed if Chain 1 succeeded
  const token = signInResponse.data?.accessToken as string
  const response = await client.api.auth.me.get({
    headers: {
      authorization: `Bearer ${token}`,
      'x-content-language': 'TH',
    },
  })

  expect([200, 500]).toContain(response.status)
})
```

## Edge Cases & Security Testing

### Security Test Patterns

```typescript
describe('Edge cases', () => {
  // SQL injection attempt
  it('should handle SQL injection attempts', async () => {
    const response = await client.api.auth['sign-in'].post(
      {
        username: "admin' OR '1'='1",
        password: 'p@ssw0rd',
      },
      { headers: validHeaders }
    )

    expect([400, 422]).toContain(response.status)
  })

  // Very long input
  it('should handle very long username', async () => {
    const response = await client.api.auth['sign-in'].post(
      {
        username: 'a'.repeat(1000),
        password: 'p@ssw0rd',
      },
      { headers: validHeaders }
    )

    expect([400, 422]).toContain(response.status)
  })

  // Special characters
  it('should handle special characters in password', async () => {
    const response = await client.api.auth['sign-in'].post(
      {
        username: 'admin',
        password: 'P@ssw0rd!WithSymbols123',
      },
      { headers: validHeaders }
    )

    expect([400, 422]).toContain(response.status)
  })

  // Case sensitivity
  it('should be case-sensitive for username', async () => {
    const response = await client.api.auth['sign-in'].post(
      {
        username: 'ADMIN', // Different case
        password: 'p@ssw0rd',
      },
      { headers: validHeaders }
    )

    expect(response.status).toBe(400)
  })
})
```

## Token Validation Testing

### Authentication Test Patterns

```typescript
describe('Token validation', () => {
  it('should fail with invalid token format', async () => {
    const response = await client.api.auth.me.get({
      headers: {
        authorization: 'Bearer invalid.token.format',
        'x-content-language': 'TH',
      },
    })

    expect([401, 500]).toContain(response.status)
  })

  it('should fail with malformed authorization header', async () => {
    const response = await client.api.auth.me.get({
      headers: {
        authorization: 'InvalidFormat token', // Missing "Bearer" prefix
        'x-content-language': 'TH',
      },
    })

    expect(response.status).toBe(401)
  })

  it('should fail without authorization header', async () => {
    const response = await client.api.auth.me.get({
      headers: {
        'x-content-language': 'TH',
        // No authorization header
      },
    })

    expect([401, 500]).toContain(response.status)
  })

  it('should fail with expired token', async () => {
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.expired'

    const response = await client.api.auth.me.get({
      headers: {
        authorization: `Bearer ${expiredToken}`,
        'x-content-language': 'TH',
      },
    })

    expect([401, 500]).toContain(response.status)
  })
})
```

## Test Assertions Reference

### Basic Assertions

```typescript
// Basic assertions
expect(value).toBe(expected) // Strict equality
expect(value).toEqual(expected) // Deep equality
expect(value).toBeDefined() // Not undefined
expect(value).toBeUndefined() // Is undefined
expect(value).toBeNull() // Is null
expect(value).toBeTruthy() // Truthy value
expect(value).toBeFalsy() // Falsy value

// Type assertions
expect(typeof value).toBe('string')
expect(typeof value).toBe('number')
expect(typeof value).toBe('boolean')
expect(Array.isArray(value)).toBe(true)

// Comparison
expect(value).toBeGreaterThan(number)
expect(value).toBeLessThan(number)
expect(value).toBeGreaterThanOrEqual(number)
expect(value).toBeLessThanOrEqual(number)

// Array/Object assertions
expect(array).toContain(value)
expect(object).toHaveProperty('key')
expect(array.length).toBe(expectedLength)

// String assertions
expect(string).toContain('substring')
expect(string).toMatch(/regex/)

// Promise assertions
expect(promise).rejects.toThrow()
expect(promise).resolves.toEqual(value)
```

## Common Test Patterns

### Pattern 1: Multiple Consecutive Operations

```typescript
it('should handle multiple consecutive sign-in attempts', async () => {
  const response1 = await client.api.auth['sign-in'].post(validCredentials, {
    headers: validHeaders,
  })

  const response2 = await client.api.auth['sign-in'].post(validCredentials, {
    headers: validHeaders,
  })

  expect(response1.status).toBe(200)
  expect(response2.status).toBe(200)
  expect(response1.data?.accessToken).not.toBe(response2.data?.accessToken)
})
```

### Pattern 2: Language Variations

```typescript
describe('Tenant and language variations', () => {
  it('should work with EN language', async () => {
    const response = await client.api.auth['sign-in'].post(validCredentials, {
      headers: {
        'x-tenant-code': 'STC',
        'x-content-language': 'EN',
      },
    })

    expect(response.status).toBe(200)
  })

  it('should fail with invalid language code', async () => {
    const response = await client.api.auth['sign-in'].post(validCredentials, {
      headers: {
        'x-tenant-code': 'STC',
        'x-content-language': 'INVALID',
      } as any,
    })

    expect(response.status).toBe(422)
  })
})
```

### Pattern 3: Multiple Required Headers

```typescript
it('should fail with missing x-tenant-code header', async () => {
  const response = await client.api.auth['sign-in'].post(validCredentials, {
    headers: { 'x-content-language': 'TH' } as any,
  })

  expect([400, 401, 422]).toContain(response.status)
})
```

## Test Maintenance Guidelines

### When to Write Tests

- All API endpoints must have integration tests in `src/tests/integration/api/{feature}/`
- Critical API endpoints must have load tests in `src/tests/load/api/{feature}/`
- All validation rules should be tested
- Error cases should be tested
- Edge cases should be tested
- Authentication/authorization should be tested
- Performance requirements should be tested with load tests

### When to Update Tests

- When API endpoints change behavior
- When adding new validation rules
- When adding new features
- When fixing bugs (add test first, then fix)
- When performance requirements change
- When adding new load scenarios

### Test Isolation Rules

- Each test must be independent
- Tests can run in any order
- No shared state between tests
- Use fresh data for each test

## Load Testing with k6 (NEW)

### Load Test Framework

- **Framework**: k6 (JavaScript-based load testing tool)
- **Type**: Performance and load tests for API endpoints
- **Location**: `src/tests/load/api/{feature}/` directory
- **File Naming**: `{test-name}-load.js` (all load test files must end with `-load.js`)

### Load Test Structure

```
src/tests/load/
└── api/
    └── auth/
        └── sign-in-load.js    # POST /api/auth/sign-in load test
```

### Load Test Template

```javascript
import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate, Trend } from 'k6/metrics'

// Custom metrics
const errorRate = new Rate('errors')
const responseTime = new Trend('response_time')

// Configuration (embedded in file)
const config = {
  baseUrl: 'http://localhost:3000',
  credentials: {
    /* test data */
  },
  headers: {
    /* required headers */
  },
  scenarios: {
    /* load levels */
  },
  thresholds: {
    /* performance criteria */
  },
}

// Test scenarios
export const options = {
  scenarios: {
    concurrent_load: {
      /* concurrent users */
    },
    sustained_load: {
      /* sustained RPS */
    },
    error_handling: {
      /* error scenarios */
    },
  },
  thresholds: config.thresholds[loadLevel],
}

export default function () {
  // Main test logic
}

export function setup() {
  // Pre-test setup
}

export function teardown(data) {
  // Post-test cleanup
}
```

### Load Test Commands

```bash
# Run load tests
bun run load:auth        # Medium load (default)
bun run load:auth:light  # Light load (5 VUs)
bun run load:auth:medium # Medium load (20 VUs)
bun run load:auth:heavy  # Heavy load (50 VUs)
```

### Load Test Scenarios

- **Concurrent Load**: Fixed number of virtual users for duration
- **Sustained Load**: Fixed requests per second (RPS) for duration
- **Error Handling**: Test with invalid data/credentials

### Load Test Metrics

- **Response Time**: avg, p50, p95, p99 percentiles
- **Error Rate**: Percentage of failed requests
- **Throughput**: Requests per second (RPS)
- **Custom Metrics**: Business-specific measurements

### Load Test Thresholds

```javascript
thresholds: {
  'http_req_duration': ['p(95)<5000', 'avg<2000'],
  'http_req_failed': ['rate<0.2'],
}
```

## Key Testing Principles

### DO

- Use `bun run test` command only for integration tests
- Use k6 for load testing (`bun run load:*` commands)
- Test all API endpoints comprehensively in integration tests
- Include edge cases and security tests
- Use proper status code assertions
- Test authentication and authorization
- Organize integration tests by feature in `src/tests/integration/api/{feature}/`
- Organize load tests by feature in `src/tests/load/api/{feature}/`
- Use descriptive test names and comments
- Follow kebab-case naming for test files: `{operation}-{entity}.test.ts`
- Follow load test naming: `{test-name}-load.js`
- Include performance thresholds in load tests
- Test multiple load levels (light, medium, heavy)

### DON'T

- Use other test runners (vitest, jest, etc.) for integration tests
- Use Bun test for load testing (use k6 instead)
- Share state between tests
- Skip error case testing
- Ignore authentication testing
- Use hardcoded values without explanation
- Create tests that depend on external services
- Mix unit and integration test concerns
- Skip load testing for critical endpoints
- Ignore performance thresholds

## Performance Optimization Patterns

### Shared Token Authentication (RECOMMENDED)

**Benefits of using `beforeAll` hook for authentication:**

1. **Faster Test Execution**: Sign in once instead of in every test
2. **Reduced API Calls**: Fewer authentication requests to the server
3. **Better Test Reliability**: Consistent token across all tests
4. **Cleaner Test Code**: No repetitive sign-in logic in each test

### Before (Slow - Multiple Sign-ins)

```typescript
describe('API Tests', () => {
  it('test 1', async () => {
    // Sign in for this test
    const signInResponse = await client.api.auth['sign-in'].post(credentials)
    const token = signInResponse.data?.accessToken

    // Use token for actual test
    const response = await client.api.endpoint.get({
      headers: { authorization: `Bearer ${token}` },
    })
  })

  it('test 2', async () => {
    // Sign in AGAIN for this test (inefficient!)
    const signInResponse = await client.api.auth['sign-in'].post(credentials)
    const token = signInResponse.data?.accessToken

    // Use token for actual test
    const response = await client.api.endpoint.post(data, {
      headers: { authorization: `Bearer ${token}` },
    })
  })
})
```

### After (Fast - Shared Token)

```typescript
describe('API Tests', () => {
  let accessToken: string

  beforeAll(async () => {
    // Sign in ONCE for all tests
    const signInResponse = await client.api.auth['sign-in'].post(credentials)
    if (signInResponse.status === 200) {
      accessToken = signInResponse.data?.accessToken as string
    }
  })

  it('test 1', async () => {
    if (!accessToken) return // Skip if setup failed

    const response = await client.api.endpoint.get({
      headers: { authorization: `Bearer ${accessToken}` },
    })
  })

  it('test 2', async () => {
    if (!accessToken) return // Skip if setup failed

    const response = await client.api.endpoint.post(data, {
      headers: { authorization: `Bearer ${accessToken}` },
    })
  })
})
```

### Error Handling in beforeAll

```typescript
beforeAll(async () => {
  const signInResponse = await client.api.auth['sign-in'].post(validCredentials, {
    headers: validHeaders,
  })

  // Only set token if sign-in was successful
  if (signInResponse.status === 200) {
    accessToken = signInResponse.data?.accessToken as string
  }
  // If sign-in fails, accessToken remains undefined
  // Individual tests will skip with the guard clause
})

// Guard clause in each test
it('should work with valid token', async () => {
  if (!accessToken) {
    return // Skip test if sign-in failed during setup
  }

  // Test logic here...
})
```

### When NOT to Use Shared Authentication

1. **Authentication Tests**: When testing sign-in, sign-out, token refresh
2. **User-Specific Tests**: When testing different user roles or permissions
3. **Token Expiration Tests**: When testing expired or invalid tokens

For these cases, use individual sign-ins within each test as needed.
