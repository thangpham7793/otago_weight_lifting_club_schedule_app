import { config } from "dotenv"
import { ClientConfig } from "pg"
import path from "path"

//https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables
config({ path: path.resolve(__dirname, "../.env") })

const localConfig: ClientConfig = {
  host: process.env.DOCKER ? "pgsql_db" : "0.0.0.0",
  user: "test_user",
  port: 5432,
  database: "lifting",
  password: "6500826",
}

//https://stackoverflow.com/questions/47297212/heroku-postgres-add-on-connection-string-for-nodejs-app
const herokuConfig: ClientConfig = {
  connectionString: process.env.DATABASE_URL || process.env.STORED_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

//DATABASE_URL=$(heroku config:get DATABASE_URL -a your-app) your_process (probably need to use this in a procfile)

export const appConfig = {
  PORT: process.env.PORT || 5000,
  DB_CONFIG:
    process.env.NODE_ENV === "development" ? localConfig : herokuConfig,
  TEST_TOKEN: process.env.TEST_TOKEN,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PW: process.env.GMAIL_PW,
  OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
  OAUTH_CLIENTSECRET: process.env.OAUTH_CLIENTSECRET,
  OAUTH_REFRESHTOKEN: process.env.OAUTH_REFRESHTOKEN,
  OAUTH_ACCESSTOKEN: process.env.OAUTH_ACCESSTOKEN,
}
