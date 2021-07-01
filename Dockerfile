FROM node:14-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock src/index.js ./
RUN yarn install --production

FROM node:14-alpine
WORKDIR /app
EXPOSE 4000

COPY --from=builder /app .
CMD ["node", "index.js"]
