import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showError, setShowError] = useState("");
  const { signup, loggedIn } = useAuthStore((state) => ({
    signup: state.signup,
    loggedIn: state.loggedIn,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === true) {
      window.alert("Signup succesful. You are now logged in.");
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 6) {
      setIsError(true);
      setShowError("Password length should be at least 6 characters.");
      return;
    }
    await signup(email, password);
    setIsError(true);
    setShowError("Account with this email already exists.");
  };

  return (
    <form
      className="flex flex-col gap-5 w-full xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
      onSubmit={handleSignup}
    >
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark"
        placeholder="New Email..."
        required
      />
      <input
        min={6}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark"
        placeholder="New Password..."
        required
      />
      <button
        className="hover:border-light focus:border-light bg-dark rounded-md"
        type="submit"
      >
        Sign Up
      </button>
      {isError && <p className="text-red">{showError}</p>}
    </form>
  );
}
