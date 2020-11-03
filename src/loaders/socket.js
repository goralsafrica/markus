import * as handler from "../resources/notifications/in-app/wsHandlers";
import { verifyToken } from "../utilities";

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
    handler.persistSocket(socket).then(() => {
      console.log("[new user]", socket.id);
      socket.emit("welcome", { msg: "welcome bossman !!" });
    });
    socket.on("disconnect", () => {
      console.log("[disconnected user]", socket.id);
      handler.removeSocket(socket);
    });
  });
}
