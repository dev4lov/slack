import { styled } from "styled-components";

export default function Message({ user, message, timestamp, userImage }) {
  return (
    <ChatMessageContainer>
      <img src={userImage} alt="userImage"/>
      <ChatInfo>
        <h4>
          {user} <span>{timestamp}</span>
        </h4>
        <p>{message}</p>
      </ChatInfo>
    </ChatMessageContainer>
  );
}

const ChatMessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;

  > img {
    height: 40px;
    border-radius: 5px;
  }
`;
const ChatInfo = styled.div`
  margin-left: 10px;
  > h4 > span {
    font-size: 10px;
    font-weight: 300;
    margin-left: 10px;
  }
`;
