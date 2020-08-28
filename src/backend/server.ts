import app from "./app"
import { appConfig } from "./utils/config"

app.listen(appConfig.PORT, () =>
  console.log(`Listening on port ${appConfig.PORT}`)
)
