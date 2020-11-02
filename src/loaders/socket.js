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
    console.log("new user");
    handler.persistSocket(socket).then(() => {
      socket.emit("welcome", { msg: "welcome bossman !!" });
    });
    socket.on("disconnect", () => {
      handler.removeSocket(socket);
    });
  });
}
