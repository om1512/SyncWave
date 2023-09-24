import { openAlertMessage } from "./alertActions";
import * as api from "../../api";
export const friendActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_FRIENDS_INVITATION: "FRIENDS.SET_FRIENDS_INVITATION",
  SET_ONLINE_FRIENDS: "SET_ONLINE_FRIENDS",
};

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
  };
};

const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation has been sent !"));
      closeDialogHandler();
    }
  };
};

export const setFriends = (friends) => {
  return {
    type: friendActions.SET_FRIENDS,
    friends,
  };
};

export const setOnlineFriends = (onlineFriends) => {
  return {
    type: friendActions.SET_ONLINE_FRIENDS,
    onlineFriends,
  };
};

export const setPendingFriendsInvitations = (friendsInvitations) => {
  return {
    type: friendActions.SET_FRIENDS_INVITATION,
    friendsInvitations,
  };
};

const acceptFriendInvitation = (data) => {
  console.log("Inside Action Method");
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation accepted !"));
    }
  };
};

const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Invitation rejected !"));
    }
  };
};
