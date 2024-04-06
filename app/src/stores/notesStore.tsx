import { create } from 'zustand'
import { Note } from '../model/Note'
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

interface NotesState {
  notes: Note[];
  getNotes: () => void;
}

const useNotesStore = create<NotesState>()((set) => ({
    notes: [],

    getNotes: async () => {
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
    }

}))

export default useNotesStore;