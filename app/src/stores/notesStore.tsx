import { create } from 'zustand'
import { Note } from '../types/Note'
import { collection, addDoc, getDoc, deleteDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthStore } from './authStore';

type NotesStore = {
  notes: Note[];
  note: Note | null;
  newNote: string | null;
  loading: boolean;
  getNotes: () => Promise<void>;
  getNote: (id: string) => Promise<void>;
  createNote: (title: string, description: string, creationDate: string, deadlineDate: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id: string, title: string, description: string, deadlineDate: string) => Promise<void>;
  checkNote: (id: string, checked: boolean) => Promise<void>;
}

export const useNotesStore = create<NotesStore>()((set) => ({
    notes: [],

    note: null,

    loading: false,

    newNote: null,

    getNotes: async () => {
        set({ loading: true });
        const userid = useAuthStore.getState().userid;
        const notesRef = collection(db, "notes");
        try {
            const userQuery = query(notesRef, where("userid", "==", userid))
            const docSnap = await getDocs(userQuery);
            const notesData: Note[] = docSnap.docs.map((doc) => ({
                ...(doc.data() as Note),
                id: doc.id
            }));
            set({ notes: notesData });
        } catch (error) {
            console.error(error);
        }
        set({ loading: false });
    },

    getNote: async (id) => {
        set({ loading: true })
        try {
            const noteRef = doc(db, "notes", id);
            const docSnap = await getDoc(noteRef);
            const noteData = { ...docSnap.data(), id: docSnap.id } as Note;
            set({ note: noteData })
        } catch (error) {
            console.error(error);
        }
        set({ loading: false })
    },

    createNote: async (title, description, creationDate, deadlineDate) => {
        set({ loading: true })
        const notesRef = collection(db, "notes")
        const userid = useAuthStore.getState().userid
        set({ newNote: null })
        
        try {
            const docRef = await addDoc(notesRef, {
                userid,
                title,
                description,
                creationDate,
                deadlineDate,
                checked: false
            }) 

            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const newNote: Note = {
                    userid: docSnapshot.data().userid,
                    id: docSnapshot.id,
                    title: docSnapshot.data().title,
                    description: docSnapshot.data().description,
                    creationDate: docSnapshot.data().creationDate,
                    deadlineDate: docSnapshot.data().deadlineDate,
                    checked: docSnapshot.data().checked,
                }

                set({ newNote: newNote.id });

                //Handle animation
                let animationCompleted = false;
                const onAnimationEnd = () => {
                    if (!animationCompleted) {
                        set({ newNote: null });
                        animationCompleted = true;
                    }
                };
                const animatedElement = document.getElementById(newNote.id);
                if (animatedElement) {
                    animatedElement.addEventListener("animationend", onAnimationEnd);
                }
            }

        } catch (error) {
            console.error(error)
        }
        set({loading: false})

    },

    deleteNote: async (id) => {
        const noteDoc = doc(db, "notes", id)
        const { notes } = useNotesStore.getState()
        try {
            await deleteDoc(noteDoc)
            set({ notes: notes.filter(note => note.id !== id), newNote: null })
        } catch (error) {
            console.log(error)
        }
    },

    updateNote: async (id, title, description, deadlineDate) => {
        set({ loading: true })
        try {
            const noteRef = doc(db, "notes", id);
            await updateDoc(noteRef, {
                title,
                description,
                deadlineDate,
            });

            set({ newNote: id });

            //Handle animation
            let animationCompleted = false;
            const onAnimationEnd = () => {
                if (!animationCompleted) {
                    set({ newNote: null });
                    animationCompleted = true;
                }
            };
            const animatedElement = document.getElementById(id);
            if (animatedElement) {
                animatedElement.addEventListener("animationend", onAnimationEnd);
            }
            
        } catch (error) {
            console.error(error);
        }
        set({ loading: false });
    },

    checkNote: async (id, checked) => {
        const noteDoc = doc(db, "notes", id)
        try {
            await updateDoc(noteDoc, {
                checked
            })
        } catch (error) {
            console.error(error)
        }
    }

}))