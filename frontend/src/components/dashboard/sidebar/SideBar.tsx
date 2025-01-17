import { useState } from "react";
import ToggleSideBar from "./ToggleSideBar";
import SideBarActions from "./SideBarActions";

export default function SideBar() {
  const [isBarOpen, setIsBarOpen] = useState(true);

  return (
    <header className="sideBar">
      <ToggleSideBar isBarOpen={isBarOpen} setIsBarOpen={setIsBarOpen} />
      {isBarOpen && <SideBarActions />}
    </header>
  );
}
