---
applyTo: '**'
---

# Validation Patterns with Zod

## Zod v4 Guidelines (MANDATORY)

### Import Pattern

```typescript
// ✅ CORRECT - Use default import
import z from 'zod'

// ❌ WRONG - Avoid named import
import { z } from 'zod'
```

### Prisma Enum Usage (CRITICAL)

**NEVER use `z.nativeEnum()` - ALWAYS use `z.enum()` with Prisma enum object**

```typescript
// ✅ CORRECT - Use z.enum() with Prisma enum object
import { BLOK_PAGE_ROLE } from '@/src/libs/prisma/generated/enums'

const schema = z.object({
  role: z.enum(BLOK_PAGE_ROLE),
})

// With custom error message
const schema = z.object({
  role: z.enum(BLOK_PAGE_ROLE, {
    message: 'Role must be one of: OWNER, MANAGER, MEMBER',
  }),
})

// ❌ WRONG - Do NOT use z.nativeEnum()
const schema = z.object({
  role: z.nativeEnum(BLOK_PAGE_ROLE), // ❌ NEVER use this
})

// ❌ WRONG - Do NOT hardcode enum values
const schema = z.object({
  role: z.enum(['OWNER', 'MANAGER', 'MEMBER']), // ❌ Not type-safe
})
```

**Why `z.enum(BLOK_PAGE_ROLE)` instead of `z.nativeEnum()`:**

- Prisma generates enum as const object: `{ OWNER: 'OWNER', MANAGER: 'MANAGER' }`
- `z.enum()` works directly with this object structure
- `z.nativeEnum()` is for TypeScript native enums (not Prisma's pattern)
- Type safety: Changes to Prisma schema automatically update validation

### Breaking Changes in Zod v4

#### String Format Methods (DEPRECATED)

```typescript
// ❌ DEPRECATED (Zod v3)
z.string().url()
z.string().email()
z.string().uuid()
z.string().datetime()
z.string().date()
z.string().time()
z.string().ip()
z.string().ipv4()
z.string().ipv6()
z.string().cidr()
z.string().jwt()
z.string().base64()
z.string().base64url()

// ✅ CORRECT (Zod v4)
z.url()
z.email()
z.uuid()
z.datetime()
z.date()
z.time()
z.ipv4()
z.ipv6()
z.ipBlock() // renamed from .cidr()
z.jwt()
z.base64()
z.base64url()
```

#### Key Changes

1. **String formats moved to top-level**: Use `z.url()` instead of `z.string().url()`
2. **Dropped `z.string().ip()`**: Use `z.ipv4()` or `z.ipv6()` instead
3. **Renamed `z.string().cidr()`**: Now `z.ipBlock()`
4. **No `.default()` in pipes**: Use `.catch()` or handle defaults outside schema
5. **Stricter validation**: Many formats are now more strict

## API Schema Patterns

### Date Handling (CRITICAL)

#### Response Schemas - Use z.string().datetime()

```typescript
// ✅ CORRECT - API responses with ISO string dates
const responseSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string().datetime(),
  createdAt: z.string().datetime().nullable(),
  updatedAt: z.string().datetime().nullable(),
})

// ❌ WRONG - Using z.date() in API responses
const responseSchema = z.object({
  startDate: z.date(), // Will cause serialization issues
  createdAt: z.date().nullable(),
})
```

#### Service Layer Date Conversion

```typescript
export const createEntityService = (props: CreateEntityServiceProps) => {
  return Effect.gen(function* () {
    const entity = yield* createEntityRepository(props)

    // Convert Date objects to ISO strings for JSON serialization
    return {
      ...entity,
      startDate: entity.startDate.toISOString(),
      createdAt: entity.createdAt?.toISOString() ?? null,
      updatedAt: entity.updatedAt?.toISOString() ?? null,
    }
  })
}
```

### Boolean Query Parameters

#### Use z.stringbool() for Query Parameters

```typescript
// ✅ CORRECT - Using z.stringbool()
export const listEntitySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  active: z.stringbool().optional(),
  highlight: z.stringbool().optional(),
  search: z.string().optional(),
})

// ❌ WRONG - Using z.coerce.boolean()
export const listEntitySchema = z.object({
  active: z.coerce.boolean().optional(), // Doesn't work well with query strings
})
```

### Request/Response Schema Patterns

#### Create Schema Template

```typescript
export const createEntitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  active: z.boolean().default(true),
  logoUrl: z.string().optional(),
  coverUrl: z.string().optional(),
})

export const createEntityResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  active: z.boolean(),
  logoUrl: z.string().nullable(),
  coverUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
})
```

#### List Schema Template

```typescript
export const listEntitySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  active: z.stringbool().optional(),
  sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const listEntityResponseSchema = z.object({
  data: z.array(createEntityResponseSchema),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
})
```

## Image Validation Patterns

### Common Image Validation Schema

```typescript
// src/utils/imageValidationSchema.ts
import z from 'zod'

const IMAGE_BASE64_REGEX = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/
const IMAGE_URL_REGEX = /^\/[a-z-]+\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp)$/

export const imageValidationSchema = z.string().refine(
  (value) => {
    // Allow empty string for deletion
    if (value === '') return true
    // Allow base64 images for upload
    if (IMAGE_BASE64_REGEX.test(value)) return true
    // Allow MinIO URLs for existing images
    if (IMAGE_URL_REGEX.test(value)) return true
    return false
  },
  {
    message: 'Invalid image format. Must be base64 string or valid image URL.',
  }
)
```

### Usage in Schemas

```typescript
import { imageValidationSchema } from '@/src/utils/imageValidationSchema'

export const entityFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logoUrl: imageValidationSchema, // Direct string type, not optional
  coverUrl: imageValidationSchema,
  // ... other fields
})
```

## Environment Variable Validation

### T3 Env Integration

```typescript
import { createEnv } from '@t3-oss/env-core'
import z from 'zod'

export const env = createEnv({
  server: {
    // URLs - Use z.url() (Zod v4)
    DATABASE_URL: z.url(),
    API_URL: z.url(),

    // Strings with validation
    JWT_SECRET: z.string().min(32, 'JWT secret must be at least 32 characters'),

    // Numbers with coercion and fallback
    PORT: z.coerce.number().int().positive().catch(3000),

    // Booleans with coercion
    ENABLE_FEATURE: z.coerce.boolean().catch(false),
    DEBUG: z.stringbool().catch(false), // Zod v4 native

    // Enums
    NODE_ENV: z.enum(['development', 'production', 'test']),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).catch('info'),

    // Emails - Use z.email() (Zod v4)
    ADMIN_EMAIL: z.email(),

    // IP Addresses - Use z.ipv4()/z.ipv6() (Zod v4)
    SERVER_IP: z.ipv4(),
    ALLOWED_CIDR: z.ipBlock(), // Renamed from .cidr()

    // JWTs - Use z.jwt() (Zod v4)
    JWT_TOKEN: z.jwt(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
```

## Advanced Validation Patterns

### Custom Refinements

```typescript
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /\d/.test(password), {
    message: 'Password must contain at least one number',
  })
```

### Conditional Validation

```typescript
export const eventSchema = z
  .object({
    title: z.string().min(1),
    isRecurring: z.boolean(),
    recurringPattern: z.string().optional(),
  })
  .refine(
    (data) => {
      // If recurring, pattern is required
      if (data.isRecurring && !data.recurringPattern) {
        return false
      }
      return true
    },
    {
      message: 'Recurring pattern is required when event is recurring',
      path: ['recurringPattern'],
    }
  )
```

### Array Validation

```typescript
export const bulkCreateSchema = z.object({
  entities: z
    .array(createEntitySchema)
    .min(1, 'At least one entity is required')
    .max(100, 'Maximum 100 entities allowed'),
})
```

### Union Types for Flexible Input

```typescript
export const idSchema = z.union([z.string().cuid(), z.string().uuid()])

export const dateInputSchema = z.union([
  z.string().datetime(),
  z.date().transform((date) => date.toISOString()),
])
```

## Error Handling Patterns

### Custom Error Messages

```typescript
export const createUserSchema = z.object({
  email: z.email('Please enter a valid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  age: z
    .number()
    .int('Age must be a whole number')
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
})
```

### Internationalized Error Messages

```typescript
export const createEntitySchemaWithI18n = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('validation.nameRequired')),
    email: z.email(t('validation.emailInvalid')),
    startDate: z.string().datetime(t('validation.dateInvalid')),
  })
```

## Handler Integration Patterns

### Complete Handler with Validation

```typescript
export const createEntityHandler = new Elysia({ name: 'create.entity.handler' })
  .use(authorizationPlugin)
  .post(
    '/',
    async ({ body, tokenPayload }) => {
      const serviceResult = createEntityService({
        ...body,
        createdBy: tokenPayload.userId,
        tenantCode: tokenPayload.tenantCode,
      })

      return await Effect.match(serviceResult, {
        onFailure: (error) => {
          switch (error._tag) {
            case 'Service/CreateEntity/Error':
              return status(400, { message: error.msg ?? 'Invalid entity data' })
            case 'Repository/CreateEntity/Error':
              return status(500, { message: error.msg ?? 'Database System Error' })
            default:
              return status(500, { message: 'Internal Server Error' })
          }
        },
        onSuccess: (data) => status(201, data),
      }).pipe(ENTITY_RUNTIME.runPromise)
    },
    {
      body: createEntitySchema,
      response: {
        201: createEntityResponseSchema,
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
      detail: {
        tags: ['Entity'],
        summary: 'Create new entity',
        description: 'Creates a new entity with the provided data',
      },
    }
  )
```

## Key Validation Principles

### DO

- Use Zod v4 top-level formats (z.url(), z.email(), etc.)
- Use z.string().datetime() for API response dates
- Use z.stringbool() for query parameter booleans
- Convert Date objects to ISO strings in service layer
- Use default import for Zod
- Include descriptive error messages
- Use .catch() instead of .default() in pipes
- Validate image formats with custom refinements

### DON'T

- Use deprecated string methods (z.string().url(), etc.)
- Use z.date() in API response schemas
- Use z.coerce.boolean() for query parameters
- Cache Date objects directly
- Use named imports for Zod
- Skip error message customization
- Use .default() in transformation pipes
- Allow unvalidated image uploads
