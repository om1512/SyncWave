import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseRoom from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";
import * as roomHandler from '../../../realtimeCommunication/roomHandler';

const CloseRoomButton = () => {
  const handleCloseRoom = () => {
    roomHandler.leaveRoom();
  };

  return (
    <IconButton onClick={handleCloseRoom} style={{ color: "white" }}>
      <CloseRoom />
    </IconButton>
  );
};

export default CloseRoomButton;
