import { useEffect, useRef, useState } from 'react';
import { login } from '../../services/loginService';
import { setToken } from '../../services/noteService';

export default function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowError(false);
    try {
      const response = await login({ username, password });
      setToken(response.token)
    } catch (error) {
      console.log(error)
      setShowError(true)
    }
  };

  return (
    <form className='flex flex-col gap-5 w-full xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2' onSubmit={handleLogin} role='loginform'>
        <input ref={inputRef} type="username" onChange={(e) => setUsername(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder="Username..." required/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder="Password..." required/>
        <button title='Log In' className="hover:border-light focus:border-light bg-dark rounded-md" type='submit' role="loginBtn">Log In</button> 
        {showError && <p className='text-red' role='errorMsg'>Wrong username or password.</p>}
    </form>
  )
}