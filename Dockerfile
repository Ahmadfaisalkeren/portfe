FROM node:20-alpine as builder

WORKDIR /app
COPY . .

FROM caddy:alpine
COPY --from=builder /app/dist /usr/share/caddy