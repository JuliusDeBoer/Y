FROM node:alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG API_URL
ENV VITE_API_URL $API_URL

FROM base AS prod

COPY . .

RUN npm run build

ENV NODE_ENV production

CMD ["npm", "run", "preview", "--", "--host", "--port", "80"]

FROM base AS dev

ENV NODE_ENV development

CMD ["npm", "run", "dev", "--", "--host"]
