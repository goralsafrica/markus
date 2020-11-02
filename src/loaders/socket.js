import socketIO from "socket.io";
import { verifyToken } from "../utilities";

export const ws_loader = (server) =>
  new Promise((resolve, reject) => {
    const io = socketIO(server, { origins: "*:*" });

    io.use((socket, next) => {
      console.log(socket.handshake);
      socket.disconnect();
    });
    io.on("connection", (socket) => {
      console.log("new socket connection", socket.id);
      console.log(socket.handshake);
      socket.emit("welcome", { msg: "welcome bossman !!" });
    });

    resolve();
  });
