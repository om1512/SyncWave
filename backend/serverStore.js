const { v4: uuidv4 } = require("uuid");

const connectedUsers = new Map();
let activeRoom = [];

let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

// functions related with user
const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log("New Connected User");
  console.log(connectedUsers);
};

const removeConnectedUser = (socketId) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log("after delete");
    console.log(connectedUsers);
  }
};

const getActiveConnections = (userId) => {
  const activeConnections = [];
  connectedUsers.forEach(function (value, key) {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUser = () => {
  const onLineUsers = [];
  connectedUsers.forEach((value, key) => {
    onLineUsers.push({ socketId: key, userId: value.userId });
  });

  return onLineUsers;
};

// functions related with rooms

const addNewActiveRoom = (userId, socketId) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };

  activeRoom = [...activeRoom, newActiveRoom];

  console.log("new active rooms: ");
  console.log(activeRoom);

  return newActiveRoom;
};

const getActiveRooms = () => {
  return [...activeRoom];
};

const getActiveRoom = (roomId) => {
  const room = activeRoom.find((r) => r.roomId === roomId);
  return {
    ...room,
  };
};
const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRoom.find((room) => room.roomId === roomId);
  console.log("room has been found");

  activeRoom = activeRoom.filter((room) => room.roomId !== roomId);
  console.log("Active Room : " + activeRoom);
  console.log(room.participants);

  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant],
  };

  activeRoom.push(updatedRoom);
};

module.exports = {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getSocketServerInstance,
  setSocketServerInstance,
  getOnlineUser,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
};
