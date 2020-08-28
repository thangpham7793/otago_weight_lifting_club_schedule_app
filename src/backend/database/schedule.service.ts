import { Request, Response } from "express"
import { Pool, PoolClient, ClientConfig, Client } from "pg"
import { appConfig } from "../utils/config"

const testQuery = `WITH result AS (
  SELECT
    name,
    programme,
    -- it seems that this somehow iterates over both objects
    json_array_elements(timetable -> 'timetable') -> 'week 1' as "week 1"
  FROM
    schedule
)
SELECT
  *
FROM
  result
WHERE
  "week 1" IS NOT NULL;`

const pool: Pool = new Pool(appConfig.DB_CONFIG)

export class ScheduleService {
  async test(req: Request, res: Response) {
    try {
      //const client = new Client(localConfig)
      //const pool = new Pool(localConfig)
      const client: PoolClient = await pool.connect()
      const result = await client.query(testQuery)
      const results = { results: result ? result.rows : null }
      res.send(results)
      //client.end()
      client.release()
    } catch (err) {
      console.error(err)
      res.send("Error" + err)
    }
  }
}
