import socketIO from "socket.io";

export const ws_loader = (server) =>
  new Promise((resolve, reject) => {
    const io = socketIO(server);

    io.on("connection", (socket) => {
      console.log("new socket connection", socket.id);
      socket.emit("welcome", { msg: "welcome bossman !!" });
    });

    resolve();
  });
