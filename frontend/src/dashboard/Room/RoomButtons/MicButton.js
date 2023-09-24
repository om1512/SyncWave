import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
const MicButton = () => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleMicOperation = () => {
    setMicEnabled(!micEnabled);
  };

  return (
    <IconButton onClick={handleMicOperation} style={{ color: "white" }}>
      {micEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  );
};

export default MicButton; 
