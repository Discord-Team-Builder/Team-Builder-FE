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

# Debugging step to check files in /app
RUN ls -alh /app

# Run the build process and enable verbose logging to help debug issues
RUN npm run build --verbose

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy production dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the necessary files from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/src/app ./src/app
COPY --from=builder /app/src/components ./src/components  
COPY package.json ./

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
