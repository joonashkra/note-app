import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface LinkStyleProps {
  isActive: boolean;
}

const linkStyle = ({ isActive }: LinkStyleProps) => ({
  textDecoration: isActive ? "underline" : "none",
  textDecorationColor: isActive ? "var(--gray)" : "none",
  textUnderlineOffset: isActive ? "0.3rem" : "none",
});

interface NavLinksProps {
  dropdown: boolean;
  setDropdown: (value: boolean) => void;
}

export default function NavLinks({ dropdown, setDropdown }: NavLinksProps) {
  const { token, handleLogout } = useAuth();

  return (
    <nav
      className={`navLinks ${dropdown ? "dropdown" : ""}`}
      onClick={() => setDropdown(false)}
    >
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      {token ? (
        <>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>
          <a onClick={handleLogout}>Log Out</a>
        </>
      ) : (
        <>
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
          <NavLink to="/signup" style={linkStyle}>
            Sign Up
          </NavLink>
        </>
      )}
    </nav>
  );
}
