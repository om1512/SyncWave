import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
const ScreenShareButton = () => {
  const [screenShare, setScreenShare] = useState(true);

  const handleScreenShare = () => {
    setScreenShare(!screenShare);
  };

  return (
    <IconButton onClick={handleScreenShare} style={{ color: "white" }}>
      {screenShare ? <ScreenShareIcon /> : <StopScreenShareIcon />}
    </IconButton>
  );
};

export default ScreenShareButton;
