import { Pool, PoolConfig } from "pg"
import { appConfig } from "../utils"

const localDbConfig: PoolConfig = {
  host: appConfig.DOCKERIZED === "true" ? "db" : "0.0.0.0",
  user: "test_user",
  port: 5432,
  database: "lifting",
  password: "test_user",
}

const prodDbConfig: PoolConfig = {
  connectionString: appConfig.DATABASE_URL,
}

const DB_CONFIG =
  appConfig.ENVIRONMENT !== "production" ? localDbConfig : prodDbConfig

export const pool = new Pool(DB_CONFIG)
