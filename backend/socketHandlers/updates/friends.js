const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    // find all active connections of that specific userId will get socket id then
    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitation", {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId) => {
  try {
    const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
      "friends",
      "_id username mail"
    );
    if (user) {
      const friendList = user.friends.map((f) => {
        return {
          id: f._id,
          mail: f.mail,
          username: f.username,
        };
      });

      const receiverList = serverStore.getActiveConnections(userId);

      // get io server instance
      const io = serverStore.getSocketServerInstance();

      receiverList.forEach((token) => {
        io.to(token).emit("friend-list", {
          friends: friendList ? friendList : [],
        });
      });
    }
  } catch (error) {
    console.log(error);
    // return res.send(500).send("Error Occur");
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
