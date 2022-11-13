import { serverError, unknownEndpoint } from "./utils"

import {
  InstructorRouter,
  ProgrammeRouter,
  LearnerRouter,
} from "./routers"

import express, { Application } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import morgan from "morgan"

class App {
  app: Application
  instructorRouter: InstructorRouter
  learnerRouter: LearnerRouter
  scheduleRouter: ProgrammeRouter

  constructor() {
    this.app = express()
    this.setConfig()
    this.useStatic()

    this.instructorRouter = new InstructorRouter(this.app)
    this.learnerRouter = new LearnerRouter(this.app)
    this.scheduleRouter = new ProgrammeRouter(this.app)
    this.useErrorHandlers()
  }

  private setConfig() {

    this.app.use(bodyParser.json({ limit: "50mb" }))

    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

    this.app.use(cors({ credentials: true, origin: "*" }))

    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*")
      res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST")
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      )
      next()
    })

    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    )
  }

  private useErrorHandlers() {
    this.app.use(unknownEndpoint)
    this.app.use(serverError)
  }

  private useStatic() {
    this.app.use(express.static(path.join(__dirname, "public/instructor")))
  }
}

export default new App().app
