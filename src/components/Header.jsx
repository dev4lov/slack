import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Header() {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Avatar src={user.photoURL} />
        <IconButton children={<AccessTimeIcon />} />
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search" />
      </HeaderSearch>
      <HeaderRight>
        <IconButton children={<HelpOutlineIcon />} />
      </HeaderRight>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  background-color: var(--slack-color);
  display: flex;
  justify-content: space-between;
  color: white;
  align-items: center;
  width: 100vw;
  position: fixed;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: space-between;
  padding: 8px;

  > .MuiIconButton-root {
    color: white;
  }

  > .MuiAvatar-root {
    cursor: pointer;

    :hover {
      opacity: 0.8;
    }
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  background-color: #421f44;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;
  border-radius: 5px;

  > input {
    min-width: 30vw;
    color: white;
    background: transparent;
    border: none;
    outline: none;
    text-align: center;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiIconButton-root {
    margin-left: auto;
    margin-right: 20px;
    color: white;
  }
`;
