import express from "express";
import { createServer } from "http";
import socketIO from "socket.io";
import loader from "./loaders";
import * as config from "./config";
import { ws_loader } from "./loaders/socket";

const app = express();

// attach express to the app instance so it can be used in middlewares
app.express = express;

// Loads all configurations and routes
loader(app, config)
  .then(startServer)
  .catch((err) => {
    console.error(err);
    process.exit();
  });

// initialize http and socket servers
const server = createServer(app);
const io = socketIO(server, { origins: "*:*" });

async function startServer() {
  console.log("resources have been loaded successfully!");
  return ws_loader(io).then(() => {
    server.listen(config.port, "0.0.0.0", () =>
      console.log(`server running on port ${config.port}`)
    );
  });
}

export { server, io, app };
export default app;
