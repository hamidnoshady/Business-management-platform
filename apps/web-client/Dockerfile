# ---- Base Stage ----
# A common base for all subsequent stages
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# ---- Dependencies Stage ----
# This stage is dedicated to installing dependencies via the local proxy
FROM base AS dependencies
COPY package.json package-lock.json* ./
# Copy all workspace package.json files to understand the full dependency tree
COPY apps/components/package.json ./apps/components/
COPY apps/stores/package.json ./apps/stores/
COPY apps/web-client/package.json ./apps/web-client/
COPY packages/common/package.json ./packages/common/
COPY services/auth-service/package.json ./services/auth-service/
COPY services/crm-service/package.json ./services/crm-service/
COPY services/sales-service/package.json ./services/sales-service/
# Use the local Verdaccio registry to install dependencies reliably
RUN npm install --registry http://verdaccio:4873 --legacy-peer-deps

# ---- Builder Stage ----
# This stage builds the Next.js application
FROM base AS builder
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=web-client

# ---- Production Runner Stage ----
# This is the final, minimal image, optimized for Next.js standalone output
FROM base AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy the standalone output from the builder stage.
# This includes the server and minimal dependencies.
COPY --from=builder /usr/src/app/apps/web-client/.next/standalone ./
# Copy the static assets
COPY --from=builder /usr/src/app/apps/web-client/.next/static ./apps/web-client/.next/static
# Copy public assets
COPY --from=builder /usr/src/app/apps/web-client/public ./apps/web-client/public

# The server is located in the root of the copied standalone output
CMD ["node", "apps/web-client/server.js"]
