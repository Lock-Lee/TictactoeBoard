# Backend API (Elysia)

Backend API server for Tic-Tac-Toe Game built with Elysia and Effect-TS.

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Start development server
bun run dev
```

## 📚 Scripts

```bash
bun run dev              # Start dev server (watch mode)
bun run build            # Build for production
bun run start            # Start production server
bun run lint             # Lint code
bun run type-check       # Type check
bun run db:generate      # Generate Prisma client
bun run db:push          # Push schema to DB
bun run db:migrate:create # Create migration
bun run db:studio        # Open Prisma Studio
```

## 🏗️ Architecture

### 3-Layer Pattern

Each feature follows this structure:

```
features/auth/
├── handlers/           # HTTP layer (Elysia routes)
│   ├── loginHandler.ts
│   └── logoutHandler.ts
├── services/           # Business logic (Effect.gen)
│   ├── loginService.ts
│   └── logoutService.ts
├── repositories/       # Database (Prisma)
│   ├── getUserRepository.ts
│   └── createSessionRepository.ts
├── schemas/            # Validation (Zod)
│   └── loginSchema.ts
├── utils/
│   ├── runtime.ts      # Feature runtime
│   └── errors.ts       # Tagged errors
└── router.ts           # Main router
```

## 📖 Development Guidelines

Read these files before starting:

- `../../.github/AI_INSTRUCTIONS.md`
- `../../.github/instructions/backend.instructions.md`
- `../../.github/instructions/database.instructions.md`
- `../../.github/instructions/quality.instructions.md`

## 🔑 Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://..."
JWT_SECRET=your-secret
REDIS_URL=redis://localhost:6379
```

## 📡 API Documentation

Swagger UI available at: http://localhost:3000/swagger
