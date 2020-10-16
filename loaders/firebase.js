import admin from "firebase-admin";
import serviceAccount from "../node-push-notifications-firebase-adminsdk-sev23-f0f7c3bc3b.json";
export default () =>
  new Promise((resolve, reject) => {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://node-push-notifications.firebaseio.com",
    });
  });
