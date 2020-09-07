import { appConfig } from "../utils/config"
import { Pool } from "pg"

// const pool: Pool = new Pool(appConfig.DB_CONFIG)
const pool: Pool = new Pool({
  connectionString:
    "postgres://kxntsyluyrqapw:46a02c6e0d5b1e17702eccbbaf99f4bfe5799568f253940869ce3b26cb991147@ec2-34-237-89-96.compute-1.amazonaws.com:5432/d2ge2rt4o90iba",
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool
