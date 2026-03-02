# Tic-Tac-Toe Game - Docker Commands
# ====================================

.PHONY: help dev build up down logs clean migrate seed

# Default target
help:
	@echo "Tic-Tac-Toe Game - Docker Commands"
	@echo "================================"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development environment (DB only)"
	@echo "  make dev-all      - Start all services in development mode"
	@echo ""
	@echo "Production:"
	@echo "  make build        - Build Docker images"
	@echo "  make up           - Start production services"
	@echo "  make down         - Stop all services"
	@echo "  make restart      - Restart all services"
	@echo ""
	@echo "Database:"
	@echo "  make migrate      - Run database migrations"
	@echo "  make seed         - Seed the database"
	@echo "  make db-reset     - Reset database (DESTRUCTIVE)"
	@echo ""
	@echo "Utilities:"
	@echo "  make logs         - View all logs"
	@echo "  make logs-backend - View backend logs"
	@echo "  make logs-frontend- View frontend logs"
	@echo "  make clean        - Remove all containers and volumes"
	@echo "  make shell-backend- Open shell in backend container"
	@echo "  make shell-db     - Open PostgreSQL shell"

# ================================
# Development
# ================================

dev:
	docker-compose up -d postgres redis
	@echo "Database started. Run 'bun run dev' to start the application."

dev-all:
	docker-compose -f docker-compose.prod.yml up --build

# ================================
# Production
# ================================

build:
	docker-compose -f docker-compose.prod.yml build

up:
	docker-compose -f docker-compose.prod.yml up -d

down:
	docker-compose -f docker-compose.prod.yml down

restart:
	docker-compose -f docker-compose.prod.yml restart

# ================================
# Database
# ================================

migrate:
	docker-compose -f docker-compose.prod.yml exec backend bunx prisma migrate deploy

seed:
	docker-compose -f docker-compose.prod.yml exec backend bun prisma/seed.ts

db-reset:
	@echo "WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	docker-compose -f docker-compose.prod.yml exec backend bunx prisma migrate reset --force

# ================================
# Logs
# ================================

logs:
	docker-compose -f docker-compose.prod.yml logs -f

logs-backend:
	docker-compose -f docker-compose.prod.yml logs -f backend

logs-frontend:
	docker-compose -f docker-compose.prod.yml logs -f frontend

logs-db:
	docker-compose -f docker-compose.prod.yml logs -f postgres

# ================================
# Utilities
# ================================

clean:
	docker-compose -f docker-compose.prod.yml down -v --remove-orphans
	docker system prune -f

shell-backend:
	docker-compose -f docker-compose.prod.yml exec backend sh

shell-db:
	docker-compose -f docker-compose.prod.yml exec postgres psql -U erp_user -d erp_db

# Health check
health:
	@echo "Backend health:"
	@curl -s http://localhost:3000/health | jq . || echo "Backend not responding"
	@echo ""
	@echo "Frontend health:"
	@curl -s http://localhost:3001/api/health | jq . || echo "Frontend not responding"

# Show running containers
ps:
	docker-compose -f docker-compose.prod.yml ps
