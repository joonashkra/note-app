import { useAuth } from "../../../hooks/useAuth"
import { SvgButtonProps } from "../../../types/props"

const LogOutButton = ({ size, color, navigate }: SvgButtonProps) => {

  const { handleLogout } = useAuth();

  const logout = () => {
    handleLogout();
    navigate('/')
  }

  return (
    <svg 
    id="logOutBtn"
    className="authBarBtn" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 17 17" 
    height={size} 
    width={size} 
    fill={color}
    onClick={logout}
    >
    <path d="M16 9.5c0 4.136-3.364 7.5-7.5 7.5S1 13.636 1 9.5c0-3.498 2.476-6.579 5.888-7.326l.214.977C4.146 3.798 2 6.468 2 9.5 2 13.084 4.916 16 8.5 16S15 13.084 15 9.5c0-3.028-2.143-5.698-5.096-6.348l.215-.977C13.527 2.926 16 6.006 16 9.5zM9 0H8v10h1V0z" />
  </svg>
  )
}
export default LogOutButton
