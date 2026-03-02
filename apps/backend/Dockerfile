# Backend Dockerfile - Elysia/Bun
# Multi-stage build for optimized production image

# ============================================
# Stage 1: Dependencies
# ============================================
FROM oven/bun:1.1-alpine AS deps

# Install build dependencies for native modules (bcrypt)
RUN apk add --no-cache python3 make g++ linux-headers

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lock ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/tsconfig/package.json ./packages/tsconfig/

# Install dependencies and rebuild native modules
RUN apk add --no-cache npm && \
    bun install --ignore-scripts && \
    cd node_modules/bcrypt && npm rebuild bcrypt --build-from-source

# ============================================
# Stage 2: Builder
# ============================================
FROM oven/bun:1.1-alpine AS builder

WORKDIR /app

# Copy dependencies from root (bun hoists to root node_modules)
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY packages/shared-types ./packages/shared-types
COPY packages/tsconfig ./packages/tsconfig
COPY apps/backend ./apps/backend
COPY package.json ./

WORKDIR /app/apps/backend

# Generate Prisma client (create .env for prisma.config.ts)
RUN echo "DATABASE_URL=postgresql://user:pass@localhost:5432/db" > .env && \
    bunx prisma generate && \
    rm .env

# Build the application (exclude optional dependencies)
RUN bun build src/index.ts --target=bun --outdir=dist \
    --external mock-aws-s3 \
    --external aws-sdk \
    --external nock

# ============================================
# Stage 3: Production
# ============================================
FROM oven/bun:1.1-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 backend

# Copy built application and required files
COPY --from=builder --chown=backend:nodejs /app/apps/backend/dist ./dist
COPY --from=builder --chown=backend:nodejs /app/apps/backend/prisma ./prisma
COPY --from=builder --chown=backend:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=backend:nodejs /app/apps/backend/package.json ./package.json

# Switch to non-root user
USER backend

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["bun", "dist/index.js"]
