import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { styled } from "styled-components";
import { auth, provider } from "../firebase";

export default function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => console.error(error));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png" alt="logo"/>
        <h1>Sing in to Slack</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    color: white;
    background-color: #0a8d48 !important;
    margin-top: 50px;
  }
`;
