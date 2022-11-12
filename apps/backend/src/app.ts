import { serverError, unknownEndpoint } from "./utils"
import { Controller } from "./controllers"

//native or 3rd party modules
import express, { Application, Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import morgan from "morgan"

class App {
  app: Application
  controller: Controller

  constructor() {
    this.app = express()
    this.setConfig()
    this.useStatic()
    this.controller = new Controller(this.app)
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
