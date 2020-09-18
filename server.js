import express from "express";
import { createServer } from "http";
import loader from "./loaders";
import { config } from "dotenv";
config(".env");
const app = express();
const vars = process.env;
loader(app, vars)
  .then((msg) => {
    console.log(msg);

    const port = process.env.PORT || 5000;
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
