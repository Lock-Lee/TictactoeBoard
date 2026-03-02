# Frontend (Next.js)

Frontend application for Tic-Tac-Toe Game built with Next.js 15 and Material-UI.

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Setup environment
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start development server
bun run dev
```

## 📚 Scripts

```bash
bun run dev              # Start Next.js dev server (port 3001)
bun run build            # Build for production
bun run start            # Start production server
bun run lint             # Lint code
bun run type-check       # Type check
```

## 🏗️ Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx
│   └── page.tsx
├── components/          # React components
├── hooks/               # Custom hooks
│   └── api/            # API hooks (TanStack Query)
├── providers/           # Context providers
│   └── QueryProvider.tsx
└── theme/               # MUI theme
    └── index.ts
```

## 📖 Development Guidelines

Read these files before starting:

- `../../.github/AI_INSTRUCTIONS.md`
- `../../.github/instructions/frontend.instructions.md`
- `../../.github/instructions/quality.instructions.md`

### Key Principles

1. **Tree-shaking**: Use direct imports

   ```tsx
   // ✅ Correct
   import Box from '@mui/material/Box'
   import Button from '@mui/material/Button'

   // ❌ Wrong
   import { Box, Button } from '@mui/material'
   ```

2. **Component Pattern**

   ```tsx
   import { memo, useCallback } from 'react'

   const Component = memo(function Component() {
     const handleClick = useCallback(() => {}, [])
     return <Box>...</Box>
   })
   ```

3. **API Hooks**: Use TanStack Query
   ```tsx
   const { data, isLoading } = useQuery({
     queryKey: ['users', 'list'],
     queryFn: async () => {
       /* ... */
     },
   })
   ```

## 🔑 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Tic-Tac-Toe Game"
```

## 🎨 UI Components

- Material-UI v6
- MUI X Data Grid
- MUI X Date Pickers
- react-hot-toast for notifications
