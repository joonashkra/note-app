import { NavLink, useNavigate } from "react-router-dom";
import { COLORS } from "../../../colors";
import LogOutButton from "./LogOutButton";
import ProfileButton from "./ProfileButton";
import SettingsButton from "./SettingsButton";
import HomeButton from "./HomeButton";

export default function TopBar() {
  const buttonSize = 26;
  const buttonColor = COLORS.white;
  const navigate = useNavigate();

  return (
    <section className="topBar">
      <h1>NoteApp</h1>
      <nav className="topBarActions">
        <NavLink to="/">
          <HomeButton
            size={buttonSize}
            color={buttonColor}
            navigate={navigate}
          />
        </NavLink>
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
      </nav>
    </section>
  );
}
