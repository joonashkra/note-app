import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col gap-6 w-full items-center p-10">
      <h1 className="text-3xl mt-10 mb-4">{isLogin ? "Log In" : "Sign Up"}</h1>
      {isLogin ? <LoginForm /> : <SignupForm />}
      <p
        className="hover:text-light hover:cursor-pointer my-4"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Click here to Sign Up!" : "Click here to Log In!"}
      </p>
    </div>
  );
}
