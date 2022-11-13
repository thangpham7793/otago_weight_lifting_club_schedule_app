import { PoolClient } from "pg"
import { pool } from "./pool"

export async function execute<Result = any>(
  statement: string,
  params: any[] = null,
  test = false
) {
  const client: PoolClient = await pool.connect()

  const res = params
    ? await client.query<Result>(statement, params)
    : await client.query<Result>(statement)

  client.release()
  return res
}
