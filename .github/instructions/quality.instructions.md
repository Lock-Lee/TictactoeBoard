---
applyTo: '**'
---

# ✅ Quality & Testing

## 🚨 Zero Error Policy

**NEVER submit or mark tasks as complete while ANY errors exist.**

### Mandatory Pre-Completion Checks

1. ✅ **Linting**: `bun run lint` - Zero errors
2. ✅ **Build**: `bun run build` - Success
3. ✅ **Database**: `bun run db:validate` - Valid (if schema changed)

### Error Categories - ALL Must Be Fixed

- TypeScript errors (type mismatches, missing properties)
- Lint errors (code quality violations, unused variables)
- Runtime errors (syntax errors, missing dependencies)

### Acceptable Warnings Only

- Performance suggestions (non-critical)
- Deprecation warnings (if dependencies are up to date)
- Non-critical accessibility hints

**Remember: Quality First, Speed Second**

## API Quality Checklist

### Repository Layer

- [ ] Use `Effect.gen` for composition
- [ ] Use `Effect.tryPromise` for database operations
- [ ] Pass caught errors to error factory: `(e) => Error.new('message')(e)`
- [ ] Use `Effect.fail` for business validation (NOT `throw`)
- [ ] Include tenant scoping and soft delete filters
- [ ] Implement audit logging in transactions

### Service Layer

- [ ] Declare all error types in union type
- [ ] Convert Date objects to ISO strings before return
- [ ] Clear cache after CUD operations
- [ ] NO HTTP status codes or input validation

### Handler Layer

- [ ] Use `authorizationPlugin` for protected endpoints
- [ ] Validate input with Zod schemas
- [ ] Map ALL error tags in `Effect.match`
- [ ] Use feature-specific runtime

### Schema Quality

- [ ] Use `z.string().datetime()` for dates (NOT `z.date()`)
- [ ] Use `import z from 'zod'` (default import)
- [ ] Convert Date objects to ISO strings in service layer
- [ ] Use `z.stringbool()` for boolean parameters (NOT `z.coerce.boolean()`)
- [ ] Use Zod codecs for bidirectional transformations
- [ ] Test filters work correctly with boolean/string transformations

### File Organization

- [ ] Function-based naming: `createNewsHandler.ts`, `updateNewsStatusService.ts`, `createNewsRepository.ts`
- [ ] NO generic names: Avoid `create.ts`, `update.ts`, `handler.ts`
- [ ] NO `index.ts` barrel exports (except `/libs/`, `/providers/`, component `index.tsx`)
- [ ] Direct imports only from source files
- [ ] Errors defined in same file as functionality (co-location pattern)

### Image Upload Quality

- [ ] Use `imageValidationSchema` from `src/utils/imageValidationSchema.ts`
- [ ] Frontend `ImageUpload` component uses `onChange: (value: string) => void` interface
- [ ] Remove button sets empty string `""` (not `undefined`)
- [ ] Backend handlers convert empty string to `undefined` before service layer (Service also handles empty string as backup)
- [ ] Service layer uses `'logoUrl' in props` instead of `props.logoUrl !== undefined`
- [ ] 3-condition pattern implemented: `""` → delete, `/{bucket}/{file}` → keep, `data:image` → upload new
- [ ] Old images properly deleted from MinIO storage when updating/deleting
- [ ] Cache cleared after image operations

## Frontend Quality Checklist

### Tree Shaking & Imports

- [ ] Use direct imports from specific modules (not barrel imports)
- [ ] MUI components: `import Box from '@mui/material/Box'` (not `import { Box }`)
- [ ] MUI Icons: `import EditIcon from '@mui/icons-material/Edit'` (not `import { Edit }`)
- [ ] date-fns: individual function imports
- [ ] Avoid `index.ts` barrel exports for feature modules

### Component Guidelines

- [ ] Use `memo` for performance optimization
- [ ] Use `useCallback` for event handlers
- [ ] Use `useMemo` for expensive computations
- [ ] Include TypeScript interfaces for all props
- [ ] Component structure: `index.tsx`, `types.ts`, `utils.ts` (optional), `styles.ts` (optional)

### API Integration

- [ ] Stable queryKey patterns (use helper functions, not inline objects)
- [ ] Destructure `{ data: result, error }` from Eden Treaty responses
- [ ] ALWAYS throw errors explicitly in query functions
- [ ] Error handling via separate useEffect hooks
- [ ] Cache invalidation on CUD operations
- [ ] Proper error message access: `error.value.message`

### Form Integration

- [ ] Use `watch()` for image values
- [ ] Always provide string fallback: `value={imageValue || ''}`
- [ ] Controller render prop pattern (don't destructure field)
- [ ] Image fields typed as `string` in form schemas
- [ ] Remove button sets empty string for deletion

## Core API Guidelines

- **Validation**: ONLY in Handler layer using Zod schemas
- **Caching**: Use `CacheProvider` with Keyv + Redis - `getOrSet()` for reads, `clear()` after CUD ops
- **Images**: Frontend (base64) → Service (`ObjectStorageProvider.uploadBase64`) → Repository (URLs stored in DB)
- **Repository**: Soft delete + tenant scoping mandatory, use `calculatePagination()` utility
- **File Storage**: MinIO for S3-compatible storage with `getFileDownloadUrlService()` for temporary signed URLs

## Testing Quality Checklist

- [ ] All API endpoints have tests
- [ ] All validation rules are tested
- [ ] Error cases are tested
- [ ] Edge cases are tested
- [ ] Authentication/authorization tested
- [ ] Using `bun run test` command only
- [ ] Tests follow `.test.ts` naming convention
- [ ] Test files organized by feature in `src/tests/api/`
- [ ] Each test is independent
- [ ] No shared state between tests
- [ ] Response status codes verified
- [ ] Bearer token patterns tested
- [ ] Required headers tested

## Database Quality Checklist

- [ ] Models include multi-tenancy fields (`tenantCode`)
- [ ] Models include activity tracking (`createdAt`, `updatedAt`, `deletedAt`)
- [ ] Soft delete enforcement (no hard deletes)
- [ ] Audit log models created with proper relationships
- [ ] All entities include indices for performance
- [ ] Relations use proper `onUpdate` and `onDelete` strategies
- [ ] Constraints are enforced at database level

## File Organization Checklist

- [ ] Function-based file naming (not generic names)
- [ ] API handlers named: `{operation}{Entity}Handler.ts`
- [ ] API services named: `{operation}{Entity}Service.ts`
- [ ] API repositories named: `{operation}{Entity}Repository.ts`
- [ ] NO `index.ts` barrel exports (except allowed paths)
- [ ] Component directories use PascalCase
- [ ] Direct imports only (no re-exports)
- [ ] Errors co-located with functionality

## Key Principles Summary

✅ **DO**:

- Follow 3-layer API architecture (Handler → Service → Repository)
- Convert Date objects to ISO strings in services
- Use Effect.gen for composition
- Validate in Handler layer only
- Cache with CacheProvider, clear after CUD
- Soft delete all entities
- Use function-based file naming
- Direct imports (no barrel exports)
- Write tests for all endpoints
- Use `bun run test` for testing

❌ **DON'T**:

- Use `throw` in repository/service layers
- Include mock/simulation code in production
- Hardcode cache durations
- Cache Date objects directly
- Use generic file names
- Create index.ts barrel exports
- Use `z.coerce.boolean()` for query parameters
- Use `z.date()` in response schemas
- Mix validation in service layer
- Ignore linting errors
