import { models, model } from "mongoose";

async function deleteTemporaryData() {
  await model("TemporaryData").deleteMany({});
  return console.log("Removed Temporary Datas");
}

export default async function () {
  deleteTemporaryData();
  process.on("SIGTERM", deleteTemporaryData);
  return;
}
