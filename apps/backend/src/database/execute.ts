import {
  ClientOptions,
  Pool,
} from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { appConfig } from "../utils/index.ts";

const localDbConfig: ClientOptions = {
  hostname: appConfig.DOCKERIZED === "true" ? "db" : "0.0.0.0",
  user: "test_user",
  port: 5432,
  database: "lifting",
  password: "test_user",
};

const prodDbConfig = appConfig.DATABASE_URL;

const DB_CONFIG = appConfig.ENVIRONMENT !== "production"
  ? localDbConfig
  : prodDbConfig;

export const pool = new Pool(DB_CONFIG, 20, true);

export async function execute<Result = any>(
  statement: string,
  params: any[] | null = null,
) {
  const client = await pool.connect();
  let result;

  try {
    result = params
      ? await client.queryObject<Result>(statement, params)
      : await client.queryObject<Result>(statement);
  } finally {
    client.release();
  }

  return result;
}
