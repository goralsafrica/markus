import cors from "cors";
import express from "express";
import apiRouter from "../apiRouter";
import { join } from "path";
export default function (app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors("localhost:8080"));
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: false,
      })
    );
    app.use(app.express.static(join(__dirname, "../../public")));
    //main entry for APIs
    app.use("/api", apiRouter);

    app.use((req, res, next) => {
      next({
        status: 404,
        errors: { request: "requested resource not found" },
        message: "invalid request",
      });
    });

    app.use(({ status, errors, message }, req, res, next) => {
      res.status(status).json({
        data: null,
        errors,
        message,
      });
    });

    resolve();
  });
}
