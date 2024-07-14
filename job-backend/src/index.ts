import express from "express";
import { loaders } from "./loaders";
import { config } from "./util/constant";
import { socket } from "./socket";

async function startServer() {
  const app = express();

  await loaders({ app });

  await socket({ app });

  app.listen(config.port, () => {
    console.log("\n##########################");
    console.log(`Server running at http://localhost:${config.port}`);
    console.log("##########################\n");
  });
}

startServer();
