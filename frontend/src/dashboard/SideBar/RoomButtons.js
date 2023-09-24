import React from "react";
import { Button, Tooltip } from "@mui/material";
import Avatar from "../../shared/components/Avatar";
import * as roomHandler from "../../realtimeCommunication/roomHandler";
export default function RoomButton({
  creator,
  roomId,
  amountOfParticipants,
  isUserInRoom,
}) {
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 4) {
      // able to join group
      roomHandler.joinRoom(roomId);
    }
  };

  const activeRoomButtonDisabled = amountOfParticipants > 3;
  const roomTitle = `Creator : ${creator}`;
  return (
    <Tooltip title={roomTitle}>
      <Button
        onClick={handleJoinActiveRoom}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "16px",
          margin: 0,
          padding: 0,
          minWidth: 0,
          marginTop: "10px",
          color: "white",
          backgroundColor: "#5865F2",
        }}
      >
        <Avatar username={creator} />
      </Button>
    </Tooltip>
  );
}
