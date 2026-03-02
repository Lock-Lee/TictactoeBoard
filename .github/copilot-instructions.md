# � Tic-Tac-Toe Game

## 📋 Overview

This is a Tic-Tac-Toe game application built with modern full-stack TypeScript architecture. Players authenticate via Google OAuth, play against an AI opponent, and compete on a global leaderboard with score tracking.

## 🎯 Core Features

### 1. Google OAuth Authentication

- **Google Sign-In**: Players authenticate using Google OAuth credentials
- **Player Profiles**: Automatic profile creation with Google account info (name, email, image)
- **JWT Tokens**: Session management via JWT after OAuth verification

### 2. Tic-Tac-Toe Game

- **Play vs AI**: Players compete against an AI opponent
- **Move Tracking**: All game moves are recorded as JSON
- **Result Recording**: WIN, LOSS, or DRAW outcomes tracked per game

### 3. Leaderboard & Scoring

- **Global Leaderboard**: Ranked by score with pagination
- **Player Stats**: Track total games, wins, losses, draws, win streaks
- **Score System**: Points awarded based on game results

## 🏗️ Architecture

### Backend Stack

- **Runtime**: Bun
- **Framework**: Elysia (TypeScript-first web framework)
- **Effect-TS**: For functional programming patterns and error handling
- **Database**: Prisma ORM with PostgreSQL (via `@prisma/adapter-pg`)
- **Caching**: Redis via ioredis
- **Auth**: Google OAuth with JWT (jose)
- **Logging**: Winston
- **Architecture**: 3-Layer Pattern (Handler → Service → Repository)

### Frontend Stack

- **Framework**: Next.js 15 with React 19 and TypeScript
- **UI Library**: Material-UI (MUI) v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query) v5
- **API Client**: Eden Treaty (Type-safe Elysia client)
- **Forms**: React Hook Form + Zod validation
- **Routing**: Next.js App Router with i18n (`next-i18n-router`)
- **Internationalization**: i18next + react-i18next (EN/TH)
- **Notifications**: react-hot-toast
- **Maps**: Leaflet + react-leaflet (with heatmap and marker cluster)
- **Testing**: Playwright (E2E), Vitest (unit)
- **Storybook**: Component development and documentation
- **Linting**: Biome

## 📁 Monorepo Structure

This project uses **Turborepo** with **Bun** workspaces.

```
tic-tac-toe-game/
├── apps/
│   ├── backend/               # Elysia API Server (Port 3000)
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   ├── features/ # Domain features
│   │   │   │   │   ├── auth/         # Google OAuth authentication
│   │   │   │   │   └── game/         # Game logic & leaderboard
│   │   │   │   ├── middleware/
│   │   │   │   ├── plugins/          # authorization, requestId
│   │   │   │   ├── providers/        # cache (Redis), token (JWT)
│   │   │   │   └── utils/
│   │   │   ├── config/
│   │   │   ├── libs/
│   │   │   │   ├── effect/
│   │   │   │   ├── logger/
│   │   │   │   └── prisma/generated/
│   │   │   └── index.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   │
│   └── frontend/              # Next.js App (Port 3001)
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx
│       │   │   └── [locale]/         # i18n locale routing
│       │   │       ├── page.tsx
│       │   │       ├── game/         # Game page
│       │   │       └── leaderboard/  # Leaderboard page
│       │   ├── components/
│       │   │   └── game/
│       │   │       ├── LeaderboardTable/
│       │   │       └── TicTacToeBoard/
│       │   ├── hooks/
│       │   │   ├── api/              # useAPIClient, useGameAPI
│       │   │   ├── useLocale.ts
│       │   │   ├── useLocalizedRouter.ts
│       │   │   └── useQueryParams.ts
│       │   ├── lib/
│       │   │   └── i18n/             # i18n configuration
│       │   ├── locales/
│       │   │   ├── en/               # English translations
│       │   │   └── th/               # Thai translations
│       │   ├── providers/            # I18n, Query, Theme
│       │   ├── stores/               # Zustand (authStore)
│       │   └── theme/                # MUI theme
│       └── package.json
│
├── packages/
│   ├── shared-types/          # Shared TypeScript types & enums
│   ├── tsconfig/              # Shared TypeScript configs
│   └── eslint-config/         # Shared ESLint configs
│
├── nginx/                     # Nginx reverse proxy config
├── .github/
│   ├── copilot-instructions.md
│   └── instructions/          # Development guidelines
├── biome.json                 # Biome linter/formatter config
├── turbo.json                 # Turborepo configuration
└── package.json               # Root package.json
```

## 🗃️ Database Models

### GamePlayer

- Player profile from Google OAuth (email, name, image)
- Score, win streak, total games/wins/losses/draws
- Unique constraint on `[provider, providerId]`

### Game

- Individual game record linked to a player
- Result enum: `WIN`, `LOSS`, `DRAW`
- Moves stored as JSON array

## 🔑 Key Technical Patterns

### Backend Architecture (3-Layer)

Each feature follows a strict 3-layer architecture:

```
feature/
├── handlers/      # HTTP interface (Elysia routes)
├── services/      # Business logic (Effect.gen)
├── repositories/  # Database operations (Prisma)
├── schemas/       # Validation (Zod)
└── utils/         # Feature-specific utilities
```

### Authentication & Authorization

- **Google OAuth** authentication flow
- **JWT tokens** issued via `jose` library after OAuth verification
- **authorizationPlugin** for protected endpoints
- **Token payload**: `{ userId, username, roleId, tenantId, sessionId }`

### Error Handling

- **Tagged Errors** with Effect-TS (NO `throw` statements)
- **Centralized error mapping** to HTTP status codes
- **Typed error responses** across all layers

### Frontend Patterns

- **Tree-shaking optimized** imports (direct imports only)
- **Eden Treaty** for type-safe API calls
- **Stable QueryKey** pattern for optimal caching
- **Toast notifications** for user feedback
- **Internationalization** with i18next (EN/TH locales)
- **Zustand** for auth state management

## 🚀 Getting Started

### Prerequisites

- Bun 1.0+
- PostgreSQL 14+
- Redis (for caching)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd tic-tac-toe-game

# Install dependencies
bun install

# Setup environment files
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.local.example apps/frontend/.env.local
# Edit .env files with your credentials (Google OAuth, DB, Redis)

# Setup database
bun run db:generate
bun run db:push

# Start all development servers
bun run dev
# Backend: http://localhost:3000
# Frontend: http://localhost:3001
```

### Quality Checks

```bash
# Linting with Biome (MUST pass with 0 errors)
bun run lint

# Type checking
bun run type-check

# Build (MUST succeed)
bun run build

# Run tests
bun run test

# Run E2E tests
bun run test:e2e
```

## 📚 Development Guidelines

### Required Reading

Before starting ANY task, read these instruction files:

1. `.github/instructions/backend.instructions.md` - Backend patterns
2. `.github/instructions/frontend.instructions.md` - Frontend patterns
3. `.github/instructions/quality.instructions.md` - Code quality standards
4. `.github/instructions/database.instructions.md` - Database patterns
5. `.github/instructions/zod.instructions.md` - Validation patterns
6. `.github/instructions/testing.instructions.md` - Testing strategies
7. `.github/instructions/image-upload.instructions.md` - Image upload handling

### Core Principles

1. **Zero Error Policy**: Never commit code with lint/build errors
2. **Function-based naming**: `createGameHandler.ts`, not `create.ts`
3. **No barrel exports**: Direct imports only
4. **Effect-TS for async**: No plain async/await with try/catch
5. **Tree-shaking optimized**: Direct imports from MUI and other libraries
6. **Biome** for linting and formatting (not ESLint)

## 🔐 Security

- **Google OAuth** for authentication (no password-based auth)
- **JWT token management** via jose
- **CORS protection** with configurable origin
- **Security headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, HSTS (production)
- **SQL injection prevention** (Prisma parameterized queries)

## 🎨 UI/UX Features

- **Responsive design** with MUI breakpoints
- **Multi-language support** (English and Thai via i18next)
- **Toast notifications** for user feedback
- **Form validation** with Zod schemas
- **Game board** with interactive Tic-Tac-Toe UI
- **Leaderboard table** with player rankings and stats
- **Data tables** with sorting, filtering, pagination (MUI X Data Grid)
- **Storybook** for component development and documentation

## 🧪 Testing

- **E2E tests**: Playwright (`bun run test:e2e`)
- **Unit tests**: Vitest for frontend, Bun test for backend
- **Storybook**: Visual component testing
- **Test UI**: Playwright UI mode (`bun run test:ui`)

## 📖 Documentation

This project includes comprehensive development instructions in `.github/instructions/`:

- Backend architecture and patterns
- Frontend component guidelines
- Database schema design
- Testing strategies
- Quality standards
- Image upload handling
- Zod validation patterns

## 🤝 Contributing

1. Read all `.github/instructions/*.md` files
2. Follow the 3-layer architecture pattern
3. Write tests for new features
4. Ensure all quality checks pass (Biome lint, build, type-check)
5. Follow naming conventions

## 📄 License

MIT License - see LICENSE file for details
