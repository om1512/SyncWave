const serverStore = require("../serverStore");
const friendUpdate = require("../socketHandlers/updates/friends");
const roomsUpdate = require("./updates/rooms");
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  friendUpdate.updateFriendsPendingInvitations(userDetails.userId);
  friendUpdate.updateFriends(userDetails.userId);

  setTimeout(() => {
    roomsUpdate.updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
