// import React, { useRef, useEffect } from "react";
// import { styled } from "@mui/system";
// import { connect } from "react-redux";
// import MessagesHeader from "./MessagesHeader";
// import DUMMY_MESSAGES from "./DUMMY_MESSAGES";
// import Message from "./Message";

// const MainContainer = styled("div")({
//   height: "calc(100%-60px)",
//   overflow: "auto",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// });

// const convertDateToHumanReadable = (date, format) => {
//   const map = {
//     mm: date.getMonth() + 1,
//     dd: date.getDate(),
//     yy: date.getFullYear().toString().slice(-2),
//     yyyy: date.getFullYear(),
//   };
//   console.log(format);
//   return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
// };

// function Messages({ chosenChatDetails, messages }) {
//   return (
//     <MainContainer>
//       <MessagesHeader name={chosenChatDetails?.name} />
//       {DUMMY_MESSAGES.map((message, index) => {
//         const sameAuthor =
//           index > 0 &&
//           messages[index].author._id == messages[index - 1].author._id;

//         const sameDay =
//           index > 0 &&
//           convertDateToHumanReadable(new Date(message.date, "dd/mm/yy")) ===
//             convertDateToHumanReadable(
//               new Date(messages[index - 1].date),
//               "dd/mm/yy"
//             );

//         console.log(message.date);
//         console.log(
//           convertDateToHumanReadable(new Date(message.date, "dd/mm/yy"))
//         );
//         return (
//           <Message
//             key={messages._id}
//             content={messages.content}
//             username={messages.author.username}
//             sameAuthor={sameAuthor}
//             date={messages.date}
//             sameDay={convertDateToHumanReadable(
//               new Date(message.date),
//               "dd/mm/yy"
//             )}
//           />
//         );
//       })}
//     </MainContainer>
//   );
// }

// const mapStoreStateToProps = (state) => {
//   return {
//     ...state.chat,
//   };
// };
// export default connect(mapStoreStateToProps)(Messages);

import React, { userRef, useEffect } from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const MainContainer = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <MainContainer>
      <MessagesHeader name={chosenChatDetails?.name} />
      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
            convertDateToHumanReadable(
              new Date(messages[index - 1].date),
              "dd/mm/yy"
            );

        return (
          <div key={message._id} style={{ width: "97%" }}>
            {(!sameDay || index === 0) && (
              <DateSeparator
                date={convertDateToHumanReadable(
                  new Date(message.date),
                  "dd/mm/yy"
                )}
              />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanReadable(
                new Date(message.date),
                "dd/mm/yy"
              )}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messages);
