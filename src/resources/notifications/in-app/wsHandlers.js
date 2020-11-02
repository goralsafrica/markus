import TemporaryData from "../../auth/models/TemporaryData";

export async function persistSocket(socket) {
  try {
    await TemporaryData.create({
      staff: socket.connectedUser.staff,
      type: "socket_connection",
      socketID: socket.id,
    });
    return socket;
  } catch (err) {
    throw err;
  }
}

export async function removeSocket(socket) {
  try {
    await TemporaryData.deleteOne({ socketID: socket.id });
    return socket;
  } catch (err) {
    throw err;
  }
}

export async function emitEvent(io) {
  users.forEach((user) => {
    io = io.to(user);
  });
  console.log("emit now");
  io.emit("notification", "you don mad oo");
}
