import { appConfig } from "../utils/config"
import { Pool } from "pg"

const pool: Pool = new Pool(appConfig.DB_CONFIG)

export default pool
