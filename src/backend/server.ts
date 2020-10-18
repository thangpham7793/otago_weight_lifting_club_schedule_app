import app from "./app"
import { appConfig, delay } from "./utils/register"

// delay(0).then(() => {
//   app.listen(appConfig.PORT, () =>
//     console.log(`Listening on port ${appConfig.PORT}`)
//   )
// })

app.listen(appConfig.PORT, () =>
  console.log(`Listening on port ${appConfig.PORT}`)
)
