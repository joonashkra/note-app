import { useMutation } from "@tanstack/react-query";
import { newUserSchema } from "../../types/schemas";
import { NewUser } from "../../types/users";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface SignupFormProps {
  setErrorMsg: (text: string) => void;
}

export default function SignupForm({ setErrorMsg }: SignupFormProps) {
  const navigate = useNavigate();

  const { mutateAsync: signUpMutation } = useMutation({
    mutationFn: (credentials: NewUser) => userService.create(credentials),
    onSuccess: () => {
      window.alert("Account created succesfully. Log in to continue!");
      navigate("/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.status === 400) {
        setErrorMsg("This account might already exist");
      } else setErrorMsg("Unexpected error when creating accout");
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

    await signUpMutation(parsedCredentials.data);
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <div className="authFormInput">
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Type new username..."
          required
        />
      </div>
      <div className="authFormInput">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Type new password..."
          required
          minLength={5}
        />
      </div>
      <button type="submit" className="authBtn">
        Sign Up
      </button>
    </form>
  );
}
