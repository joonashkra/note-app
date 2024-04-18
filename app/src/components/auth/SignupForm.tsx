import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false)
  const { signup, loggedIn } = useAuthStore((state) => ({ signup: state.signup, loggedIn: state.loggedIn, logout: state.logout }))
  const navigate = useNavigate()
  const unavailable = false;

  useEffect(() => {
    if (loggedIn === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(email, password);
    setShowError(true)
  };

  if(unavailable) return <p>This feature is temporarily unavailable.</p>

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSignup}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder="New Email..." required/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder="New Password..." required/>
        <button className="hover:border-light focus:border-light bg-dark rounded-md" type='submit'>Sign Up</button>
        {showError && <p className='text-red'>Error.</p>}
    </form>
  )
}