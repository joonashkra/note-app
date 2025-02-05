import { useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import ErrorMessage from "../../components/general/ErrorMessage";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className="authPage">
      <h1>Log In</h1>
      <LoginForm setErrorMsg={setErrorMsg} />
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
