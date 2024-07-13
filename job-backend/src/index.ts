import express from "express";
import { loaders } from "./loaders";
import { config } from "./util/constant";

async function startServer() {
  const app = express();

  await loaders({ app });

  app.listen(config.port, () => {
    console.log("\n##########################");
    console.log(`Server running at http://localhost:${config.port}`);
    console.log("##########################\n");
  });
}

startServer();
