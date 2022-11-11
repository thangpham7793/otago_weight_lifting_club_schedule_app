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
  TOKEN_DURATION: process.env.TOKEN_DURATION ? Number.parseInt(process.env.TOKEN_DURATION) : 28,
  TOKEN_SECRET: process.env.SECRET ?? "secret",
  PORT: Number.parseInt(process.env.PORT) || 8080,
  DB_CONFIG: process.env.NODE_ENV !== "production" ? localConfig : prodDbConfig,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PW: process.env.GMAIL_PW,
  OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
  OAUTH_CLIENTSECRET: process.env.OAUTH_CLIENTSECRET,
  OAUTH_REFRESHTOKEN: process.env.OAUTH_REFRESHTOKEN,
  OAUTH_ACCESSTOKEN: process.env.OAUTH_ACCESSTOKEN,
}
