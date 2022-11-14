export const appConfig = {
  TOKEN_DURATION: process.env.TOKEN_DURATION ?? 28,
  TOKEN_SECRET: "secret",
  PORT: Number.parseInt(process.env.PORT) || 8080,
  DATABASE_URL: process.env.DATABASE_URL,
  ENVIRONMENT: process.env.NODE_ENV,
  DOCKERIZED: process.env.DOCKER,
}
