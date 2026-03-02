---
applyTo: 'src/api/**'
---

# 🔧 Backend Development

## API Architecture (3-Layer Pattern)

### Feature Structure

```
src/api/features/{feature}/
├── handlers/               # HTTP interface layer
│   ├── createEntityHandler.ts
│   ├── listEntityHandler.ts
│   ├── getEntityHandler.ts
│   ├── updateEntityHandler.ts
│   ├── updateEntityStatusHandler.ts
│   └── deleteEntityHandler.ts
├── services/              # Business logic layer
│   ├── createEntityService.ts
│   ├── listEntityService.ts
│   ├── getEntityService.ts
│   ├── updateEntityService.ts
│   ├── updateEntityStatusService.ts
│   └── deleteEntityService.ts
├── repositories/          # Database operations layer
│   ├── createEntityRepository.ts
│   ├── listEntityRepository.ts
│   ├── getEntityRepository.ts
│   ├── updateEntityRepository.ts
│   ├── updateEntityStatusRepository.ts
│   └── deleteEntityRepository.ts
├── schemas/               # Zod validation schemas
│   ├── createEntitySchema.ts
│   ├── listEntitySchema.ts
│   ├── getEntitySchema.ts
│   ├── updateEntitySchema.ts
│   ├── updateEntityStatusSchema.ts
│   └── deleteEntitySchema.ts
├── utils/                 # Feature-specific utilities
│   └── runtime.ts        # Feature runtime with dependencies
├── routers/               # Sub-routers (optional, for complex features)
│   ├── subEntityRouter.ts
│   ├── subEntityMemberRouter.ts
│   └── subEntityRoleRouter.ts
└── router.ts             # Main route definitions
```

### Layer Responsibilities

#### **Repository Layer**: Database operations with `Effect.gen` + `Effect.tryPromise`

- Tagged errors: `Repository/{Operation}{Entity}/Error`
- **NEVER use `throw`** - always use `yield* Effect.fail()`
- Pass caught errors: `(e) => Error.new('message')(e)`
- Include tenant scoping and soft delete filters
- Implement audit logging in transactions

#### **Service Layer**: Business logic composition

- Effect combinators: `Effect.race`, `Effect.all`, `Effect.retry`
- Tagged errors: `Service/{Feature}/{Operation}/Error`
- Convert Date objects to ISO strings before return
- Clear cache after CUD operations
- **NO HTTP status codes or input validation**

#### **Handler Layer**: HTTP interface

- Input validation with Zod schemas
- Error mapping to HTTP status codes
- Feature-specific runtime execution
- Use `authorizationPlugin` for protected endpoints

### Effect Patterns

```typescript
// Race (first success wins)
Effect.race(serviceA, serviceB)

// Parallel (wait for all)
const [dataA, dataB] = yield * Effect.all([serviceA, serviceB])

// Retry with timeout
Effect.gen(() => service()).pipe(Effect.retry({ times: 2 }), Effect.timeout(Duration.seconds(30)))
```

## Authentication & Authorization

### Authorization Plugin Pattern

```typescript
import { authorizationPlugin } from '@/src/api/plugins/authorization'

export const protectedHandler = new Elysia({ name: 'protected.handler' })
  .use(authorizationPlugin)
  .get('/endpoint', ({ tokenPayload }) => {
    // tokenPayload: { userId, username, role, tenantCode, sessionId }
    return { data: 'protected data' }
  })
```

### Features

- JWT Bearer Token extraction and verification (Jose library)
- Automatic 401 for invalid/missing tokens
- Token payload injection: `{ userId, username, role, tenantCode, sessionId }`
- JWK (JSON Web Key) storage and rotation
- Token blacklist for revoked tokens
- Sign-in logging for audit trail

## Error Handling Guidelines

### Error Factory Pattern

```typescript
import { Data } from 'effect'
import { createErrorFactory, type ErrorMsg } from '@/src/libs/effect'

export class ModelError extends Data.TaggedError('Repository/Model/Error')<ErrorMsg> {
  static new = createErrorFactory(this)
}
```

### Error Factory Usage

```typescript
// Database operations - pass caught error (e)
Effect.tryPromise({
  try: () => prisma.model.findFirst({ where: { id } }),
  catch: (e) => ModelError.new('Failed to query model')(e),
})

// Business logic - use empty parentheses
if (!data) {
  return yield * Effect.fail(ModelError.new('Model not found')())
}
```

### Error Tag Categories

#### Repository Layer

- `Repository/CreateEntity/Error`
- `Repository/GetEntity/Error`
- `Repository/UpdateEntity/Error`
- `Repository/DeleteEntity/Error`

#### Service Layer

- `Service/CreateEntity/Error`
- `Service/EntityDateValidation/Error`
- `Service/UpdateEntityStatus/Error`

#### Provider Errors

- `Cache/Get/Error`
- `Cache/Set/Error`
- `Cache/Clear/Error` (Most common in CUD operations)
- `ObjectStorage/Upload/Error`
- `ObjectStorage/Remove/Error`
- `Provider/Token/Generation/Error`
- `Provider/Token/Verification/Error`

### Complete Error Coverage Pattern

```typescript
return await Effect.match(serviceResult, {
  onFailure: (error) => {
    switch (error._tag) {
      case 'Service/CreateEntity/Error':
        return status(400, { message: error.msg ?? 'Invalid entity data' })
      case 'Repository/CreateEntity/Error':
        return status(500, { message: error.msg ?? 'Database System Error' })
      case 'Cache/Clear/Error':
        return status(500, { message: error.msg ?? 'Cache System Error' })
      case 'TimeoutException':
        return status(504, { message: 'Request Timeout' })
      default:
        return status(500, { message: 'Internal Server Error' })
    }
  },
  onSuccess: (data) => status(201, data),
}).pipe(ENTITY_RUNTIME.runPromise)
```

### Critical Error Patterns to Avoid

#### ❌ Cache Error Mismatches

```typescript
// WRONG: Using wrong error type
import type { CacheRemoveError } from '@/src/api/providers/cache'
yield * cacheProvider.clear() // This throws CacheClearError, not CacheRemoveError
```

#### ✅ Correct Cache Error Types

```typescript
cacheProvider.get() // throws CacheGetError
cacheProvider.set() // throws CacheSetError
cacheProvider.getOrSet() // throws CacheGetOrSetError
cacheProvider.remove() // throws CacheRemoveError
cacheProvider.clear() // throws CacheClearError
```

## Feature Runtime Pattern

### Feature-Specific Runtime

```typescript
// src/api/features/{feature}/utils/runtime.ts
import { Layer, ManagedRuntime } from 'effect'
import { CacheProvider } from '@/src/api/providers/cache'

const ENTITY_DEPENDENCIES = Layer.mergeAll(CacheProvider.Default())
export const ENTITY_RUNTIME = ManagedRuntime.make(ENTITY_DEPENDENCIES)
```

### Handler Usage

```typescript
return await Effect.match(serviceResult, {
  onFailure: (error) => status(500, { message: 'Error' }),
  onSuccess: (data) => status(200, data),
}).pipe(ENTITY_RUNTIME.runPromise)
```

## Cache Duration Configuration (MANDATORY)

### Global Cache Duration Constant

**ALWAYS use `CACHE_DURATION` from `src/api/utils/cacheDulation.ts` instead of hardcoding `Duration.minutes()` or `Duration.hours()` in service files.**

#### Cache Duration Configuration File

```typescript
// src/api/utils/cacheDulation.ts
import { Duration } from 'effect'

export const CACHE_DURATION = Duration.hours(1)
```

### ❌ WRONG - Hardcoded Duration

```typescript
import { Duration, Effect, Option } from 'effect'

export const getEntityService = (props: GetEntityServiceProps) => {
  return Effect.gen(function* () {
    const cacheProvider = yield* CacheProvider

    const result = yield* cacheProvider.getOrSet(
      cacheKey,
      Effect.gen(function* () {
        // ... data transformation
      }),
      Option.some(Duration.minutes(5)) // ❌ WRONG: Hardcoded duration
    )

    return result
  })
}
```

### ✅ CORRECT - Using CACHE_DURATION

```typescript
import { Effect, Option } from 'effect'
import { CacheProvider } from '@/src/api/providers/cache'
import { CACHE_DURATION } from '@/src/api/utils/cacheDulation'

export const getEntityService = (props: GetEntityServiceProps) => {
  return Effect.gen(function* () {
    const cacheProvider = yield* CacheProvider

    const result = yield* cacheProvider.getOrSet(
      cacheKey,
      Effect.gen(function* () {
        // ... data transformation
      }),
      Option.some(CACHE_DURATION) // ✅ CORRECT: Using global constant
    )

    return result
  })
}
```

## Cache with Date Serialization Pattern (CRITICAL)

### Problem: Date Objects Cannot Be Cached Directly

When using `cacheProvider.getOrSet()`, **ALL Date objects MUST be converted to ISO strings BEFORE caching**. Failure to do so causes serialization errors and 502 Bad Gateway responses.

### ❌ WRONG - Convert dates AFTER cache

```typescript
export const listEntityService = (props: ListEntityServiceProps) => {
  return Effect.gen(function* () {
    const cacheProvider = yield* CacheProvider
    const cacheKey = `entity:list:${JSON.stringify(props)}`

    const result = yield* cacheProvider.getOrSet(
      cacheKey,
      Effect.gen(function* () {
        const repositoryResult = yield* listEntityRepository(props)

        // ❌ WRONG: Spreading with Date objects
        return {
          ...repositoryResult,
          data: repositoryResult.data.map((item) => ({
            ...item, // Date objects still exist here!
            createdAt: item.createdAt?.toISOString() ?? null,
          })),
        }
      })
    )

    return result
  })
}
```

### ✅ CORRECT - Convert dates INSIDE getOrSet operation

```typescript
export const listEntityService = (props: ListEntityServiceProps) => {
  return Effect.gen(function* () {
    const cacheProvider = yield* CacheProvider
    const cacheKey = `entity:list:${JSON.stringify(props)}`

    // Convert ALL Date objects to ISO strings INSIDE getOrSet
    const result = yield* cacheProvider.getOrSet(
      cacheKey,
      Effect.gen(function* () {
        const repositoryResult = yield* listEntityRepository(props)

        // ✅ CORRECT: Explicit transformation - NO Date objects in cache
        return {
          data: repositoryResult.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status,
            active: item.active,
            createdAt: item.createdAt?.toISOString() ?? null,
            updatedAt: item.updatedAt?.toISOString() ?? null,
            deletedAt: item.deletedAt?.toISOString() ?? null,
            // ... all other fields explicitly
          })),
          pagination: {
            page: props.page,
            limit: props.limit,
            total: repositoryResult.pagination.totalItems,
            totalPages: Math.ceil(repositoryResult.pagination.totalItems / props.limit),
            hasNext: props.page * props.limit < repositoryResult.pagination.totalItems,
            hasPrev: props.page > 1,
          },
        }
      })
    )

    return result
  })
}
```

### Key Rules for Cache + Date Handling

1. **Date Conversion Location**: Convert Date to ISO string **INSIDE** `getOrSet` operation
2. **Explicit Mapping**: Never use spread operator (`...item`) with Date objects
3. **List ALL Fields**: Explicitly map every field to ensure no Date objects leak
4. **Nested Objects**: Convert dates in nested objects (relations) too
5. **Verify Return Type**: Service return type must be `string | null` for date fields

## 🚨 CRITICAL: No Mock Code in Production

### Absolute Prohibition

**NEVER** include mock, simulation, or placeholder code in repository layer files that will go to production.

### ❌ Prohibited Patterns

```typescript
// NEVER DO THIS
const banResult = {
  id: `ban_${blokPageId}_${userId}_${Date.now()}`,
  user: { firstName: 'Mock', lastName: 'User' },
}

// NEVER DO THIS
// TODO: Implement ban logic when model is available
// For now, simulate ban by creating a mock ban record

// NEVER DO THIS
const unbanResult = { count: 1 } // Simulate successful unban
```

### ✅ Required Actions Before Implementation

1. **Verify Database Models Exist**

```bash
grep -r "model ModelName" prisma/
```

2. **If Model Missing - Create It First**

- Add model to appropriate Prisma schema file
- Run migration: `bun run db:migrate:create`
- Generate client: `bun run db:generate`

3. **Use Real Database Operations**

```typescript
// CORRECT: Real database operations
const banResult = await prisma.blokPageFollowerBan.create({
  data: { blokPageId, userId, reason, bannedBy },
  include: { user: true, blokPage: true },
})
```

### Production Risks of Mock Code

1. Data Corruption - Fake data returned to clients
2. Feature Malfunction - Operations appear successful but do nothing
3. Debugging Nightmares - System looks working but isn't
4. User Trust Loss - Features don't work as expected
5. Data Inconsistency - API says success, database has no record

### Exception: Test Files Only

Mock code is ONLY acceptable in:

- `**/*.test.ts` files
- `**/*.spec.ts` files
- `tests/` directories
- Development utilities (clearly marked)

## Date Handling with date-fns (MANDATORY)

**ALWAYS use date-fns for date operations instead of manual calculations.**

### Common Functions

```typescript
import { addMonths, addDays, addHours, isAfter, isBefore, format } from 'date-fns'

// JWK expiration (6 months)
const expiresAt = addMonths(new Date(), 6)

// Token expiration (1 hour)
const tokenExpiry = addHours(new Date(), 1)

// Date comparisons
const isExpired = isAfter(new Date(), expiresAt)

// Date formatting
const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
```

### ❌ Prohibited Manual Calculations

```typescript
// NEVER DO THIS
const expiresAt = new Date(now.getTime() + 6 * 30 * 24 * 60 * 60 * 1000)
const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000)
```

## Image Upload Handling Pattern (CRITICAL)

See `image-upload.instructions.md` for comprehensive image handling guide including:

- 3-condition upload standard
- Frontend-backend contract
- Service layer implementation
- Multi-image entity patterns
- Common troubleshooting
