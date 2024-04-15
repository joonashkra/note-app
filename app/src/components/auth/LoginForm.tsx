import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { login, loggedIn } = useAuthStore((state) => ({ login: state.login, loggedIn: state.loggedIn, logout: state.logout }))
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
    setShowError(true)
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleLogin}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder="Email..." required/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder="Password..." required/>
        <button title='Log In' className="hover:border-light focus:border-light bg-dark rounded-md" type='submit'>Log In</button> 
        {showError && <p className='text-red'>Wrong email or password.</p>}
    </form>
  )
}