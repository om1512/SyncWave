const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require("../../socketHandlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body; //invitation id
    const { userId } = req.user; //receiver id

    // remove that invitation where sender id, receiver id is same
    const invitationExist = await FriendInvitation.exists({ _id: id });
    if (invitationExist) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    // update pending invitation
    friendsUpdate.updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation Rejected");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something Went Wrong" + error);
  }
};

module.exports = postReject;
