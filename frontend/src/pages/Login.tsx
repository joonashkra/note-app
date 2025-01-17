import { useState } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className="authPage">
      <h1>Log in to NoteApp</h1>
      <LoginForm setErrorMsg={setErrorMsg} />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </main>
  );
}
