import express from "express";
import { createServer } from "http";
import loader from "./loaders";
import * as config from "./config";
const app = express();
loader(app, config)
  .then((msg) => {
    console.log(msg);
    const port = config.port;
    const server = createServer(app);
    server.listen(port, () => {
      return console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export default app;
