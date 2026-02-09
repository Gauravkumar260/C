FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma Client (needed for types if web uses it)
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

# Build Web
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build -w apps/web

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy standalone build
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
