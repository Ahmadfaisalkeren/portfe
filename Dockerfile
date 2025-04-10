FROM node:20-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM caddy:alpine
COPY --from=builder /app/dist /usr/share/caddy