const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId } = data;
    console.log("Does this work" + receiverUserId);
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });
    console.log("Conversation : " + conversation);

    if (conversation) {
      chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = directChatHistoryHandler;
