import express, { Application } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import errorHandlers from "./utils/errorHandlers"
import { Controller } from "./controllers/main.controller"

//TODO: add other middlewares and write error handlers as well

//TODO: learn from this lady :D https://dev.to/nyagarcia/pokeapi-rest-in-nodejs-with-express-typescript-mongodb-and-docker-part-1-5f8g

class App {
  public app: Application
  public controller: Controller

  constructor() {
    this.app = express()
    this.setConfig()
    this.useStatic()

    this.controller = new Controller(this.app)
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: "50mb" }))

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

    //Enables cors
    this.app.use(cors())
  }

  private initialiseErrorHandlers() {
    this.app.use(errorHandlers.httpErrorHandlers)
  }

  private useStatic() {
    this.app.use(express.static(path.join(__dirname, "public")))
  }
}

export default new App().app