import { create } from 'zustand';
import { auth } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

type AuthStore = {
    userid: string | null;
    loggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => {
    const initialLoggedIn = !!auth.currentUser;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
        const loggedIn = !!user;
        set({ loggedIn, userid: loggedIn ? user?.uid : null });
    });

    return {
        userid: null,
        loggedIn: initialLoggedIn,

        login: async (email, password) => {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.error(error);
            }
        },
        logout: async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error(error);
            }
        },

        unsubscribe,
    };
});
