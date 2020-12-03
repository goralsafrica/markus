import admin from "firebase-admin";

import serviceAccount from "../../../service-account.json";

const { databaseURL } = serviceAccount;
delete serviceAccount.databaseURL;
export function loadFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL,
  });
}

export default admin;
