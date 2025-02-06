import { useNavigate } from "react-router-dom";
import ConnectButton from "./ConnectButton";
import CreateCollectionButton from "./CreateCollectionButton";
import CreateNoteButton from "./CreateNoteButton";

export default function SideBarActions() {
  const buttonSize = 26;
  const navigate = useNavigate();

  return (
    <nav className="sideBarActions">
      <div className="sideBarBtnContainer">
        <CreateNoteButton size={buttonSize} navigate={navigate} />
        <p className="sideBarBtnPopUp">Create new note</p>
      </div>
      <div className="sideBarBtnContainer">
        <CreateCollectionButton size={buttonSize} navigate={navigate} />
        <p className="sideBarBtnPopUp">Create new collection</p>
      </div>
      <div className="sideBarBtnContainer">
        <ConnectButton size={buttonSize} navigate={navigate} />
        <p className="sideBarBtnPopUp">Connect with people</p>
      </div>
    </nav>
  );
}
