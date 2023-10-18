import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideoContainer = ({ localStream, remoteStream }) => {
  return (
    <MainContainer>
      <Video stream={localStream} isLocalStream></Video>
      {remoteStream != null &&
        remoteStream.map((remoteStream) => <Video stream={remoteStream} />)}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};
export default connect(mapStoreStateToProps)(VideoContainer);
