
import NavBar from '../components/navbar/NavBar'
import { Outlet } from 'react-router-dom'

export default function Landing() {
  return (
    <div className='landingPage'>
      <NavBar />
      <Outlet />
    </div>
  )
}
