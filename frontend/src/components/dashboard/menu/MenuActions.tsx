import { useNavigate } from "react-router-dom";
import { COLORS } from "../../../colors";
import ConnectButton from "./ConnectButton";
import CreateCollectionButton from "./CreateCollectionButton";
import CreateNoteButton from "./CreateNoteButton";
import HomeButton from "../authbar/HomeButton";

export default function MenuActions() {
  const buttonSize = 26;
  const buttonColor = COLORS.black;
  const navigate = useNavigate();

  return (
    <nav className="menuActions">
      <div>
        <CreateNoteButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <p className="menuBarBtnPopUp">Create new note</p>
      </div>
      <div>
        <CreateCollectionButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <p className="menuBarBtnPopUp">Create new collection</p>
      </div>
      <div>
        <ConnectButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <p className="menuBarBtnPopUp">Connect with people</p>
      </div>
    </nav>
  );
}
