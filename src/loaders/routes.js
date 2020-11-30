import cors from "cors";
import express from "express";
import multer from "multer";
import { join } from "path";
import apiRouter from "../apiRouter";

const upload = multer({ dest: join(process.cwd(), "tmp") });

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

    app.use((req, res, next) => {
      next({
        status: 404,
        errors: { request: "requested resource not found" },
        message: "invalid request",
      });
    });

    app.use(upload.array("photos", 12));

    app.use(function (req, res, next) {
      console.log(req.files);
      next();
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
