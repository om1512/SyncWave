import { chatActions } from "../actions/chatActions";

const initState = {
  chosenChatDetails: null,
  messages: [],
  chatType: null,
};

const reducer = (state = initState, actions) => {
  switch (actions.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chosenChatDetails: actions.chatDetails,
        chatType: actions.chatType,
        messages: [], // after selecting any other individual or group we need to reset message panel
      };
    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: actions.messages,
      };
    default:
      return state;
  }
};

export default reducer;
