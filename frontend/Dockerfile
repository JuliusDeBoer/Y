FROM node:18-alpine AS build-env

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Building app
COPY package*.json ./

# Install node modules
# Note: We also install dev deps as TypeScript may be needed
RUN npm install

# Copy files. Use dockerignore to avoid copying node_modules
COPY . .

# Build
RUN npm run build

# Running the app
FROM node:18-alpine AS runner
WORKDIR /app

# Mark as prod, disable telemetry, set port
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

# Copy from build
COPY --from=build-env /app/next.config.mjs ./
COPY --from=build-env /app/public ./public
COPY --from=build-env /app/.next ./.next
COPY --from=build-env /app/node_modules ./node_modules

# Run app command
CMD ["./node_modules/next/dist/bin/next", "start"]
