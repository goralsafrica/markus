import cors from "cors";
import express from "express";
import apiRouter from "../src/apiRouter";

export default function (app, config) {
  return new Promise((resolve, reject) => {
    app.use(cors());
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: false,
      })
    );
    //main entry for APIs
    app.use("/api", apiRouter);

    //resolve if no errors
    resolve();
  });
}
