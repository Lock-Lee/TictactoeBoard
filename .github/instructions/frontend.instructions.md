---
applyTo: 'src/components/**,src/pages/**,src/hooks/**,src/hooks/api/**'
---

# 🎨 Frontend Development

## Tree Shaking & Import Guidelines (MANDATORY)

### Critical Rules for Optimal Bundle Size

#### 🚨 ALWAYS Use Direct Imports (Named Imports from Specific Modules)

**Material UI (MUI) Components**

```typescript
// ✅ CORRECT - Direct imports (tree-shakable)
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

// ❌ WRONG - Barrel imports (NOT tree-shakable)
import { Box, Button, Typography, Stack } from '@mui/material'
```

**MUI Icons**

```typescript
// ✅ CORRECT - Default imports
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircle from '@mui/icons-material/CheckCircle'

// ❌ WRONG - Named imports
import { Edit, Delete, CheckCircle } from '@mui/icons-material'
```

**MUI System/Styles**

```typescript
// ✅ CORRECT - Named imports from specific path
import { styled } from '@mui/material/styles'
import { useTheme } from '@mui/material/styles'
import { useColorScheme } from '@mui/material/styles'

// ❌ WRONG - From root module
import { styled, useTheme } from '@mui/material'
```

**MUI X Data Grid**

```typescript
// ✅ CORRECT - Named imports from specific module
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridPaginationModel } from '@mui/x-data-grid'

// ❌ WRONG - Default import
import DataGrid from '@mui/x-data-grid'
```

**MUI X Date Pickers**

```typescript
// ✅ CORRECT - Named imports with types
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker'

import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import type { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker'

// ❌ WRONG - From root module
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
```

**date-fns**

```typescript
// ✅ CORRECT - Individual function imports
import { format } from 'date-fns'
import { getDay } from 'date-fns'
import { parse } from 'date-fns'
import { startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { th } from 'date-fns/locale'

// ❌ WRONG - Barrel imports
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS, th } from 'date-fns/locale'
```

**React**

```typescript
// ✅ CORRECT - Named imports (React automatically tree-shakes)
import { memo, useCallback, useMemo, useState, useEffect } from 'react'

// ⚠️ ACCEPTABLE - But prefer named imports
import React, { memo, useCallback } from 'react'
```

### Utility Functions

```typescript
// ✅ CORRECT - Separate imports
import { compressImage } from '@/src/utils/imageCompression'
import { fileToBase64 } from '@/src/utils/imageCompression'

// ❌ WRONG - Destructured imports
import { compressImage, fileToBase64 } from '@/src/utils/imageCompression'
```

### Import Order (Recommended)

```typescript
// 1. External libraries (MUI, React, etc.)
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { memo, useCallback, useState } from 'react'

// 2. Internal components
import CircularProgress from '@/src/components/CircularProgress'
import Modal from '@/src/components/Modal'

// 3. Hooks
import { useAppStore } from '@/src/hooks/useAppStore'

// 4. Utils and types
import { compressImage } from '@/src/utils/imageCompression'
import type { MyCustomType } from './types'

// 5. Styles (if any)
import './styles.css'
```

### Tree Shaking Verification

```bash
# Always run before committing
bun run lint
bun run build

# Check bundle size
ls -lh dist/
```

### Benefits of Proper Tree Shaking

- ✅ Smaller bundle size (up to 50-70% reduction for MUI)
- ✅ Faster page loads
- ✅ Better performance
- ✅ Reduced memory usage
- ✅ Explicit dependencies (better code clarity)

## Component Guidelines

### Component Structure

```
components/
└── ComponentName/          # PascalCase matching component name
    ├── index.tsx          # Main component export
    ├── types.ts           # Component-specific types
    ├── utils.ts           # Component-specific utilities (optional)
    └── styles.ts          # Styled components (if needed)
```

### Component Pattern Template

```typescript
// ✅ CORRECT - Following tree shaking guidelines
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { memo, useCallback, useMemo } from 'react';

interface ComponentNameProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; label: string }>;
}

const ComponentName = memo(function ComponentName({
  value,
  onChange,
  options
}: ComponentNameProps) {
  const processedData = useMemo(
    () => options.map(opt => ({ ...opt, processed: true })),
    [options]
  );

  const handleChange = useCallback(
    (newValue: string) => onChange(newValue),
    [onChange]
  );

  return (
    <Box>
      <TextField
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button onClick={() => handleChange('')}>
        Clear
      </Button>
    </Box>
  );
});

export default ComponentName;
```

### Best Practices

- **ALWAYS follow tree shaking guidelines** (direct imports)
- Use `memo` for performance optimization
- `useCallback` for event handlers
- `useMemo` for expensive computations
- `useEffectEvent` for event handlers in effects (experimental)
- `useDeferredValue` for expensive operations
- Export prop types for reusability
- Include TypeScript interfaces for all props

## Global Types Pattern

### Common Types in `src/@types/common-types.d.ts`

```typescript
declare global {
  type ModalInfo<T> = {
    data?: T
    isOpen: boolean
  }

  type NotificationInfo = {
    open: boolean
    message: string
    severity: 'success' | 'error' | 'warning' | 'info'
  }

  // API Error Response Type
  type APIErrorResponse = {
    status: number
    value: {
      message: string
      [key: string]: unknown
    }
  }
}

// Override TanStack Query error type
declare module '@tanstack/react-query' {
  interface Register {
    defaultError: APIErrorResponse
  }
}
```

**Critical**: All errors from TanStack Query mutations are typed as `APIErrorResponse` with structure:

```typescript
{
  status: 400,
  value: {
    message: "Error message here"
  }
}
```

Always access error messages via `error.value.message`, not `error.message`.

### Usage in Components

```typescript
// Modal state
const [deleteModal, setDeleteModal] = useState<ModalInfo<Entity>>({
  isOpen: false,
})

// Notification state
const [notification, setNotification] = useState<NotificationInfo>({
  open: false,
  message: '',
  severity: 'success',
})
```

## Frontend API Guidelines (Eden Treaty)

### Stable QueryKey Pattern (CRITICAL)

**Problem**: Using `urlParams` directly in queryKey causes unnecessary cache invalidation

**Solution**: Create helper functions with stable parameters

```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useAppStore } from '../useAppStore'
import { useURLParams } from '../useURLParams'
import { DEFAULT_CLIENT_REQUEST_HEADERS } from './config'
import { useAPIClient } from './useAPIClient'

// Helper function to normalize URL params
const normalizeParam = (param: string | string[] | null): string | undefined => {
  if (!param) {
    return undefined
  }
  return Array.isArray(param) ? param[0] : param
}

// Helper to create stable query params and key
const createEntityQueryConfig = (allParams: Record<string, string | string[] | null>) => {
  // Normalize and prepare params
  const page = String(Number(allParams.page) || 1)
  const limit = String(Number(allParams.limit) || 10)
  const search = normalizeParam(allParams.search)
  const active = normalizeParam(allParams.active)
  const sortBy = normalizeParam(allParams.sortBy) || 'createdAt'
  const sortOrder = normalizeParam(allParams.sortOrder) || 'desc'

  // Create stable params object for queryKey
  const stableParams = {
    page,
    limit,
    ...(search && { search }),
    ...(active && { active }),
    sortBy,
    sortOrder,
  }

  // Create API query params
  const apiParams = {
    limit: Number(limit),
    page: Number(page),
    ...(search && { search }),
    ...(active && { active: active === 'true' }),
    sortBy: sortBy as 'name' | 'createdAt' | 'updatedAt',
    sortOrder: sortOrder as 'asc' | 'desc',
  }

  return {
    queryKey: ['entity', 'list', stableParams] as const,
    apiParams,
  }
}

export const useEntityAPI = (id = '') => {
  const { language, _hasHydrated } = useAppStore()
  const apiClient = useAPIClient()
  const queryClient = useQueryClient()

  // URL Params
  const { getAllParams } = useURLParams()
  const allParams = getAllParams()

  // Create stable query configuration
  const entityQueryConfig = useMemo(() => createEntityQueryConfig(allParams), [allParams])

  // List query
  const getEntityList = useQuery({
    enabled: _hasHydrated,
    queryKey: entityQueryConfig.queryKey,
    queryFn: async () => {
      const { data: result, error } = await apiClient.entity.get({
        headers: {
          ...DEFAULT_CLIENT_REQUEST_HEADERS,
          'x-content-language': language,
        },
        query: entityQueryConfig.apiParams,
      })

      if (error) {
        throw error
      }

      return result
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Detail query (direct useQuery - not helper function)
  const getEntityById = useQuery({
    queryKey: ['entity', 'detail', id],
    queryFn: async () => {
      const { data: result, error } = await apiClient.entity({ id }).get({
        headers: {
          ...DEFAULT_CLIENT_REQUEST_HEADERS,
          'x-content-language': language,
        },
      })

      if (error) {
        throw error
      }

      return result
    },
    enabled: !!id && _hasHydrated,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  // Create mutation
  const createEntity = useMutation({
    mutationFn: async (payload: {
      name: string
      description?: string
      logoUrl?: string
      coverUrl?: string
      active: boolean
    }) => {
      // Convert undefined to null for API compatibility
      const requestData = {
        name: payload.name,
        description: payload.description,
        logoUrl: payload.logoUrl ?? null,
        coverUrl: payload.coverUrl ?? null,
        active: payload.active,
      }

      const { data: result, error } = await apiClient.entity.post(requestData, {
        headers: {
          ...DEFAULT_CLIENT_REQUEST_HEADERS,
          'x-content-language': language,
        },
      })

      if (error) {
        throw error
      }

      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['entity', 'list'],
        exact: false,
      })
    },
  })

  // Update mutation
  const updateEntity = useMutation({
    mutationFn: async ({
      id,
      data: payload,
    }: {
      id: string
      data: {
        name?: string
        description?: string
        logoUrl?: string | null // Allow explicit null values
        coverUrl?: string | null // Allow explicit null values
        active?: boolean
      }
    }) => {
      // Convert undefined to null for API compatibility
      const requestData = {
        name: payload.name,
        description: payload.description,
        logoUrl: payload.logoUrl ?? null,
        coverUrl: payload.coverUrl ?? null,
        active: payload.active,
      }

      const { data: result, error } = await apiClient.entity({ id }).put(requestData, {
        headers: {
          ...DEFAULT_CLIENT_REQUEST_HEADERS,
          'x-content-language': language,
        },
      })

      if (error) {
        throw error
      }

      return result
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ['entity', 'list'],
        exact: false,
      })
      queryClient.invalidateQueries({ queryKey: ['entity', 'detail', id] })
    },
  })

  // Delete mutation
  const deleteEntity = useMutation({
    mutationFn: async (id: string) => {
      const { data: result, error } = await apiClient.entity({ id }).delete(
        {},
        {
          headers: {
            ...DEFAULT_CLIENT_REQUEST_HEADERS,
            'x-content-language': language,
          },
        }
      )

      if (error) {
        throw error
      }

      return result
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ['entity', 'list'],
        exact: false,
      })
      queryClient.removeQueries({ queryKey: ['entity', 'detail', id] })
    },
  })

  return {
    getEntityList,
    getEntityById,
    createEntity,
    updateEntity,
    deleteEntity,
  }
}
```

### Config File (`src/hooks/api/config.ts`)

```typescript
import { X_CONTENT_LANGUAGE } from '@/src/constants/api'
import { APP_LANGUAGE } from '@/src/libs/prisma/generated/enums'

export const DEFAULT_CLIENT_REQUEST_HEADERS = {
  [X_CONTENT_LANGUAGE]: APP_LANGUAGE.TH,
}
```

**Note**: `x-tenant-code` header is only required for Sign In API. Other protected APIs use `tenantCode` from Token Payload via `authorizationPlugin`.

### QueryKey Stability Rules (MANDATORY)

#### ❌ WRONG - Unstable QueryKey

```typescript
const urlParams = useMemo(() => ({ ...allParams }), [allParams])
const queryKey = ['entity', 'list', urlParams] // New object every render
```

#### ✅ CORRECT - Stable QueryKey

```typescript
const entityQueryConfig = useMemo(() => createEntityQueryConfig(allParams), [allParams])
const queryKey = entityQueryConfig.queryKey // Only changes when params actually change
```

### Error Handling Pattern for API Calls (CRITICAL)

**ALWAYS destructure `{ data: result, error }` from Eden Treaty responses and throw errors explicitly for both Queries and Mutations:**

```typescript
// Queries: Destructure and throw error
const getEntityList = useQuery({
  enabled: _hasHydrated,
  queryKey: entityQueryConfig.queryKey,
  queryFn: async () => {
    const { data: result, error } = await apiClient.entity.get({
      headers: {
        ...DEFAULT_CLIENT_REQUEST_HEADERS,
        'x-content-language': language,
      },
      query: entityQueryConfig.apiParams,
    })

    if (error) {
      throw error
    }

    return result
  },
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
})

// Mutations: Destructure and throw error
const createEntity = useMutation({
  mutationFn: async (data: Parameters<(typeof apiClient.entity)['post']>['0']) => {
    const { data: result, error } = await apiClient.entity.post(data, {
      headers: {
        ...DEFAULT_CLIENT_REQUEST_HEADERS,
        'x-content-language': language,
      },
    })

    if (error) {
      throw error
    }

    return result
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['entity', 'list'],
      exact: false,
    })
  },
})
```

### Critical Rules for Eden Treaty Response Handling

1. **Both Queries & Mutations**: Destructure `{ data: result, error }` and throw error
2. **ALWAYS use multi-line `if` block** for error handling
3. **ALWAYS rename `data` to `result`** to avoid variable name conflicts

### Eden Treaty Key Points

1. **No Auth Headers**: Token managed by axios interceptor (automatic)
2. **DEFAULT_CLIENT_REQUEST_HEADERS**: Spread config for tenant/language
3. **Eden Treaty**: Use `apiClient.entity.get()` pattern
4. **Cache Invalidation**: Invalidate list + detail on updates
5. **Type Safety**: Use `Parameters<typeof apiClient.entity['post']>['0']`
6. **Error Handling**: Always destructure `{ data: result, error }` and throw errors for both queries and mutations

### Eden Treaty Benefits

- ✅ Proper caching (stable queryKeys)
- ✅ Automatic token refresh
- ✅ Centralized header management
- ✅ Type-safe API calls
- ✅ Consistent error handling across all mutations

## Toast Notification Pattern (react-hot-toast)

### Toast Utility (`src/utils/toast.ts`)

```typescript
import toast from 'react-hot-toast'

type ToastSeverity = 'success' | 'error' | 'warning' | 'info'

export function showToast(message: string, severity: ToastSeverity = 'success'): void {
  const toastId = message // Prevent duplicate toasts

  switch (severity) {
    case 'success':
      toast.success(message, { id: toastId })
      break
    case 'error':
      toast.error(message, { id: toastId })
      break
    case 'warning':
      toast(message, { icon: '⚠️', id: toastId })
      break
    case 'info':
      toast(message, { icon: 'ℹ️', id: toastId })
      break
  }
}
```

### Frontend Mutation Error Destructuring Pattern (CRITICAL)

**ALWAYS destructure mutation properties in this order: `isPending`, `mutateAsync`, `error`**

#### ❌ WRONG - Destructuring data and error separately

```typescript
const { data: createResponse, isPending: isCreateLoading, mutateAsync: createMutate } = createEntity

const { error: createError } = createResponse || {}
```

#### ✅ CORRECT - Direct error destructuring

```typescript
const { isPending: isCreateLoading, mutateAsync: createMutate, error: createError } = createEntity
```

### Error Handling Pattern (Separate useEffect hooks)

```typescript
import { showToast } from '@/src/utils/toast'

// API Hooks
const { createEntity, updateEntity, deleteEntity } = useEntityAPI()

// Destructure with consistent pattern
const {
  isPending: isCreateLoading,
  mutateAsync: createEntityMutate,
  error: createEntityError,
} = createEntity

const {
  isPending: isUpdateLoading,
  mutateAsync: updateEntityMutate,
  error: updateEntityError,
} = updateEntity

const {
  isPending: isDeleteLoading,
  mutateAsync: deleteEntityMutate,
  error: deleteEntityError,
} = deleteEntity

// Handle errors with separate useEffect for better granular control
useEffect(() => {
  if (createEntityError) {
    showToast(createEntityError.value.message ?? t('notifications.createError'), 'error')
  }
}, [createEntityError, t])

useEffect(() => {
  if (updateEntityError) {
    showToast(updateEntityError.value.message ?? t('notifications.updateError'), 'error')
  }
}, [updateEntityError, t])

useEffect(() => {
  if (deleteEntityError) {
    showToast(deleteEntityError.value.message ?? t('notifications.deleteError'), 'error')
  }
}, [deleteEntityError, t])
```

### Success Handling Pattern (Direct in form submit)

```typescript
const handleFormSubmit = useCallback(
  async (data: EntityFormData, status: 'DRAFT' | 'PUBLISHED') => {
    const apiData = transformEntityToAPI({ ...data, status, highlight: data.highlight || false })

    if (editingEntity) {
      await updateEntityMutate({ id: editingEntity.id, data: apiData })
      showToast(t('notifications.updateSuccess'), 'success')
    } else {
      await createEntityMutate(apiData)
      showToast(t('notifications.createSuccess'), 'success')
    }
    handleCloseModal()
  },
  [updateEntityMutate, createEntityMutate, editingEntity, t, handleCloseModal]
)
```

### Delete Handler with Row Loading

```typescript
const handleConfirmDelete = useCallback(async () => {
  if (!deleteModal.data) return

  const entityId = deleteModal.data.id
  setLoadingRows((prev) => new Set(prev).add(entityId))

  await deleteEntity.mutateAsync(entityId)
  showToast(t('notifications.deleteSuccess'), 'success')
  setDeleteModal({ isOpen: false })

  setLoadingRows((prev) => {
    const newSet = new Set(prev)
    newSet.delete(entityId)
    return newSet
  })
}, [deleteModal.data, deleteEntity, t])
```

### Benefits

- **No State Management**: No notification state needed
- **Automatic Positioning**: Built-in positioning and stacking
- **Duplicate Prevention**: Uses message as ID
- **Better UX**: Smooth animations and auto-dismiss
- **Lightweight**: Smaller bundle size

### Row Loading State Pattern

```typescript
// Track loading state for specific rows
const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set());

// In DataGrid renderCell
renderCell: params => {
  const isRowLoading = loadingRows.has(params.row.id);
  return (
    <Box alignItems="center" gap={1} justifyContent="center">
      {isRowLoading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <IconButton color="warning" size="small" onClick={() => handleEdit(params.row)}>
            <EditIcon size={18} />
          </IconButton>
          <IconButton color="error" size="small" onClick={() => handleDelete(params.row)}>
            <DeleteIcon size={18} />
          </IconButton>
        </>
      )}
    </Box>
  );
}
```

### Benefits

- **Granular Feedback**: Show loading for specific items
- **Better Performance**: Don't disable entire table
- **Clear State**: User knows which item is being processed

### React Activity Component Usage

**Note**: Prefer local loading states (`CircularProgress`) over global Activity components.

### Basic Usage

```typescript
import { Activity, Fragment } from 'react';

const isLoading = useMemo((): boolean => {
  if (!_hasHydrated) return true;
  if (!authClient) return true;
  return false;
}, [authClient, _hasHydrated]);

return (
  <Fragment>
    <Activity mode={isLoading ? 'visible' : 'hidden'}>
      <CircularProgress isFullScreen />
    </Activity>

    <Activity mode={isLoading ? 'hidden' : 'visible'}>
      <MainContent />
    </Activity>
  </Fragment>
);
```
