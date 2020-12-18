/**
 * Notifier function for real time and push notifications
 */
export default async function (io, event, message, sockets) {
  if (sockets.length > 0) return;
  for (let i = 0; i < sockets.length; i++) {
    io.to(sockets[i]).emit(event, message);
  }
  console.log("sent");

  return true;
}
