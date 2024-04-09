import { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-max gap-2">
        <input type="email" onChange={handleEmailChange} className="mb-4 p-2" placeholder="Email..."/>
        <input type="password" onChange={handlePasswordChange} className="mb-4 p-2" placeholder="Password..."/>
        <button onClick={signIn}>Log In</button> 
        <button onClick={logOut}>Log Out</button> 
    </div>
  )
}