const serverStore = require("../serverStore");
const roomsUpdates = require("../socketHandlers/updates/rooms");
const newRoomJoinHandler = (socket, data) => {
  const { roomId } = data;
  const participantsDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);  
  serverStore.joinActiveRoom(roomId, participantsDetails);

  roomsUpdates.updateRooms();
};

module.exports = newRoomJoinHandler;
