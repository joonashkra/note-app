import { NavLink, useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import ProfileButton from "./ProfileButton";
import HomeButton from "./HomeButton";

export default function TopBar() {
  const buttonSize = 26;
  const navigate = useNavigate();

  return (
    <section className="topBar">
      <h1>NoteApp</h1>
      <nav className="topBarActions">
        <NavLink to="/">
          <HomeButton size={buttonSize} navigate={navigate} />
        </NavLink>
        <ProfileButton size={buttonSize} navigate={navigate} />
        <LogOutButton size={buttonSize} navigate={navigate} />
      </nav>
    </section>
  );
}
