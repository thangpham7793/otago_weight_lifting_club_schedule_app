import { serverError, unknownEndpoint } from "./utils"

import routerConfigs, { RouterConfig } from "./routers"

import express, { Application } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import morgan from "morgan"

const app = express()

useConfig(app)
useStatic(app)
useRouters(app, routerConfigs)
useErrorHandlers(app)

export default app

function useConfig(app: Application) {
  app.use(bodyParser.json({ limit: "50mb" }))
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
  app.use(cors({ credentials: true, origin: "*" }))
  app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  )
}

function useStatic(app: Application) {
  app.use(express.static(path.join(__dirname, "public/instructor")))
}

function useErrorHandlers(app: Application) {
  app.use(unknownEndpoint)
  app.use(serverError)
}

function useRouters(app: Application, configs: RouterConfig[]) {
  configs.forEach(({ path, router }) => app.use(path, router))
}
