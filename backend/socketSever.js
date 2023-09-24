const authSocket = require("./middlewares/auth_socket");
const newConnectionHandler = require("./socketHandlers/newConnectionHandler");
const disconnectHandler = require("./socketHandlers/disconnectHandler");
const serverStore = require("./serverStore");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const directChatHistoryHandler = require("./socketHandlers/directChatHistoryHandler");
const newRoomCreateHandler = require("./socketHandlers/newRoomCreateHandler");
const newRoomJoinHandler = require("./socketHandlers/newRoomJoinHandler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  serverStore.setSocketServerInstance(io);
  io.use((socket, next) => {
    authSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUser();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);

    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("direct-message", (data) => {
      console.log("Give me please" + data.receiverUserId);
      directMessageHandler(socket, data);
      console.log("Direct Message is called");
    });

    socket.on("direct-chat-history", (data) => {
      console.log("does this called");
      directChatHistoryHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });

    socket.on("create-room", () => {
      newRoomCreateHandler(socket);
    });

    socket.on("join-room", (data) => {
      newRoomJoinHandler(socket, data);
    }); 
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);
};

module.exports = {
  registerSocketServer,
};
