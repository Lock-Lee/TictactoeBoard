import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from '../libs/prisma/generated'

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || 'postgresql://game_user:game_password@localhost:5432/tictactoe_db',
})

// Create Prisma adapter
const adapter = new PrismaPg(pool)

// Singleton pattern for Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Graceful shutdown - only in production
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
    await pool.end()
  })
}
