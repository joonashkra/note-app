import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { AuthUser, NewUser } from "../../types/users";
import { login } from "../../services/loginService";
import noteService from "../../services/noteService";

interface AuthContext {
    token?: string | null;
    user?: AuthUser | null;
    handleLogin: (credentials: NewUser) => Promise<number>;
    handleLogout: () => Promise<void>; 
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("authToken") || null
    );
    const [user, setUser] = useState<AuthUser | null>(
        () => {
            const user = localStorage.getItem("authUser");
            return user ? JSON.parse(user) : null;
        }
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("authToken", token);
            noteService.setToken(token);
        } else {
            localStorage.removeItem("authToken");
        }

        if (user) {
            localStorage.setItem("authUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("authUser");
        }
    }, [token, user]);

    const handleLogin = async (credentials: NewUser) => {
        try {
            const response = await login(credentials);
            setToken(response.token);
            setUser(response.user);
            noteService.setToken(response.token);
            return 200;
        } catch (error) {
            console.error(error);
            setToken(null);
            setUser(null);
            return 401;
        }
    };

    const handleLogout = async () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
    };

    return (
        <AuthContext.Provider value={{ token, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };
