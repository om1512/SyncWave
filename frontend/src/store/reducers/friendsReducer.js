import { friendActions } from "../actions/friendsActions";

const initState = {
  friends: [],
  friendsInvitations: [],
  onlineFriends: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case friendActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendActions.SET_FRIENDS_INVITATION:
      return {
        ...state,
        friendsInvitations: action.friendsInvitations,
      };
    case friendActions.SET_ONLINE_FRIENDS:
      return {
        ...state,
        onlineFriends: action.onlineFriends,
      };
    default:
      return state;
  }
};

export default reducer;
