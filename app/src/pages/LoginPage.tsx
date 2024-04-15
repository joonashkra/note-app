import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'

export default function LoginPage() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex flex-col m-10'>
      <h1 className="text-3xl mb-5">Log In</h1>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <p className='hover:text-light hover:cursor-pointer my-4' onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "No account yet? Sign Up here!" : "Go back to Log In here!"}
      </p>
    </div>
  )
}
