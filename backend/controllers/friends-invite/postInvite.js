const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMail } = req.body;
  const { userId, mail } = req.user;

  // check if friend that we would like to invite is another user because it does not make any sense to send friend request to oneself.
  if (mail.toLowerCase() === targetMail.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry, You cannot become friend with yourself");
  }
  const targetUser = await User.findOne({
    mail: targetMail.toLowerCase(),
  });

  // check if user does not exist
  if (!targetUser) {
    res.status(404).send(`${targetMail} has not exist`);
  }
  // check if invitation is already send
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status("409").send("Invitation has been already sent");
  }

  // check if the user which we would like to invite is already our friend
  const userAlreadyFriend = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (userAlreadyFriend) {
    return res.status(409).send("Friend Already Added");
  }

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  //if invitation has been successfully created we would like to friends invitation if other user is already online

  //send pending invitation update to specific user
  friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());
  return res.status(201).send("Invitation is Sent");
};

module.exports = postInvite;
