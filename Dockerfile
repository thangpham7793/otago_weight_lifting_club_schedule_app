FROM node:12-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY nodemon.json .

COPY tsconfig.json .

COPY src/backend/ src/backend/

EXPOSE 5000

CMD ["yarn", "run", "dev"]

