import { create } from 'zustand'
import { Note } from '../model/Note'
import { getDocs, collection, addDoc, DocumentReference, getDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

interface NotesState {
  notes: Note[];
  loading: boolean;
  getNotes: () => Promise<void>;
  createNote: (title: string, description: string, deadlineDate: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const notesStore = create<NotesState>()((set) => ({
    notes: [],

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

    createNote: async (title, description, deadlineDate) => {
        const notesRef = collection(db, "notes")

        const formatDate = (date: Date) => {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        const creationDate = formatDate(new Date())

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

                const { notes } = notesStore.getState()

                set({ notes: [...notes, newNote] })
            }

        } catch (error) {
            console.error(error)
        }
    },

    deleteNote: async (id) => {
        const noteDoc = doc(db, "notes", id)
        const { notes } = notesStore.getState()
        try {
            await deleteDoc(noteDoc)
            set({ notes: notes.filter(note => note.id !== id) })
        } catch (error) {
            console.log(error)
        }
    }

}))


export default notesStore