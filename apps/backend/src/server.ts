import app from "./app"
import { appConfig } from "./utils/register"
import { pool } from "./database/pool"

app.listen(appConfig.PORT, "0.0.0.0", () =>
  console.log(`Listening on port ${appConfig.PORT}`)
)
