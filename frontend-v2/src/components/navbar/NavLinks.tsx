
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function NavLinks() {

  const { token, handleLogout } = useAuth();

  console.log("token: ", token);

  return (
    <nav className='navLinks'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        {token ? 
        <>
          <div className='dashboardLink'>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </div>
          <a onClick={handleLogout}>Log Out</a>
        </>
        : 
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>Sign Up</NavLink>
          </>
        }
    </nav>
  )
}
