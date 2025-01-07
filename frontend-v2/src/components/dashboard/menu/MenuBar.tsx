import { useState } from "react";
import ToggleMenu from "./ToggleMenu";
import MenuActions from "./MenuActions";

export default function MenuBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <div className="menuBar">
            <ToggleMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && <MenuActions />}
        </div>
    );
}
