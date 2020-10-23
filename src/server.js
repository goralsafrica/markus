import express from "express";
import { createServer } from "http";
import loader from "./loaders";
import * as config from "./config";
import { ws_loader } from "./loaders/socket";
const app = express();
loader(app, config)
  .then((msg) => {
    console.log(msg);
    const server = createServer(app);
    ws_loader(server).then(() => {
      server.listen(config.port, () =>
        console.log(`server running on port ${config.port}`)
      );
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

export default app;
