import { config } from "dotenv"
import { ClientConfig } from "pg"
import path from "path"

config({ path: path.resolve(__dirname, "../.env") })

const localConfig: ClientConfig = {
  host: process.env.DOCKER === "true" ? "db" : "0.0.0.0",
  user: process.env.POSTGRES_USER,
  port: 5432,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
}

const prodDbConfig: ClientConfig = {
  connectionString: process.env.DATABASE_URL || process.env.STORED_DATABASE_URL,
}

export const appConfig = {
  TOKEN_DURATION: process.env.TOKEN_DURATION
    ? Number.parseInt(process.env.TOKEN_DURATION)
    : 28,
  TOKEN_SECRET: process.env.SECRET,
  PORT: Number.parseInt(process.env.PORT) || 8080,
  DB_CONFIG: process.env.NODE_ENV !== "production" ? localConfig : prodDbConfig,
}
