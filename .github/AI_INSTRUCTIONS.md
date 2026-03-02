# 🤖 AI Agent Instructions

## 📚 Required Reading Before Every Task

**IMPORTANT**: Always read these instruction files before starting ANY task:

1. **Backend Architecture**: `.github/instructions/backend.instructions.md`
   - 3-layer architecture (Handler → Service → Repository)
   - Effect-TS patterns
   - Error handling with tagged errors

2. **Quality Standards**: `.github/instructions/quality.instructions.md`
   - Zero Error Policy
   - Linting requirements
   - Build requirements
   - File organization rules

3. **Zod Validation**: `.github/instructions/zod.instructions.md`
   - Schema patterns
   - Validation rules

4. **Database**: `.github/instructions/database.instructions.md`
   - Prisma patterns
   - Multi-tenancy
   - Soft deletes

5. **Testing**: `.github/instructions/testing.instructions.md`
   - Testing patterns
   - Test organization

## 🚨 Pre-Completion Checklist

Before marking ANY task as complete:

```bash
# 1. Linting (MUST pass with 0 errors)
bun run lint

# 2. Build (MUST succeed)
bun run build

# 3. TypeScript check
bunx tsc --noEmit
```

**Zero Error Policy**: NEVER mark tasks complete if ANY errors exist.

## 🎯 Key Architecture Rules

### File Naming

- ✅ Function-based: `createUserHandler.ts`, `loginUserService.ts`
- ❌ Generic: `create.ts`, `handler.ts`

### Imports

- ✅ Direct imports: `import z from 'zod'`
- ❌ Barrel exports: No `index.ts` files

### Error Handling

- ✅ Tagged errors: `yield* Effect.fail(Error.new('message')())`
- ❌ Throw statements: NO `throw new Error()`

### Async Operations

- ✅ Effect.gen + Effect.tryPromise
- ❌ Plain async/await with try/catch

### Protected Routes

- ✅ Use `.derive()` for JWT authentication
- ✅ Extract userId from token payload

## 📊 Project Structure

```
src/
├── api/
│   ├── providers/     (Shared services)
│   │   ├── email/
│   │   ├── sms/
│   │   ├── cache/
│   │   ├── crypto/
│   │   └── token/
│   └── features/      (Domain features)
│       ├── auth/
│       ├── twofa/
│       ├── oauth/
│       └── oauth-server/
└── libs/              (Shared utilities)
```

### Feature Structure (3-Layer)

```
feature/
├── handlers/      (HTTP - Elysia routes)
├── services/      (Business logic - Effect.gen)
├── repositories/  (Database - Prisma)
├── schemas/       (Validation - Zod)
├── utils/
│   ├── errors.ts  (Tagged errors)
│   └── runtime.ts (ManagedRuntime)
└── router.ts      (Main router)
```

## 🔧 Common Patterns

### Handler Pattern

```typescript
import { Elysia } from 'elysia'
import { Effect } from 'effect'
import { someService } from '../services/someService'
import { someSchema } from '../schemas/someSchema'
import { FEATURE_RUNTIME } from '../utils/runtime'

export const someHandler = new Elysia({ name: 'feature.operation.handler' }).post(
  '/path',
  async ({ body, set }) => {
    const serviceResult = someService(body)

    return await Effect.match(serviceResult, {
      onFailure: (error) => {
        const err = error as { _tag: string; msg?: string }
        switch (err._tag) {
          case 'Service/Error/Type':
            set.status = 400
            return { error: err.msg ?? 'Error message' }
          default:
            set.status = 500
            return { error: 'Internal Server Error' }
        }
      },
      onSuccess: (data) => {
        set.status = 200
        return data
      },
    }).pipe(FEATURE_RUNTIME.runPromise)
  },
  {
    body: someSchema,
    detail: {
      tags: ['Feature'],
      summary: 'Operation description',
      description: 'Detailed description',
    },
  }
)
```

### Service Pattern

```typescript
import { Effect } from 'effect'
import { SomeProvider } from '@/src/api/providers/some'
import { SomeError } from '../utils/errors'
import { someRepository } from '../repositories/someRepository'

export const someService = (props: SomeProps) =>
  Effect.gen(function* () {
    const provider = yield* SomeProvider

    const result = yield* someRepository({ id: props.id })

    if (!result) {
      return yield* Effect.fail(SomeError.new('Not found')())
    }

    yield* provider.doSomething()

    return { success: true, data: result }
  })
```

### Repository Pattern

```typescript
import { Effect } from 'effect'
import { prisma } from '@/src/config/database'
import { SomeError } from '../utils/errors'

export const someRepository = (props: SomeProps) =>
  Effect.tryPromise({
    try: async () => {
      return await prisma.model.operation({
        where: { id: props.id },
      })
    },
    catch: (e) => SomeError.new('Database operation failed')(e),
  })
```

## 📝 Workflow

1. **Read Instructions**: Read all `.github/instructions/*.md` files
2. **Understand Task**: Clarify requirements with user
3. **Plan**: Break down into steps
4. **Implement**: Follow patterns above
5. **Quality Check**: Run lint + build
6. **Verify**: Check for any errors
7. **Complete**: Only mark done if all checks pass

## 🎯 Success Criteria

- ✅ Lint: 0 errors (warnings OK)
- ✅ Build: Successful
- ✅ TypeScript: New code has 0 errors
- ✅ Pattern: Follows 3-layer architecture
- ✅ Naming: Function-based file names
- ✅ Errors: Tagged errors only (no throw)
- ✅ Testing: Tests written (if applicable)

---

**Remember**: Quality First, Speed Second. Never compromise on quality standards.
