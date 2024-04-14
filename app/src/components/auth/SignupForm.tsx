import { useState } from 'react';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignupForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const unavailable = true;

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  if(unavailable) return <p>This feature is temporarily unavailable.</p>

  return (
    <div className="flex flex-col w-max gap-2">
        <h1>Sign Up</h1>
        <input type="email" onChange={(e) => setEmail(e.target.value)} className="mb-4 p-2" placeholder="Email..."/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} className="mb-4 p-2" placeholder="Password..."/>
        <button onClick={signUp}>Sign Up</button> 
    </div>
  )
}