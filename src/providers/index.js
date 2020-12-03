import { loadFirebase } from "./firebase";
import { loadAWS } from "./aws";

export default function (app, config) {
  return Promise.all([loadFirebase, loadAWS]).catch((err) => {
    console.log(err.message);
    process.exit();
  });
}
