import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import { connect } from "react-redux";
import RoomButton from "./RoomButtons";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = ({ activeRooms }) => {
  console.log("length" + activeRooms.length);
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton />
      {activeRooms.map((room) => (
        <RoomButton
          roomId={room.roomId}
          creator={room.creatorName}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={room.isUserInRoom}
            
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state.room,
  };
};
export default connect(mapStoreStateToProps, null)(SideBar);
