import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authStatus = await handleLogin({ username, password });

    if (authStatus === 200) {
      navigate("/");
    } else if (authStatus === 401) {
      setErrorMsg("Invalid credentials");
    } else {
      setErrorMsg("Unexpected error occured.");
    }
  };

  return (
    <form
      className="flex flex-col gap-5 w-full xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
      onSubmit={login}
      role="loginform"
    >
      <input
        ref={inputRef}
        type="username"
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark"
        placeholder="Username..."
        required
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark"
        placeholder="Password..."
        required
      />
      <button
        title="Log In"
        className="hover:border-light focus:border-light bg-dark rounded-md"
        type="submit"
        role="loginBtn"
      >
        Log In
      </button>
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
}
