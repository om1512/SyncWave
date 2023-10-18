import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./RoomButtons/ScreenShareButton";
import MicButton from "./RoomButtons/MicButton";
import CloseRoomButton from "./RoomButtons/CloseRoomButton";
import CameraButton from "./RoomButtons/CameraButton";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const RoomButtons = ({ localStream }) => {
  return (
    <MainContainer>
      <ScreenShareButton />
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      <CameraButton localStream={localStream} />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(RoomButtons);
