import { createContext } from "react";
import { AuthUser, NewUser } from "../../types/users";

interface AuthContext {
  token?: string | null;
  user?: AuthUser | null;
  handleLogin: (credentials: NewUser) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default AuthContext;
