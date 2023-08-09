import { styled } from "styled-components";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContainer>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111615.png"
            alt="logo"
          />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </AppLoadingContainer>
      </AppLoading>
    );
  }

  return (
    <>
      {user ? (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Chat />
          </AppBody>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;

  > img {
    padding: 20px;
    height: 100px;
    margin-bottom: 50px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
  scroll-behavior: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;
