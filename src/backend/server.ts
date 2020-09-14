import app from "./app"
import { appConfig } from "./utils/register"

app.listen(appConfig.PORT, () =>
  console.log(`Listening on port ${appConfig.PORT}`)
)
