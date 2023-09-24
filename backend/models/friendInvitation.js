const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema({
  // many to many relation
  // kind of foreign keys we are getting from User model and bind them together
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("FriendInvitation", friendInvitationSchema);
