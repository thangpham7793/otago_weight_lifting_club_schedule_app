export const appConfig = {
  TOKEN_DURATION: Number.parseInt(Deno.env.get("TOKEN_DURATION") ?? "28"),
  TOKEN_SECRET: "secret",
  PORT: Number.parseInt(Deno.env.get("PORT") ?? "8080"),
  DATABASE_URL: Deno.env.get("DATABASE_URL"),
  ENVIRONMENT: Deno.env.get("NODE_ENV") ?? "dev",
  DOCKERIZED: Deno.env.get("DOCKER"),
};
