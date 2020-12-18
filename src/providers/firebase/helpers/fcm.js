import admin from "../";

const messenger = admin.messaging();

export async function sendPushNotification(title, body, token) {
  try {
    if (!token) throw new Error("token required");
    const payload = formatNotification(title, body, token);
    // console.log(payload);
    const response = await messenger.send(payload);

    return response;
  } catch (err) {
    console.log(err);
  }
}

function formatNotification(title, body, token) {
  return {
    data: { title, body },
    token,
    webpush: {
      fcm_options: {
        link: "https://floating-basin-34934.herokuapp.com/index.html",
      },
    },
  };
}
