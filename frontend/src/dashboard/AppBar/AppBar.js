import React from "react";
import { styled } from "@mui/system";
import LongMenu from "./MenuIcon";
import ChoseOptionLabelMenu from "./choseOptionLabelMenu";

const MainComponent = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "#36393F",
  width: "calc(100% - 326px)",
  display: "flex",
  alignItem: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});
export default function AppBar() {
  return (
    <MainComponent>
      <ChoseOptionLabelMenu />
      <LongMenu />
    </MainComponent>
  );
}
