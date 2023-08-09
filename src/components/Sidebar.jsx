import { styled } from "styled-components";
import SidebarOption from "./SidebarOption";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import { IconButton } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Sidebar() {
  const [channels] = useCollection(collection(db, "rooms"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack-Clone</h2>
          <h3>
            <FiberManualRecordIcon /> {user.displayName}
          </h3>
        </SidebarInfo>
        <IconButton children={<CreateIcon />} />
      </SidebarHeader>

      <SidebarOption Icon={CommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Chhanel Browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & User Groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={KeyboardArrowUpIcon} title="Show Less" />
      <hr />
      <SidebarOption Icon={KeyboardArrowDownIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" addChannelOption />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  flex: 0.2;
  max-width: 256px;
  margin-top: 55px;
  background-color: var(--slack-color);
  border-top: 1px solid #49274b;
  color: white;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  > hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 13px;
  border: 1px solid #48274b;

  > .MuiIconButton-root > .MuiSvgIcon-root {
    background-color: white;
    padding: 8px;
    border-radius: 50%;
    font-size: 18px;
    color: black;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
  }
  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    color: green;
    margin-right: 2px;
    margin-top: 1px;
  }
`;
