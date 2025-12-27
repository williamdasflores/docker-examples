FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

#ENV PORT=3000
#ENV APP_NAME="My own application"

CMD ["node", "src/index.js"]