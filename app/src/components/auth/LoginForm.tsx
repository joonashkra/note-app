import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { login, loggedIn, logout } = useAuthStore((state) => ({ login: state.login, loggedIn: state.loggedIn, logout: state.logout }))
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(loggedIn === true) navigate("/")
  }, [loggedIn, navigate])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex flex-col w-max gap-2">
        <h1>Log In</h1>
        <input ref={inputRef} type="email" onChange={(e) => setEmail(e.target.value)} className="mb-4 p-2" placeholder="Email..."/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="mb-4 p-2" placeholder="Password..."/>
        <button onClick={() => login(email, password)}>Log In</button> 
        <button onClick={logout}>Log Out</button> 
    </div>
  )
}