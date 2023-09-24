import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages";
import NewMassageInput from "./NewMassageInput";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "10px",
});

function MessengerContent({ chosenChatDetails }) {
  useEffect(() => {
    // responsible to fetch user's old message
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);
  return (
    <Wrapper>
      <Messages />
      <NewMassageInput />
    </Wrapper>
  );
}

export default MessengerContent;
