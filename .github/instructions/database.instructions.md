---
applyTo: 'prisma/**'
---

# 💾 Database & Prisma

## Database Models

### Referential Action Rules (CRITICAL)

**ALL relations MUST follow these rules:**

- **`onUpdate`**: ALWAYS use `Cascade` - propagate all updates from referenced record
- **`onDelete`**: ALWAYS use `SetNull` - prevent data loss, keep audit trail intact

**NEVER use:**

- ❌ `onDelete: Cascade` - Would delete data when deleting users/tenants
- ❌ `onDelete: Restrict` - Prevents legitimate deletions
- ❌ `onUpdate: SetNull` - Breaks referential integrity on updates
- ❌ `onUpdate: Restrict` - Prevents legitimate updates

### Main Model Template

```prisma
model {ModelName} {
  id     String @id @default(cuid())
  name   String
  active Boolean @default(true)

  // Multi-Tenancy (Required)
  tenantCode   String?
  tenantDetail Tenant? @relation(name: "{ModelName}Tenant", fields: [tenantCode], references: [code], onUpdate: Cascade, onDelete: SetNull)

  // Activity Tracking (Required)
  createdAt    DateTime? @default(now())
  createdBy    String?
  createByUser User?     @relation(name: "Created{ModelName}", fields: [createdBy], references: [id], onUpdate: Cascade, onDelete: SetNull)
  updatedAt    DateTime? @updatedAt
  updatedBy    String?
  updateByUser User?     @relation(name: "Updated{ModelName}", fields: [updatedBy], references: [id], onUpdate: Cascade, onDelete: SetNull)
  deletedAt    DateTime?
  deletedBy    String?
  deleteByUser User?     @relation(name: "Deleted{ModelName}", fields: [deletedBy], references: [id], onUpdate: Cascade, onDelete: SetNull)

  // Relations
  {ModelName}AuditLog {ModelName}AuditLog[] @relation(name: "{ModelName}AuditLog")

  @@index([active])
  @@index([tenantCode])
  @@index([deletedAt])
}
```

### Audit Log Model Template

```prisma
model {ModelName}AuditLog {
  id              String       @id @default(cuid())
  refId           String?
  {modelName}     {ModelName}? @relation(name: "{ModelName}AuditLog", fields: [refId], references: [id], onUpdate: Cascade, onDelete: SetNull)
  action          AUDIT_ACTION
  performedAt     DateTime?    @default(now())
  performedBy     String?
  performedByUser User?        @relation(name: "{ModelName}AuditLog_PerformedByUser", fields: [performedBy], references: [id], onUpdate: Cascade, onDelete: SetNull)
  ipAddress       String?      // Track IP address for audit purposes

  @@index([refId])
  @@index([action])
  @@index([performedBy])
}
```

### Multi-language Content Models

```prisma
model {ModelName}Content {
  id           String        @id @default(cuid())
  {modelName}Id String?
  {modelName}  {ModelName}?  @relation(name: "{ModelName}Content", fields: [{modelName}Id], references: [id], onUpdate: Cascade, onDelete: SetNull)
  language     APP_LANGUAGE
  title        String
  content      String

  @@unique([{modelName}Id, language])
  @@index([{modelName}Id])
  @@index([language])
}
```

### Real Example: News Feature

```prisma
model News {
  id            String      @id @default(cuid())
  title         String
  content       String
  coverImage    String?
  referenceLink String?
  startDate     DateTime
  endDate       DateTime
  highlight     Boolean     @default(false)
  status        NEWS_STATUS @default(DRAFT)
  active        Boolean     @default(true)

  // Multi-Tenancy
  tenantCode   String?
  tenantDetail Tenant? @relation(name: "NewsTenant", fields: [tenantCode], references: [code], onUpdate: Cascade, onDelete: SetNull)

  // Activity Tracking
  createdAt    DateTime? @default(now())
  createdBy    String?
  createByUser User?     @relation(name: "CreatedNews", fields: [createdBy], references: [id], onUpdate: Cascade, onDelete: SetNull)
  updatedAt    DateTime? @updatedAt
  updatedBy    String?
  updateByUser User?     @relation(name: "UpdatedNews", fields: [updatedBy], references: [id], onUpdate: Cascade, onDelete: SetNull)
  deletedAt    DateTime?
  deletedBy    String?
  deleteByUser User?     @relation(name: "DeletedNews", fields: [deletedBy], references: [id], onUpdate: Cascade, onDelete: SetNull)

  // Relations
  NewsAuditLog   NewsAuditLog[] @relation(name: "NewsAuditLog")
  publishOnPages NewsBlokPage[] @relation(name: "NewsBlokPageRelation")

  @@index([status])
  @@index([startDate])
  @@index([endDate])
  @@index([highlight])
  @@index([tenantCode])
}

// Junction table for Many-to-Many relationship
model NewsBlokPage {
  id         String    @id @default(cuid())
  newsId     String
  blokPageId String
  news       News      @relation(name: "NewsBlokPageRelation", fields: [newsId], references: [id], onUpdate: Cascade, onDelete: Cascade)
  blokPage   BlokPage  @relation(name: "NewsBlokPageRelation", fields: [blokPageId], references: [id], onUpdate: Cascade, onDelete: Cascade)
  createdAt  DateTime? @default(now())

  @@unique([newsId, blokPageId])
  @@index([newsId])
  @@index([blokPageId])
}

model NewsAuditLog {
  id              String       @id @default(cuid())
  refId           String?
  news            News?        @relation(name: "NewsAuditLog", fields: [refId], references: [id], onUpdate: SetNull, onDelete: SetNull)
  action          AUDIT_ACTION
  performedAt     DateTime?    @default(now())
  performedBy     String?
  performedByUser User?        @relation(name: "NewsAuditLog_PerformedByUser", fields: [performedBy], references: [id], onUpdate: SetNull, onDelete: SetNull)
  ipAddress       String?

  @@index([refId])
  @@index([action])
  @@index([performedBy])
}
```

### Soft Delete Enforcement

#### Rules

- Use `deletedAt` and `deletedBy` instead of hard deletes
- All queries must filter `deletedAt IS NULL`
- Soft delete uses `update` to set `deletedAt` and `deletedBy`
- Record `SOFT_DELETE` actions in audit log

#### Query Performance

```prisma
@@index([tenantCode, deletedAt])
@@index([tenantCode, active, deletedAt])  // For list pages with active filter
```
