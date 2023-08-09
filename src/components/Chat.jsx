import { styled } from "styled-components";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { useEffect, useRef } from "react";

export default function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const docRef = roomId && doc(db, "rooms", roomId);
  const [roomDetails] = useDocument(roomId && docRef);
  const [roomMessages, loading] = useCollection(
    roomId && query(collection(docRef, "messages"), orderBy("timestamp", "asc"))
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <ChatHeader>
            <HeaderLeft>
              <h4>
                #{roomDetails?.data().name}
                <StarBorderIcon />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </ChatHeader>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { user, message, userImage, timestamp } = doc.data();
              return (
                <Message
                  key={doc.id}
                  user={user}
                  message={message}
                  userImage={userImage}
                  timestamp={new Date(timestamp?.toDate()).toUTCString()}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}
const ChatBottom = styled.div`
  padding-bottom: 150px;
`;
const ChatContainer = styled.div`
  flex: 0.7;
  margin-top: 50px;
  flex-grow: 1;
  overflow-y: scroll;
`;

const ChatHeader = styled.div`
  flex: 1;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    align-items: center;
    text-transform: lowercase;
  }

  > h4 > .MuiSvgIcon-root {
    font-size: 18px;
    margin-left: 5px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    font-size: 16px;
    margin-right: 5px;
  }
`;

const ChatMessages = styled.div``;
