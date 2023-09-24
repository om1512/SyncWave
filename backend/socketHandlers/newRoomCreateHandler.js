const serverStore = require("../serverStore");
const roomUpdates = require("../socketHandlers/updates/rooms");

const newRoomCreateHandler = (socket) => {
  const socketId = socket.id;
  const userId = socket.user.userId;

  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);
  socket.emit("create-room", {
    roomDetails,
  });

  roomUpdates.updateRooms();
};

module.exports = newRoomCreateHandler;
