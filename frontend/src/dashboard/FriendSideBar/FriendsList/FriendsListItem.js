import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../shared/components/Avatar";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/chatActions";
import {
  chatType,
  setChosenChatDetails,
} from "../../../store/actions/chatActions";

const FriendsListItem = ({ id, username, isOnline, setChosenChatDetails }) => {
  const handleChoseActiveConversation = () => {
    console.log({ id } + " " + { username } + " Clicked");
    setChosenChatDetails({ id: id, name: username }, chatType.DIRECT);
  };
  return (
    <Button
      onClick={handleChoseActiveConversation}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

// first argument of connect is whatever state we want to use and second is for actions
export default connect(null, mapActionToProps)(FriendsListItem);
