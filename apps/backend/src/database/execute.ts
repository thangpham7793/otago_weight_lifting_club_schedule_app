import { PoolClient } from "pg"
import { pool } from "./pool"

export async function execute(
  statement: string,
  params: any[] = null,
  test = false
) {
  const client: PoolClient = await pool.connect()

  const res = params
    ? await client.query(statement, params)
    : await client.query(statement)

  client.release()
  return res
}
