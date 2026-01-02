FROM node:22-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm ci

COPY src src
COPY tsconfig.json tsconfig.json

RUN npm run build

FROM gcr.io/distroless/nodejs22
WORKDIR /app
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/dist dist
#COPY src src

ENV PORT=3000
#CMD ["node", "src/index.js"]

#Distroless image already run command node, so it does not need 
#to pass again
#CMD ["src/index.js"]

CMD ["dist/index.js"]

