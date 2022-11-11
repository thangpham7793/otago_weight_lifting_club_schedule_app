# TODO: refactor based on this https://github.com/Saluki/nestjs-template/blob/master/Dockerfile
FROM node:14-alpine

WORKDIR /app
RUN apk add --no-cache --virtual .gyp \
        python3 \
        py3-pip \
        make \
        g++ 

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src/ src/

RUN npm ci
RUN npm run build
RUN apk del .gyp

ENV NODE_ENV production
EXPOSE 8080

CMD ["npm", "run", "start"]

