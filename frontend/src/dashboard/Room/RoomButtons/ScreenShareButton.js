import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";

const ScreenShareButton = () => {
  const [screenShare, setScreenShare] = useState(true);

  const handleScreenShare = () => {
    setScreenShare(!screenShare);
  };

  return (
    <IconButton
      onClick={handleScreenShare}
      style={{ color: "white" }}
    ></IconButton>
  );
};

export default ScreenShareButton;
