import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./RoomButtons/ScreenShareButton";
import MicButton from "./RoomButtons/MicButton";
import CloseRoomButton from "./RoomButtons/CloseRoomButton";
import CameraButton from "./RoomButtons/CameraButton";

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
const RoomButtons = () => {
  return (
    <MainContainer>
      <ScreenShareButton />
      <MicButton />
      <CloseRoomButton />
      <CameraButton />
    </MainContainer>
  );
};

export default RoomButtons;
