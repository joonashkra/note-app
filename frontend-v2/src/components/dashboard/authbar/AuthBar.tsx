import { NavLink, useNavigate } from "react-router-dom";
import { COLORS } from "../../../colors";
import LogOutButton from "./LogOutButton";
import ProfileButton from "./ProfileButton";
import SettingsButton from "./SettingsButton";
import { useAuth } from "../../../hooks/useAuth";

export default function AuthBar() {
  const buttonSize = 26;
  const buttonColor = COLORS.white;
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="authBar">
      <h1>NoteApp</h1>
      <p>Logged in as {user?.username}</p>
      <div className="authBarActions">
        <NavLink to="/">Home</NavLink>
        <ProfileButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <SettingsButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
        <LogOutButton
          size={buttonSize}
          color={buttonColor}
          navigate={navigate}
        />
      </div>
    </nav>
  );
}
