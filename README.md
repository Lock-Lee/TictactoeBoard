# 🎮 Tic-Tac-Toe Game

A modern full-stack TypeScript Tic-Tac-Toe game with Google OAuth authentication, AI opponent (Minimax algorithm), and global leaderboard.

## 📦 Monorepo Structure

This project uses **Turborepo** with **Bun** workspaces.

```
tic-tac-toe-game/
├── apps/
│   ├── backend/          # Elysia API Server (Port 3000)
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   ├── features/
│   │   │   │   │   ├── auth/     # Google OAuth authentication
│   │   │   │   │   └── game/     # Game logic & leaderboard
│   │   │   │   ├── plugins/      # authorization, requestId
│   │   │   │   └── providers/    # cache (Redis), token (JWT)
│   │   │   └── index.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── package.json
│   │
│   └── frontend/         # Next.js App (Port 3001)
│       ├── src/
│       │   ├── app/
│       │   │   └── [locale]/     # i18n locale routing
│       │   │       ├── game/     # Game page
│       │   │       └── leaderboard/
│       │   ├── components/
│       │   │   └── game/
│       │   │       ├── LeaderboardTable/
│       │   │       └── TicTacToeBoard/
│       │   ├── hooks/
│       │   ├── providers/
│       │   └── stores/
│       └── package.json
│
├── packages/
│   ├── shared-types/     # Shared TypeScript types & enums
│   ├── tsconfig/         # Shared TypeScript configs
│   └── eslint-config/    # Shared ESLint configs
│
├── nginx/               # Nginx reverse proxy config
├── turbo.json           # Turborepo configuration
├── package.json         # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Bun** >= 1.0.0
- **Node.js** >= 18.0.0
- **PostgreSQL** >= 14
- **Redis** (optional, for caching)
- **Docker** (for local database)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd tic-tac-toe-game
```

2. **Install dependencies**

```bash
bun install
```

3. **Setup environment files**

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env with your credentials (Google OAuth, DB, Redis)

# Frontend
cp apps/frontend/.env.local.example apps/frontend/.env.local
```

4. **Start database**

```bash
docker compose up -d
```

5. **Setup database schema**

```bash
bun run db:generate
bun run db:push
```

6. **Start development servers**

```bash
# Start all apps
bun run dev

# Backend: http://localhost:3000
# Frontend: http://localhost:3001
```

## 🎯 Core Features

### 1. Google OAuth Authentication

- Google Sign-In with automatic player profile creation
- JWT session management via `jose`
- Protected endpoints with `authorizationPlugin`

### 2. Tic-Tac-Toe Game vs AI

- Play against a Minimax AI opponent
- All moves recorded as JSON
- WIN, LOSS, or DRAW outcomes tracked per game

### 3. Leaderboard & Scoring

- Global leaderboard ranked by score with pagination
- Player stats: total games, wins, losses, draws, win streaks
- Points awarded based on game results

## 🏗️ Tech Stack

### Backend

- **Runtime**: Bun
- **Framework**: Elysia
- **Effect-TS**: Functional error handling
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis with ioredis
- **Validation**: Zod
- **Auth**: Google OAuth + JWT (jose)
- **Logging**: Winston
- **API Docs**: Swagger with @elysiajs/swagger

### Frontend

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI (MUI) v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query v5
- **API Client**: Eden Treaty (type-safe Elysia client)
- **Forms**: React Hook Form + Zod
- **i18n**: i18next (EN/TH)
- **Notifications**: react-hot-toast
- **Linting**: Biome

### Shared

- **Language**: TypeScript 5.7
- **Package Manager**: Bun
- **Monorepo**: Turborepo

## 📚 Available Scripts

```bash
# Development
bun run dev              # Start all apps in dev mode
bun run build            # Build all apps
bun run lint             # Lint all packages (Biome)
bun run type-check       # Type check all packages

# Database
bun run db:generate      # Generate Prisma client
bun run db:push          # Push schema to database
bun run db:studio        # Open Prisma Studio

# Testing
bun run test             # Run tests
bun run test:e2e         # Run Playwright E2E tests
```

## 🔧 Environment Variables

### Backend (`apps/backend/.env`)

```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
DATABASE_URL="postgresql://ttt_user:ttt_password@localhost:5432/tictactoe_db"
JWT_SECRET=your-secret-min-32-chars
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3001
GOOGLE_CLIENT_ID=your-google-client-id
```

### Frontend (`apps/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Tic-Tac-Toe Game"
```

## 📖 Development Guidelines

### Backend: 3-Layer Architecture

```
feature/
├── handlers/      # HTTP interface (Elysia routes)
├── services/      # Business logic (Effect.gen)
├── repositories/  # Database operations (Prisma)
├── schemas/       # Validation (Zod)
└── utils/         # Feature utilities
```

### Key Principles

1. **Zero Error Policy**: Never commit code with lint/build errors
2. **Function-based Naming**: `createGameHandler.ts`, not `create.ts`
3. **No Barrel Exports**: Direct imports only
4. **Effect-TS for Async**: No plain async/await with try/catch
5. **Tree-shaking Optimized**: Direct imports from MUI and libraries
6. **Biome** for linting and formatting

## 🐳 Docker

```bash
# Development (database only)
docker compose up -d

# Production (full stack)
docker compose -f docker-compose.prod.yml up -d
```

## 🔗 API Documentation

- **Swagger UI**: http://localhost:3000/swagger

## 📄 License

MIT License - see LICENSE file for details
