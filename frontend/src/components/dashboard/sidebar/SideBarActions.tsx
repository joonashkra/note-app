import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../colors";
import ConnectButton from "./ConnectButton";
import CreateCollectionButton from "./CreateCollectionButton";
import CreateNoteButton from "./CreateNoteButton";

export default function SideBarActions() {
  const buttonSize = 26;
  const buttonColor = COLORS.black;
  const navigate = useNavigate();

  return (
    <nav className="sideBarActions">
      <div>
        <CreateNoteButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <p className="sideBarBtnPopUp">Create new note</p>
      </div>
      <div>
        <CreateCollectionButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <p className="sideBarBtnPopUp">Create new collection</p>
      </div>
      <div>
        <ConnectButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <p className="sideBarBtnPopUp">Connect with people</p>
      </div>
    </nav>
  );
}
