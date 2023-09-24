const serverStore = require("../../serverStore");

const updateRooms = (toSpecifiedTargetId = null) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  // toSpecificTargetId is just an socket token of all active users
  // if we provide specific id then we emit to only those users other wise to all the users

  console.log("Active rooms : " + activeRooms.length);
  activeRooms.map((value) => console.log(value));

  if (toSpecifiedTargetId) {
    io.to(toSpecifiedTargetId).emit("active-rooms", {
      activeRooms,
    });
  } else {
    io.emit("active-rooms", {
      activeRooms,
    });
  }
};

module.exports = { updateRooms };
