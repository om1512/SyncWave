import {
  setActiveRooms,
  setOpenRoom,
  setRoomDetails,
} from "../store/actions/roomActions";
import store from "../store/store";
import * as socketConnection from "./socketConnection";
export const createNewRoom = () => {
  store.dispatch(setOpenRoom(true, true)); // store.dispatch to update store state variable after action performed
  socketConnection.createNewRoom();
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRoom = (data) => {
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;
  let room = [];

  activeRooms.forEach((r) => {
    friends.forEach((f) => {
      if (f.id === r.roomCreator.userId) {
        room.push({ ...r, creatorName: f.username });
      }
    });
  });

  store.dispatch(setActiveRooms(room));
};

export const joinRoom = (roomId) => {
  store.dispatch(setRoomDetails({ roomId }));
  store.dispatch(setOpenRoom(false, true));
  socketConnection.joinRoom({ roomId });
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;
  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
