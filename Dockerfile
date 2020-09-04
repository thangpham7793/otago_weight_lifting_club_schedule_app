FROM node:12-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY src/backend/ src/backend/

ENV DOCKER=true

COPY nodemon.json .

COPY tsconfig.json .

EXPOSE 3000

CMD ["npm", "run", "dev"]

