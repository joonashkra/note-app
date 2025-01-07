import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthProvider";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth hook must be used inside AuthContext.Provider');
    }

    return context;
};