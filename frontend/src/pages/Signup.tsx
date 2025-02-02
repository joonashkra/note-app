import { useState } from "react";
import SignupForm from "../components/auth/SignupForm";
import ErrorMessage from "../components/general/ErrorMessage";

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className="authPage">
      <h1>Create your account</h1>
      <SignupForm setErrorMsg={setErrorMsg} />
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
