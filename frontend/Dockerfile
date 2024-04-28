FROM node:alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG API_URL
ENV API_URL $API_URL
ENV NEXT_TELEMETRY_DISABLED 1

FROM base AS prod

COPY . .

RUN npm run build

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "run", "start"]

FROM base AS dev

ENV PORT 3000

CMD ["npm", "run", "dev"]
