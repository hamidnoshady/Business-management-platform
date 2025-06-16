# 1. Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install all dependencies
RUN npm install

# Build the web-client
RUN npm run build --workspace=web-client

# 2. Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy the standalone output
COPY --from=builder /app/apps/web-client/.next/standalone ./
# Copy the static assets
COPY --from=builder /app/apps/web-client/.next/static ./apps/web-client/.next/static
# Copy the public assets
COPY --from=builder /app/apps/web-client/public ./apps/web-client/public

EXPOSE 3000
CMD ["node", "server.js"]
