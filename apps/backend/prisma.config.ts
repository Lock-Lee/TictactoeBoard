import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'

// Load .env file
config({ path: path.join(__dirname, '.env') })

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),

  migrations: {
    path: path.join(__dirname, 'prisma', 'migrations'),
  },

  datasource: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://game_user:game_password@localhost:5432/tictactoe_db',
  },
})
