import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface LinkStyleProps {
  isActive: boolean;
}

const linkStyle = ({ isActive }: LinkStyleProps) => ({
  textDecoration: isActive ? "underline" : "none",
  textDecorationColor: isActive ? "var(--pink)" : "none",
  textUnderlineOffset: isActive ? "0.2rem" : "none",
});

export default function NavLinks() {
  const { token, handleLogout } = useAuth();

  return (
    <nav className="navLinks">
      <NavLink to="/" style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/overview" style={linkStyle}>
        Overview
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
