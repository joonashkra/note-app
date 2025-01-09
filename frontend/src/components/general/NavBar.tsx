import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Menu } from "../../assets/Menu";
import { ChevronUp } from "../../assets/ChevronUp";

export default function NavBar() {
  const [dropdown, setDropDown] = useState(false);
  const { loggedIn, logout } = useAuthStore((state) => ({
    loggedIn: state.loggedIn,
    logout: state.logout,
  }));

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDropDown = () => {
    setDropDown(!dropdown);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropDown(false);
    }
  };

  const handleLogOut = () => {
    const confirmLogOut = window.confirm("You are about to be logged out.");
    if (confirmLogOut) logout();
  };

  return (
    <div
      ref={dropdownRef}
      className="sm:flex sm:flex-row sm:justify-between flex-col bg-black/80 text-white sm:p-8 p-4 transform ease-in-out duration-200"
    >
      <div
        className={
          dropdown
            ? "font-navFont flex justify-center items-center text-center text-xs font-normal mb-6 sm:mb-0"
            : "font-navFont flex justify-center items-center text-center text-xs font-normal mb-2 sm:mb-0"
        }
      >
        <h1>NoteVault</h1>
      </div>
      <nav
        className={
          dropdown
            ? "sm:flex justify-center items-center text-center"
            : "sm:flex hidden justify-center items-center text-center"
        }
      >
        <ul
          className="flex sm:flex-row flex-col sm:gap-8 md:gap-12 lg:gap-14 gap-4 text-xl font-normal"
          onClick={handleDropDown}
        >
          <NavLink
            title="Navigate to Homepage"
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-light hover:text-light/80"
                : "hover:text-light text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            title="Navigate to Create a Note"
            to="/create"
            className={({ isActive }) =>
              isActive
                ? "text-light hover:text-light/80"
                : "hover:text-light text-white"
            }
          >
            Create Note
          </NavLink>
          {loggedIn === true ? (
            <NavLink
              title="Click to Log Out"
              to="/login"
              onClick={handleLogOut}
              className="text-white hover:text-red"
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink
              title="Navigate to Login"
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-light hover:text-light/80"
                  : "hover:text-light text-white"
              }
            >
              Log In
            </NavLink>
          )}
        </ul>
      </nav>
      <div
        title={dropdown ? "Close Navigation Menu" : "Open Navigation Menu"}
        onClick={handleDropDown}
        className={
          dropdown
            ? "flex justify-center items-center text-center sm:hidden mt-8 transition-all duration-300 hover:cursor-pointer"
            : "flex justify-center items-center text-center sm:hidden transition-all duration-300 hover:cursor-pointer"
        }
      >
        {!dropdown && <Menu />}
        {dropdown && <ChevronUp />}
      </div>
    </div>
  );
}
