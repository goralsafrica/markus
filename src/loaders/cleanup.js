import { model } from "mongoose";

async function deleteTemporaryData() {
  await model("TemporaryData").deleteMany({ type: "socket_connection" });
}

export default async function () {
  await deleteTemporaryData();
  process.on("SIGTERM", deleteTemporaryData);
  return;
}
