FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

# Build API
RUN npm run build -w apps/api

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy built artifacts and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/packages/database/prisma ./prisma
# Copy package.json of database package if needed for seed script
COPY --from=builder /app/packages/database/package.json ./packages/database/package.json

ENV NODE_ENV=production
ENV PORT=4000
ENV DATABASE_URL="file:/app/prisma/dev.db"

EXPOSE 4000

# Run migrations and start
CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/main"]
