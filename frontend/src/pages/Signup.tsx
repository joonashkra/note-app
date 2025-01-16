import { useState } from "react";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="authPage">
      <h1>Create your account</h1>
      <SignupForm setErrorMsg={setErrorMsg} />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}
