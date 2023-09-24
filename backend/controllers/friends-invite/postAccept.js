const FriendInvitation = require("../../models/friendInvitation");
const User = require("../../models/user");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(401).send("Error Occurred.");
    }
    const { senderId, receiverId } = invitation;
    // add in friends array of both users;
    const user1 = await User.findById(senderId);
    user1.friends = [...user1.friends, receiverId];

    const user2 = await User.findById(receiverId);
    user2.friends = [...user2.friends, senderId];

    await user1.save();
    await user2.save();

    // delete invitation after they become friends
    await FriendInvitation.findByIdAndDelete(id);

    // Update friend list
    friendsUpdate.updateFriends(userId);
    friendsUpdate.updateFriends(receiverId);

    // update list of friends
    friendsUpdate.updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation Accepted");
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = postAccept;
