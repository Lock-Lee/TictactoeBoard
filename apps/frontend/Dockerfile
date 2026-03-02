# Frontend Dockerfile - Next.js
# Multi-stage build for optimized production image

# ============================================
# Stage 1: Builder
# ============================================
FROM node:20-alpine AS builder

# Install libc6-compat for Alpine compatibility
RUN apk add --no-cache libc6-compat
RUN npm install -g bun

WORKDIR /app

# Copy workspace configuration
COPY package.json bun.lock ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/tsconfig/package.json ./packages/tsconfig/

# Install dependencies
RUN bun install

# Copy source code (including backend for type resolution)
COPY packages/shared-types ./packages/shared-types
COPY packages/tsconfig ./packages/tsconfig
COPY apps/backend/src ./apps/backend/src
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

# Set build-time environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_APP_VERSION

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_APP_NAME=${NEXT_PUBLIC_APP_NAME}
ENV NEXT_PUBLIC_APP_VERSION=${NEXT_PUBLIC_APP_VERSION}

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Skip type checking in Docker (CI handles this)
ENV DOCKER_BUILD=true

# Build the application
RUN bun run build


# ============================================
# Stage 2: Production
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Copy standalone build (includes node_modules with only required dependencies)
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./

# Copy .bun cache to where standalone symlinks expect it (symlinks traverse up to /node_modules/.bun)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bun /node_modules/.bun

# Copy static files to correct location
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static

# Copy public assets to correct location
COPY --from=builder --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

# Set correct permissions for prerender cache
RUN mkdir -p apps/frontend/.next && chown -R nextjs:nodejs apps/frontend/.next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3001

# Health check using node (accepts 2xx and 3xx status codes)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3001/', (r) => process.exit(r.statusCode < 400 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the application
CMD ["node", "server.js"]
