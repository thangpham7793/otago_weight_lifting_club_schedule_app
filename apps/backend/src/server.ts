import app from "./app"
import { appConfig } from "./utils"
import { migrate } from "./migrations"

migrate()
  .then(() => {
    app.listen(appConfig.PORT, "0.0.0.0", () =>
      console.log(`Listening on port ${appConfig.PORT}`)
    )
  })
  .catch((error) => {
    console.error("Migrations failed", JSON.stringify(error, null, 2))
    process.exitCode = 1
  })
