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

  // do conn-prepare emit to all other participants 
  roomDetails.participants.forEach((element) => {
    if (element.socketId !== participantsDetails.socketId) {
      socket.to(element.socketId).emit("conn-prepare", {
        connUserSocketId: participantsDetails.socketId,
      });
    }
  });
  roomsUpdates.updateRooms();
};

module.exports = newRoomJoinHandler;
