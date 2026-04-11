FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=8080

# Install dependencies (only production deps)
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application code
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

CMD ["node", "server.js"]
