import styled from "@emotion/styled";
import { useState } from "react";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ChatInput({ channelName, channelId, chatRef }) {
  const [message, setMessage] = useState("");
  const [user] = useAuthState(auth);
  const sendMessage = (e) => {
    e.preventDefault();
    if (channelId) {
      const docRef = doc(db, "rooms", channelId);
      addDoc(collection(docRef, "messages"), {
        message: message,
        user: `${user.displayName}`,
        timestamp: serverTimestamp(),
        userImage: `${user.photoURL}`,
      });
    }
    setMessage("");
    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Send Message in #${channelName}`}
        />
        <button type="submit">Send</button>
      </form>
    </ChatInputContainer>
  );
}

const ChatInputContainer = styled.div`
  > form {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  > form > input {
    position: fixed;
    bottom: 20px;
    width: 75%;
    outline: none;
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 10px;
  }
  > form > button {
    display: none;
  }
`;
