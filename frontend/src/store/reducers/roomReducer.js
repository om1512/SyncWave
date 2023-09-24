import { roomActions } from "../actions/roomActions";

const initState = {
  isUserInRoom: false, // if user already in room he/she not able to join any other  room
  isUserRoomCreator: false, // if user is creator of room then they cant join any other room and cant see their own room
  roomDetails: null, // current room in which we are in
  activeRooms: [], // we will be getting all active rooms information from server using socket.io
  localStream: null,
  remoteStream: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case roomActions.SET_ACTIVE_ROOMS:
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    default:
      return state;
  }
};

export default reducer;
