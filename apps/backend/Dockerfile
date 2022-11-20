FROM denoland/deno:latest

EXPOSE 8080
ENV NODE_ENV production
WORKDIR /app

COPY src/ .

RUN deno cache server.ts

USER deno

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "server.ts"]
