#1. Buil a production bundle
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

#2. Serve the bundle with HTTP server
FROM nginx:1.27.0

COPY --from=build /app/build /usr/share/nginx/html

