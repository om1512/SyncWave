import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
const Wrapper = styled("div")({
  flexGrow: 1,
  height: "100vh",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  margin: "50px",
});

function WelcomeMessage() {
  return (
    <Wrapper>
      <Typography variant="h6" sx={{ color: "white" }}>
        To Start Chatting Choose Conversation
      </Typography>
    </Wrapper>
  );
}

export default WelcomeMessage;
