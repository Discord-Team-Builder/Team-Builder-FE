# Install dependencies only when needed
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Install necessary packages for tailwind & build tools
RUN apk add --no-cache libc6-compat

# Install all dependencies (including dev dependencies)
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY next.config.mjs ./
COPY postcss.config.mjs ./
# Debugging step to check files in /app
RUN ls -alh /app

# Run the build process and enable verbose logging to help debug issues
RUN npm run build || (echo "Build failed" && exit 1)

RUN ls -alh .next

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy production dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the necessary files from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/src/app ./src/app
COPY --from=builder /app/src/components ./src/components  
COPY --from=builder /app/src/globalstate ./src/globalstate
COPY --from=builder /app/src/hooks ./src/hooks
COPY --from=builder /app/src/lib ./src/lib 
COPY package.json ./

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
