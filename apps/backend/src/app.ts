import { serverError, unknownEndpoint } from "./utils/index.ts";

import routerConfigs, { RouterConfig } from "./routers/index.ts";

import express from "npm:express@^4.18";
import { Application } from "./types.d.ts";
import bodyParser from "npm:body-parser@^1.19.0";
import * as path from "https://deno.land/std@0.110.0/path/mod.ts";

const app = express();

useBodyParser(app);
useLogger(app);
useStatic(app);
useRouters(app, routerConfigs);
useErrorHandlers(app);

export default app;

function useBodyParser(app: Application) {
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
}

function useLogger(_app: Application) {
}

function useStatic(app: Application) {
  const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
  app.use(express.static(path.join(__dirname, "public/instructor")));
}

function useErrorHandlers(app: Application) {
  app.use(unknownEndpoint);
  app.use(serverError);
}

function useRouters(app: Application, configs: RouterConfig[]) {
  configs.forEach(({ path, router }) => app.use(path, router));
}
