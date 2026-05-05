# Data Model: Database Integration

**Feature**: 004-db-integration  
**Date**: 2026-05-05

---

## Enums

### ContentType
```prisma
enum ContentType {
  TEXT
  FILE
}
```
Used by `Item.contentType` to distinguish text-based items (Snippet, Prompt, Note, Command) from file-based items (File, Image).

---

## Models

### User
Central entity. Owns all application data. Merges application fields with NextAuth adapter requirements.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String @id @default(cuid())` | |
| `email` | `String @unique` | |
| `emailVerified` | `DateTime?` | Required by NextAuth adapter |
| `name` | `String?` | Required by NextAuth adapter |
| `image` | `String?` | Required by NextAuth adapter |
| `password` | `String?` | Nullable — OAuth users have no password |
| `isPro` | `Boolean @default(false)` | Freemium gate |
| `stripeCustomerId` | `String?` | Placeholder for billing |
| `stripeSubscriptionId` | `String?` | Placeholder for billing |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |
| `items` | `Item[]` | |
| `itemTypes` | `ItemType[]` | User-defined types only |
| `collections` | `Collection[]` | |
| `tags` | `Tag[]` | |
| `accounts` | `Account[]` | NextAuth |
| `sessions` | `Session[]` | NextAuth |

**Indexes**: `email` (unique, implicit)

---

### Item
A single stashed resource.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String @id @default(cuid())` | |
| `title` | `String` | |
| `contentType` | `ContentType` | Enum: `TEXT` or `FILE` |
| `content` | `String?` | Used when `contentType = TEXT` |
| `fileUrl` | `String?` | Used when `contentType = FILE` |
| `fileName` | `String?` | |
| `fileSize` | `Int?` | Bytes |
| `url` | `String?` | For URL item type |
| `description` | `String?` | |
| `isFavorite` | `Boolean @default(false)` | |
| `isPinned` | `Boolean @default(false)` | |
| `language` | `String?` | For syntax highlighting |
| `userId` | `String` | FK → User |
| `typeId` | `String` | FK → ItemType |
| `collectionId` | `String?` | FK → Collection (nullable) |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |
| `user` | `User` | `onDelete: Cascade` |
| `type` | `ItemType` | `onDelete: Restrict` |
| `collection` | `Collection?` | `onDelete: Cascade` |
| `tags` | `ItemTag[]` | |

**Indexes**: `@@index([userId])`, `@@index([typeId])`, `@@index([collectionId])`

---

### ItemType
Describes the kind of item. System types have `userId = null`; user-defined Pro types have a `userId`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String @id @default(cuid())` | |
| `name` | `String` | e.g., "Snippet", "Prompt" |
| `icon` | `String?` | Icon identifier |
| `color` | `String?` | Display color |
| `isSystem` | `Boolean @default(false)` | True for built-in types |
| `userId` | `String?` | Null for system types |
| `user` | `User?` | `onDelete: Cascade` |
| `items` | `Item[]` | |

**Indexes**: `@@index([userId])`

---

### Collection
A named grouping of Items.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String @id @default(cuid())` | |
| `name` | `String` | |
| `description` | `String?` | |
| `isFavorite` | `Boolean @default(false)` | |
| `userId` | `String` | FK → User |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |
| `user` | `User` | `onDelete: Cascade` |
| `items` | `Item[]` | |

**Indexes**: `@@index([userId])`

---

### Tag
User-scoped label. Name is unique per user.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String @id @default(cuid())` | |
| `name` | `String` | Normalized (lowercase, trimmed) at app layer |
| `userId` | `String` | FK → User |
| `user` | `User` | `onDelete: Cascade` |
| `items` | `ItemTag[]` | |

**Constraints**: `@@unique([userId, name])`  
**Indexes**: `@@index([userId])`

---

### ItemTag
Join table for Items ↔ Tags (many-to-many).

| Field | Type | Notes |
|-------|------|-------|
| `itemId` | `String` | FK → Item |
| `tagId` | `String` | FK → Tag |
| `item` | `Item` | `onDelete: Cascade` |
| `tag` | `Tag` | `onDelete: Cascade` |

**Constraints**: `@@id([itemId, tagId])`

---

### Account *(NextAuth adapter)*
OAuth provider accounts linked to a User.

| Field | Type | Notes |
|-------|------|-------|
| `userId` | `String` | FK → User |
| `type` | `String` | |
| `provider` | `String` | |
| `providerAccountId` | `String` | |
| `refresh_token` | `String?` | |
| `access_token` | `String?` | |
| `expires_at` | `Int?` | |
| `token_type` | `String?` | |
| `scope` | `String?` | |
| `id_token` | `String?` | |
| `session_state` | `String?` | |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |
| `user` | `User` | `onDelete: Cascade` |

**Constraints**: `@@id([provider, providerAccountId])`

---

### Session *(NextAuth adapter)*
Active user sessions.

| Field | Type | Notes |
|-------|------|-------|
| `sessionToken` | `String @unique` | |
| `userId` | `String` | FK → User |
| `expires` | `DateTime` | |
| `createdAt` | `DateTime @default(now())` | |
| `updatedAt` | `DateTime @updatedAt` | |
| `user` | `User` | `onDelete: Cascade` |

**Indexes**: `@@index([userId])`

---

### VerificationToken *(NextAuth adapter)*
Email sign-in tokens (one-time use).

| Field | Type | Notes |
|-------|------|-------|
| `identifier` | `String` | Usually the user's email |
| `token` | `String` | |
| `expires` | `DateTime` | |

**Constraints**: `@@id([identifier, token])`

---

## Cascade & Restrict Summary

| Relation | On Delete |
|----------|-----------|
| User → Items | Cascade |
| User → Collections | Cascade |
| User → Tags | Cascade |
| User → ItemTypes | Cascade |
| User → Accounts | Cascade |
| User → Sessions | Cascade |
| Collection → Items | Cascade |
| ItemType → Items | **Restrict** |
| Item → ItemTags | Cascade |
| Tag → ItemTags | Cascade |

---

## Seed Data

System ItemTypes created by `prisma/seed.ts` (idempotent via `upsert`):

| name | icon | isSystem |
|------|------|----------|
| Snippet | `code` | true |
| Prompt | `sparkles` | true |
| Note | `file-text` | true |
| Command | `terminal` | true |
| File | `file` | true |
| Image | `image` | true |
| URL | `link` | true |
