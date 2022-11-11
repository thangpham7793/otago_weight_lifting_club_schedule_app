import { execute } from "../database/execute"

async function test() {
  const { rows } = await execute(
    `SELECT weight, CAST("lastEdited" AS TEXT) FROM practice_bests WHERE "pbId" = 1`
  )
  console.log(rows[0].lastEdited)
}

test()
