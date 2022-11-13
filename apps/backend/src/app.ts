import { serverError, unknownEndpoint } from "./utils"

import routerConfigs, { RouterConfig } from "./routers"

import express, { Application } from "express"
import bodyParser from "body-parser"
import path from "path"
import morgan from "morgan"

const app = express()

useBodyParser(app)
useLogger(app)
useStatic(app)
useRouters(app, routerConfigs)
useErrorHandlers(app)

export default app

function useBodyParser(app: Application) {
  app.use(bodyParser.json({ limit: "50mb" }))
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
}

function useLogger(app: Application) {
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
