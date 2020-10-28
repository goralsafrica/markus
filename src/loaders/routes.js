import cors from "cors";
import express from "express";
import apiRouter from "../apiRouter";
import { join } from "path";
export default function (app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors());
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: false,
      })
    );
    app.use(app.express.static(join(__dirname, "../../public")));
    //main entry for APIs
    app.use("/api", apiRouter);

    resolve();
  });
}
