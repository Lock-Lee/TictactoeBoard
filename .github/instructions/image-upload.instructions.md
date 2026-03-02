---
applyTo: 'src/api/features/**,src/pages/**'
---

# Image Upload Handling Pattern (COMPREHENSIVE GUIDE)

## 3-Condition Image Upload Standard (CRITICAL)

**ALL image upload operations MUST handle these 3 conditions consistently:**

1. **Empty string `""`** = Remove current image and save empty to database
2. **`/{bucket_name}/{file_name}`** = No change, user didn't modify image
3. **`data:image/...;base64,...`** = User uploaded new image, delete old and upload new

### Frontend-Backend Contract

**Frontend** uses empty string `""` for deletion signal, **Backend** Handler converts empty string to `undefined`, **Service** layer handles both `undefined` and empty string cases.

## Backend Handler Conversion (CRITICAL)

**Handlers MUST convert empty string to undefined when calling services:**

```typescript
// In updateEntityHandler.ts
coverImage: body.coverImage === '' ? undefined : body.coverImage,
```

**BUT Services MUST handle BOTH undefined AND empty string for robustness:**

```typescript
// In updateEntityService.ts - handleImageUpload function
if (imageUrl === undefined || imageUrl === '') {
  yield * deleteOldImage(existingImageUrl, objectStorageProvider)
  return null
}
```

## Frontend Form Transformation

**Frontend ALWAYS sends empty string for deletion, never undefined:**

```typescript
// In transformEntityToAPI function
let coverImage: string

if (formData.coverImage === '') {
  coverImage = '' // Send empty string for deletion
} else if (formData.coverImage?.startsWith('data:image/')) {
  coverImage = formData.coverImage // Send base64 for upload
} else {
  coverImage = formData.coverImage || '' // Send URL or empty string
}

return {
  // ... other fields
  coverImage, // Always include field in JSON
}
```

## Service Layer Image Upload Implementation

### Create Service Pattern

```typescript
import { Effect } from 'effect'
import type { ObjectStorageProvider } from '@/src/api/providers/object-storage'

// Helper function for image upload logic (Service Layer)
const handleImageUpload = (
  imageUrl: string | null | undefined,
  existingImageUrl: string | null,
  imageType: string,
  entityId: string,
  objectStorageProvider: ObjectStorageProvider
) => {
  return Effect.gen(function* () {
    // Case 1: undefined or empty string = Remove current image and save null to database
    if (imageUrl === undefined || imageUrl === '') {
      yield* deleteOldImage(existingImageUrl, objectStorageProvider)
      return null
    }

    // Case 2: /{bucket_name}/{file_name} = No change, user didn't modify image
    if (imageUrl?.startsWith('/')) {
      return imageUrl
    }

    // Case 3: base64 string = User uploaded new image, delete old and upload new
    if (imageUrl?.startsWith('data:image')) {
      // Delete old image if exists
      yield* deleteOldImage(existingImageUrl, objectStorageProvider)

      // Upload new image
      const uploadResult = yield* objectStorageProvider.uploadBase64(
        'entity-images',
        imageUrl,
        `entity-${imageType}-${entityId}-${Date.now()}`
      )
      return uploadResult.url
    }

    // Default case: keep existing image for any other values
    return existingImageUrl
  })
}

export const createEntityService = (props: CreateEntityServiceProps) => {
  return Effect.gen(function* () {
    const objectStorageProvider = yield* ObjectStorageProvider

    // Handle image upload with 3-condition pattern
    let processedCoverImage: string | null | undefined
    if ('coverImage' in props) {
      processedCoverImage = yield* handleImageUpload(
        props.coverImage,
        null, // No existing image for create
        'cover',
        props.entityId,
        objectStorageProvider
      )
    }

    // Create entity with processed image URL
    const entity = yield* createEntityRepository({
      ...props,
      coverImage: processedCoverImage,
    })

    // Clear cache and return transformed data
    const cacheProvider = yield* CacheProvider
    yield* cacheProvider.clear('entity:*')

    return {
      id: entity.id,
      name: entity.name,
      coverImage: entity.coverImage,
      createdAt: entity.createdAt?.toISOString() ?? null,
    }
  })
}
```

### Update Service Pattern

```typescript
export const updateEntityService = (props: UpdateEntityServiceProps) => {
  return Effect.gen(function* () {
    const objectStorageProvider = yield* ObjectStorageProvider

    // Get existing entity first
    const existingEntity = yield* getEntityRepository({ id: props.id })
    if (!existingEntity) {
      return yield* Effect.fail(EntityNotFoundError.new('Entity not found')())
    }

    // Handle image upload with 3-condition pattern
    let processedCoverImage: string | null | undefined
    if ('coverImage' in props) {
      processedCoverImage = yield* handleImageUpload(
        props.coverImage,
        existingEntity.coverImage,
        'cover',
        props.id,
        objectStorageProvider
      )
    }

    // Update entity
    const updatedEntity = yield* updateEntityRepository({
      ...props,
      coverImage: processedCoverImage,
    })

    // Clear cache
    const cacheProvider = yield* CacheProvider
    yield* cacheProvider.clear('entity:*')

    return {
      id: updatedEntity.id,
      name: updatedEntity.name,
      coverImage: updatedEntity.coverImage,
      updatedAt: updatedEntity.updatedAt?.toISOString() ?? null,
    }
  })
}
```

### Delete Service Pattern

```typescript
export const deleteEntityService = (props: DeleteEntityServiceProps) => {
  return Effect.gen(function* () {
    const objectStorageProvider = yield* ObjectStorageProvider

    // Get entity to delete associated images
    const entity = yield* getEntityRepository({ id: props.id })
    if (!entity) {
      return yield* Effect.fail(EntityNotFoundError.new('Entity not found')())
    }

    // Delete associated images from MinIO
    if (entity.coverImage) {
      const fileName = entity.coverImage.split('/').pop() || ''
      yield* objectStorageProvider.removeFile('entity-images', fileName)
    }

    // Soft delete entity
    const deletedEntity = yield* deleteEntityRepository({
      id: props.id,
      deletedBy: props.deletedBy,
    })

    // Clear cache
    const cacheProvider = yield* CacheProvider
    yield* cacheProvider.clear('entity:*')

    return {
      id: deletedEntity.id,
      deletedAt: deletedEntity.deletedAt?.toISOString() ?? null,
    }
  })
}
```

## Multi-Image Entity Pattern (BlokPage with logo + cover)

```typescript
const handleMultipleImages = (
  logoUrl: string | null | undefined,
  coverUrl: string | null | undefined,
  existingLogoUrl: string | null,
  existingCoverUrl: string | null,
  bucketName: string,
  entityId: string
) => {
  return Effect.gen(function* () {
    const objectStorageProvider = yield* ObjectStorageProvider

    // Process logo image
    let processedLogoUrl: string | null | undefined
    if ('logoUrl' in props) {
      processedLogoUrl = yield* handleImageUpload(
        logoUrl,
        existingLogoUrl,
        'logo',
        entityId,
        objectStorageProvider
      )
    }

    // Process cover image
    let processedCoverUrl: string | null | undefined
    if ('coverUrl' in props) {
      processedCoverUrl = yield* handleImageUpload(
        coverUrl,
        existingCoverUrl,
        'cover',
        entityId,
        objectStorageProvider
      )
    }

    return {
      logoUrl: processedLogoUrl,
      coverUrl: processedCoverUrl,
    }
  })
}
```

### Delete Service with Multiple Images

```typescript
const deleteImagesFromStorage = (
  logoUrl: string | null,
  coverUrl: string | null,
  bucketName: string
) => {
  return Effect.gen(function* () {
    const objectStorageProvider = yield* ObjectStorageProvider

    // Delete logo image
    if (logoUrl) {
      const logoFileName = logoUrl.split('/').pop() || ''
      yield* objectStorageProvider.removeFile(bucketName, logoFileName)
    }

    // Delete cover image
    if (coverUrl) {
      const coverFileName = coverUrl.split('/').pop() || ''
      yield* objectStorageProvider.removeFile(bucketName, coverFileName)
    }
  })
}
```

## Service Layer Property Detection (CRITICAL)

**MUST use 'in' operator instead of undefined comparison for optional properties:**

### ❌ WRONG - Undefined Comparison

```typescript
// This will NOT work when property exists but value is undefined
if (props.logoUrl !== undefined) {
  logoImageUrl = yield* handleImageUpload(props.logoUrl, ...);
}
```

### ✅ CORRECT - Property Detection

```typescript
// This will work when property exists, regardless of value
if ('logoUrl' in props) {
  logoImageUrl = yield* handleImageUpload(props.logoUrl, ...);
}
```

### Backend Handler to Service Contract

```typescript
// Handler converts empty string to undefined
logoUrl: body.logoUrl === '' ? undefined : body.logoUrl,

// Service checks if property was sent (even if undefined)
if ('logoUrl' in props) {
  // handleImageUpload will receive undefined and delete image
  logoImageUrl = yield* handleImageUpload(props.logoUrl, ...);
}
```

## Frontend Integration

```typescript
// Frontend properly sends these 3 conditions:
const transformEntityToAPI = (data: EntityFormData) => ({
  name: data.name,
  coverImage: data.coverImage, // Can be undefined, /{bucket}/{file}, or base64
  // ... other fields
})

// ImageUpload component handles:
// - File selection → base64 conversion
// - Remove button → sets value to empty string ""
// - Existing images → preserves URL string
```

## Critical Rules for Image Upload

1. **Consistent Behavior**: ALL create/update services must handle the 3 conditions
2. **Old Image Cleanup**: ALWAYS delete old images when uploading new ones or when undefined
3. **Delete Service Cleanup**: ALWAYS remove images from MinIO when deleting entities
4. **Bucket Organization**: Use descriptive bucket names (`news-images`, `blok-page-images`, `calendar-images`)
5. **Error Handling**: Wrap all ObjectStorageProvider operations in proper Effect error handling
6. **Cache Invalidation**: Clear relevant cache patterns after image operations
7. **Property Detection**: Use `'logoUrl' in props` instead of `props.logoUrl !== undefined` in service layer

## Common Image Upload Issues (FIXED)

### Problem: Image deletion not working in forms

**Symptoms**:

- User clicks "Remove Image" and saves form
- API receives empty string but database still contains old image URL
- Form reload shows image preview again

**Root Cause**: Service layer `handleImageUpload` functions only handled `undefined` for deletion, not empty string `""`

**Solution Applied**: Updated all image upload services to handle both cases:

```typescript
// Before (Bug)
if (imageUrl === undefined) {
  yield * deleteOldImage(existingImageUrl, objectStorageProvider)
  return null
}

// After (Fixed)
if (imageUrl === undefined || imageUrl === '') {
  yield * deleteOldImage(existingImageUrl, objectStorageProvider)
  return null
}
```

### ImageUpload Component Troubleshooting (CRITICAL)

#### ⚠️ Browser Security Limitations in Testing

**Issue**: ImageUpload component appears broken during automation testing (file dialog doesn't open when clicked)

**Root Cause**: Browser security policies prevent automation tools from opening file dialogs to protect against malicious scripts.

**Symptoms in Automation**:

- Card renders correctly with `cursor: pointer`
- onClick handlers are present and working
- `input.click()` executes without errors
- File dialog never appears
- All tests show "broken" behavior

**Reality**: ImageUpload component is **WORKING CORRECTLY** for real users.

#### Testing Verification Steps

```javascript
// 1. Verify DOM structure is correct
const cards = document.querySelectorAll('.MuiCard-root')
const imageUploadCard = Array.from(cards).find((card) =>
  card.textContent?.includes('Click to upload')
)

console.log('Card found:', !!imageUploadCard)
console.log('Has onClick:', !!imageUploadCard?.onclick)
console.log('Cursor style:', window.getComputedStyle(imageUploadCard).cursor)

// 2. Verify file input exists and is accessible
const fileInputs = document.querySelectorAll('input[type="file"]')
console.log('File inputs:', fileInputs.length)

fileInputs.forEach((input, i) => {
  console.log(`Input ${i}:`, {
    accept: input.accept,
    disabled: input.disabled,
    style: input.style.display,
  })
})

// 3. Test click execution (will work but no file dialog in automation)
imageUploadCard?.click() // ✅ Executes
fileInputs[0]?.click() // ✅ Executes, but no dialog due to browser security
```

#### Expected Behavior

**In Automation Environment**:

- ❌ File dialog blocked by browser security
- ✅ All DOM elements render correctly
- ✅ Event handlers execute successfully
- ✅ Component logic works perfectly

**For Real Users**:

- ✅ File dialog opens normally
- ✅ Image upload and cropping works
- ✅ Preview and removal functions work
- ✅ All form integration works correctly

#### Manual Testing Required

To verify ImageUpload functionality, perform **manual testing** with real user interactions:

1. Open browser normally (not automation)
2. Click ImageUpload card areas
3. Verify file dialog opens
4. Test image selection, cropping, preview
5. Test image removal functionality
6. Verify form submission with images

#### Component Integration Verification

```typescript
// Verify React Hook Form integration
const coverImageValue = watch('coverImage');
console.log('Form value:', coverImageValue);

// Verify onChange handler
const handleImageChange = useCallback((value: string) => {
  setValue('coverImage', value, { shouldValidate: true });
}, [setValue]);

// Verify ImageUpload props
<ImageUpload
  value={coverImageValue || ''}
  onChange={handleImageChange}
  aspectRatio={21 / 9}
  label={t('placeholders.coverImage')}
  disabled={isLoading}
/>
```

#### Common False Positives

1. **"ImageUpload not working"** → Actually browser security blocking automation
2. **"File dialog not opening"** → Normal in headless/automation browsers
3. **"Click handlers broken"** → Handlers work, security blocks dialog
4. **"Form integration issues"** → Form integration is correct

#### Debug vs Production Behavior

| Environment        | File Dialog | DOM Events | Component Logic |
| ------------------ | ----------- | ---------- | --------------- |
| **Automation**     | ❌ Blocked  | ✅ Working | ✅ Working      |
| **Manual Browser** | ✅ Working  | ✅ Working | ✅ Working      |
| **Production**     | ✅ Working  | ✅ Working | ✅ Working      |

**Remember**: ImageUpload components are fully functional. Browser security in automation is expected and normal.

## Benefits

- **Consistent Image Handling**: All features behave identically
- **No Image Orphans**: Proper cleanup prevents storage waste
- **Clear Intent**: 3 conditions make developer intent explicit
- **Frontend/Backend Alignment**: Both layers understand the same contract
