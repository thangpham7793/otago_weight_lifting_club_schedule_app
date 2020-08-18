import app from "./app"
import { PORT } from "./utils/config.constants"

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
