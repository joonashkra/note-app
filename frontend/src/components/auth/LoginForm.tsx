import { useMutation } from "@tanstack/react-query";
import { newUserSchema } from "../../types/schemas";
import { NewUser } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormProps {
  setErrorMsg: (text: string) => void;
}

export default function LoginForm({ setErrorMsg }: LoginFormProps) {
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: (credentials: NewUser) => handleLogin(credentials),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === 400) {
        setErrorMsg("Invalid credentials");
      } else setErrorMsg("Unexpected error on log in");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    const parsedCredentials = newUserSchema.safeParse(formValues);

    if (!parsedCredentials.success) {
      setErrorMsg(`Error: ${parsedCredentials.error.issues[0].message}`);
      return;
    }

    await loginMutation(parsedCredentials.data);
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <div className="authFormInput">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Type your username..."
          required
        />
      </div>
      <div className="authFormInput">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Type your password..."
          required
          minLength={5}
        />
      </div>
      <button type="submit" className="authBtn">
        Log In
      </button>
    </form>
  );
}
