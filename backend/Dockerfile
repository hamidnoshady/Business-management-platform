# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install build tools for native addons
RUN apt-get update && apt-get install -y g++ make python3

# Install pnpm
RUN npm install -g pnpm

# Install bcrypt and its types
RUN pnpm install bcrypt @types/bcrypt

# Install any needed packages specified in package.json
RUN pnpm install --force

# Bundle app source
COPY . .

# Build the app
RUN pnpm run build

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app
CMD [ "pnpm", "run", "start:prod" ]
