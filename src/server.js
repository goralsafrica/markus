import express from "express";
import { createServer } from "http";
import socketIO from "socket.io";
import loader from "./loaders";
import * as config from "./config";
import { ws_loader } from "./loaders/socket";

const app = express();
app.express = express;

const server = createServer(app);
const io = socketIO(server, { origins: "*:*" });

async function startServer(msg) {
  console.log(msg);
  return ws_loader(io).then(() => {
    server.listen(config.port, () =>
      console.log(`server running on port ${config.port}`)
    );
  });
}

// Loads all configurations and routes
loader(app, config)
  .then(startServer)
  .catch((err) => {
    console.error(err);
    process.exit();
  });

export { server, io, app };
export default app;
