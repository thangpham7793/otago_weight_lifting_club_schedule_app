# TODO: refactor based on this https://github.com/Saluki/nestjs-template/blob/master/Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
RUN apk add --no-cache --virtual .gyp \
        python3 \
        py3-pip \
        make \
        g++ 

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm ci
COPY src/ src/
RUN npm run build

RUN rm -rf node_modules
ENV NODE_ENV=production
RUN npm ci && npm prune

FROM node:18-alpine AS release

WORKDIR /app

RUN chown nobody:nobody /app
USER nobody:nobody

COPY --from=build --chown=nobody:nobdy /app/node_modules /app/node_modules
COPY --from=build --chown=nobody:nobody /app/dist ./

ENV NODE_ENV production
EXPOSE 8080

CMD ["node", "server.js"]
