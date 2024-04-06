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
    <div className="flex flex-col w-max">
        <input type="email" onChange={handleEmailChange} className="mb-4 p-2" placeholder="Email..."/>
        <input type="password" onChange={handlePasswordChange} className="mb-4 p-2" placeholder="Password..."/>
        <button onClick={signIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log In</button> 
        <button onClick={logOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log Out</button> 
    </div>
  )
}