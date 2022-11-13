import { Router } from "express"
import instructorRouter from "./instructor.router"
import learnerRouter from "./learner.router"
import programmeRouter from "./programme.router"

export type RouterConfig = {
  path: string
  router: Router
}

const configs: RouterConfig[] = [
  instructorRouter,
  learnerRouter,
  programmeRouter,
]

export default configs
