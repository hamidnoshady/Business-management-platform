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
# This stage builds the application code
FROM base AS builder
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=sales-service

# ---- Production Runner Stage ----
# This is the final, minimal, and optimized image
FROM base as runner
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/package.json ./
COPY --from=dependencies /usr/src/app/services/sales-service/package.json ./services/sales-service/
# Use the local proxy again for a fast and reliable production install
RUN npm install --registry http://verdaccio:4873 --production --legacy-peer-deps
COPY --from=builder /usr/src/app/services/sales-service/dist ./dist
CMD [ "node", "dist/main.js" ]
