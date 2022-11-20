import app from "./app.ts";
import { appConfig } from "./utils/index.ts";
import { migrate } from "./migrations/index.ts";

migrate()
  .then(() => {
    app.listen(
      appConfig.PORT,
      "0.0.0.0",
      () => console.log(`Listening on port ${appConfig.PORT}`),
    );
  })
  .catch((error) => {
    console.error("Migrations failed", JSON.stringify(error, null, 2));
    Deno.exit(1);
  });
