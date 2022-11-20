import { Router } from "../types.d.ts";
import instructorRouter from "./instructor.router.ts";
import learnerRouter from "./learner.router.ts";
import programmeRouter from "./programme.router.ts";

export type RouterConfig = {
  path: string;
  router: Router;
};

const configs: RouterConfig[] = [
  instructorRouter,
  learnerRouter,
  programmeRouter,
];

export default configs;
