import { PropsWithChildren } from "react";
import { NewUser } from "../../types/users";
import loginService from "../../services/loginService";
import noteService from "../../services/noteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../pages/Loading";
import userService from "../../services/userService";
import AuthContext from "./AuthContext";
import collectionService from "../../services/collectionService";

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const { data: auth, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const user = localStorage.getItem("authUser");

      if (token && user) {
        noteService.setToken(token);
        userService.setToken(token);
        collectionService.setToken(token);
        return {
          token,
          user: JSON.parse(user),
        };
      }

      return {
        token: null,
        user: null,
      };
    },
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: loginMutation } = useMutation({
    mutationFn: (credentials: NewUser) => loginService.login(credentials),
    onSuccess: (auth) => {
      localStorage.setItem("authToken", auth.token);
      localStorage.setItem("authUser", JSON.stringify(auth.user));
      noteService.setToken(auth.token);
      collectionService.setToken(auth.token);
      userService.setToken(auth.token);
      queryClient.setQueryData(["auth"], {
        token: auth.token,
        user: auth.user,
      });
    },
  });

  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      queryClient.setQueryData(["auth"], {
        token: null,
        user: null,
      });
    },
  });

  const handleLogin = async (credentials: NewUser) => {
    await loginMutation(credentials);
  };

  const handleLogout = async () => {
    logoutMutation();
  };

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        token: auth?.token,
        user: auth?.user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
