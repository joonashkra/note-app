import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'

export default function LoginPage() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex flex-col m-10 gap-4'>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <p className='hover:text-blue-500 hover:cursor-pointer' onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "No account yet? Sign Up here!" : "Go back to Log In here!"}
      </p>
    </div>
  )
}
