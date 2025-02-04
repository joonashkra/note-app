import { useState } from "react";
import NavLinks from "./NavLinks";
import Menu from "../../assets/Menu";

export default function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  return (
    <header className={`navBar ${dropdown ? "expanded" : ""}`}>
      <div className="navBarTitle">
        <h1>NoteApp</h1>
        <div id="menuBtn" onClick={() => setDropdown(!dropdown)}><Menu /></div>
      </div>
      <NavLinks dropdown={dropdown} setDropdown={setDropdown} />
    </header>
  );
}
