# Stage 1: Builder
# This stage installs all dependencies, builds the entire monorepo,
# which is simpler and less prone to path errors.
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# Copy the entire project context.
# Ensure your .dockerignore file does not exclude 'packages' or 'services'.
# This command copies everything from your local project root into the container's /usr/src/app directory.
COPY . .

# Install all dependencies for all workspaces using the root package.json.
RUN npm install --legacy-peer-deps

# Build the specific workspace.
# IMPORTANT: Change 'auth-service' to the correct workspace name for each service.
# (e.g., 'crm-service', 'sales-service', 'web-client')
RUN npm run build --workspace=crm-service

# Stage 2: Production Runner
# This stage creates a minimal final image with only what's needed to run.
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# From the builder stage, copy the production node_modules.
# The node_modules directory is at the root of the project inside the builder container.
COPY --from=builder /usr/src/app/node_modules ./node_modules

# From the builder stage, copy the specific build output for the service.
# The build output for 'auth-service' is located at this specific path inside the builder container.
# IMPORTANT: For 'crm-service', change the path to '/usr/src/app/services/crm-service/dist'.
# For 'sales-service', change it to '/usr/src/app/services/sales-service/dist'.
COPY --from=builder /usr/src/app/services/crm-service/dist ./dist

# Copy the root package.json. This is needed for npm to understand the project structure.
COPY --from=builder /usr/src/app/package.json .

# The command to run the application.
# It executes the 'main.js' file from the 'dist' folder we created above.
CMD ["node", "dist/main.js"]
