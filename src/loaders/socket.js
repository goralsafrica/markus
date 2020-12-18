import * as maintainer from "../resources/notifications/in-app/wsHandlers";
import { verifyToken } from "../utilities";
import Messenger from "../resources/groups/controllers/GroupMessagesController";

export async function ws_loader(io) {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.query.auth_token;

      if (!token) throw new Error("Unrecognized user");

      const payload = verifyToken(token);

      if (payload.temporary) throw new Error("Invalid token");

      socket.connectedUser = payload;

      next();
    } catch (err) {
      console.log(err.message);
      socket.disconnect();
    }
  });
  io.on("connection", (socket) => {
    maintainer.persistSocket(socket).then(() => {
      console.log("[new user]", socket.id);
      socket.emit("welcome", { msg: "welcome bossman !!" });
    });

    loadHandlers(socket, io);
  });
}

function loadHandlers(socket, io) {
  socket.on("group message", (payload) => {
    Messenger.createMessage(payload, socket.connectedUser)
      .then((message) => Messenger.sendMessage(message, io))
      .then(() => socket.emit("message delivered", { payload }))
      .catch((err) => {
        console.log(err.message);
        emitError(err.message);
      }); //
  });

  socket.on("disconnect", () => {
    console.log("[disconnected user]", socket.id);
    maintainer.removeSocket(socket);
  });

  function emitError(error) {
    socket.emit("socket error", { error });
  }
}
