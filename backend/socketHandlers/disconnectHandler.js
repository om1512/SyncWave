const serverStore = require("../serverStore");
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectHandler = (socket) => {
  const activeRooms = serverStore.getActiveRooms();
  const userInRoom = activeRooms.participants?.some((participants) => {
    participants.socketId === socket.id;
  });
  if (userInRoom) {
    roomLeaveHandler(socket, { roomId: activeRooms.roomId });
  }
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
