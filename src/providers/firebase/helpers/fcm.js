import admin from "../";

export async function sendPushNotification(title, body, token) {
  try {
    if (!token) throw new Error("token required");
    const payload = formatNotification(title, body, token);
    console.log(payload);
  } catch (err) {
    console.log(err);
  }
}

function formatNotification(title, body, token) {
  return {
    notification: { title, body },
    token,
  };
}
