import express from "express";
import { createServer } from "http";
import * as config from "./config";
import loader from "./loaders";

const app = express();

loader(app, config)
  .then((msg) => {
    console.log(msg);

    const server = createServer(app);
    server.listen(config.port, function () {
      return console.log(`server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit();
  });

export default app;
