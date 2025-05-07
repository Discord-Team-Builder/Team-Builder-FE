# Install dependencies only when needed
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Install necessary packages for tailwind & build tools
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json package-lock.json* ./  
RUN npm install --frozen-lockfile

# Build the application
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Next.js requires this directory for production
ENV NODE_ENV production

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --frozen-lockfile

# Copy built assets from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tailwind.config.js ./tailwind.config.js
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/app ./app
COPY --from=builder /app/pages ./pages
COPY --from=builder /app/components ./components

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
