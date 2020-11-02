import socketIO from "socket.io";
import * as handler from "../resources/notifications/in-app/wsHandlers";
import { verifyToken } from "../utilities";

export const ws_loader = (server) =>
  new Promise((resolve) => {
    const io = socketIO(server, { origins: "*:*" });

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
    resolve();
  });
