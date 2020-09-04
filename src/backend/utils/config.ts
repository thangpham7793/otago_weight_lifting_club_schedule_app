import { config } from "dotenv"
import { ClientConfig } from "pg"

config()

const host = process.env.DOCKER ? "pgsql_db" : "0.0.0.0"

const localConfig: ClientConfig = {
  host,
  user: "test_user",
  port: 5432,
  database: "lifting",
  password: "6500826",
}

const herokuConfig: ClientConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const DB_CONFIG =
  process.env.NODE_ENV === "production" ? herokuConfig : localConfig

const PORT = process.env.PORT || 3000

export const appConfig = {
  PORT,
  DB_CONFIG,
}
