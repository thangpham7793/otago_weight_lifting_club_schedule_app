import { serverError, unknownEndpoint } from "./utils/register"
import { Controller } from "./controllers/register"

//native or 3rd party modules
import express, { Application } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import morgan from "morgan"

//TODO: modelled after https://dev.to/nyagarcia/pokeapi-rest-in-nodejs-with-express-typescript-mongodb-and-docker-part-1-5f8g

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
    //Allows us to read data from cookies
    this.app.use(cookieParser())

    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }))

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

    //Enables cors
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

    //Enables logging
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    )
    //Enable error-handlers
  }

  private useErrorHandlers() {
    this.app.use(unknownEndpoint)
    this.app.use(serverError)
  }

  private useStatic() {
    this.app.use(express.static(path.join(__dirname, "public")))
  }
}

export default new App().app
