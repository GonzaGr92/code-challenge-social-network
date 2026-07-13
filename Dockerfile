# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies (leverage layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Optional base path for deploying behind a sub-path
ARG PAGES_BASE_PATH
ENV PAGES_BASE_PATH=$PAGES_BASE_PATH

# Build the static export (outputs to /app/out)
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine AS runner

# Serve the statically exported site
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
