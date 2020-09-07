import { config } from "dotenv"
import { ClientConfig } from "pg"
import path from "path"

//https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
config({ path: path.resolve(__dirname, "../.env") })

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
console.log(process.env.NODE_ENV)
export const appConfig = {
  PORT,
  DB_CONFIG,
}
