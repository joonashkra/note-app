import { create } from 'zustand'
import { Note } from '../types/Note'
import { getDocs, collection, addDoc, DocumentReference, getDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

type NotesStore = {
  notes: Note[];
  note: Note | null;
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

    getNotes: async () => {
        set({ loading: true })
        const notesRef = collection(db, "notes")
        try {
            const data = await getDocs(notesRef)
            const filteredData: Note[] = data.docs.map((doc) => ({
            ...(doc.data() as Note),
            id: doc.id
            }))
            set({ notes: filteredData  })
        } catch (error) {
            console.error(error)
        }
        set({ loading: false })
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
        const notesRef = collection(db, "notes")
        
        try {
            const docRef: DocumentReference = await addDoc(notesRef, {
                title,
                description,
                creationDate,
                deadlineDate,
                checked: false
            }) 

            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const newNote: Note = { 
                    id: docSnapshot.id,
                    title: docSnapshot.data().title,
                    description: docSnapshot.data().description,
                    creationDate: docSnapshot.data().creationDate,
                    deadlineDate: docSnapshot.data().deadlineDate,
                    checked: docSnapshot.data().checked,
                }

                const { notes } = useNotesStore.getState()

                set({ notes: [...notes, newNote] })
            }

        } catch (error) {
            console.error(error)
        }
    },

    deleteNote: async (id) => {
        const noteDoc = doc(db, "notes", id)
        const { notes } = useNotesStore.getState()
        try {
            await deleteDoc(noteDoc)
            set({ notes: notes.filter(note => note.id !== id) })
        } catch (error) {
            console.log(error)
        }
    },

    updateNote: async (id, title, description, deadlineDate) => {
        const noteDoc = doc(db, "notes", id)
        try {
            await updateDoc(noteDoc, {
                title,
                description,
                deadlineDate
            })
        } catch (error) {
            console.error(error)
        }
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