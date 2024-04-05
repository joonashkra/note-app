import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import firebase from "firebase/compat/app";

interface Note {
    id: string;
    title: string;
    description: string;
    creationDate: firebase.firestore.Timestamp; 
    deadlineDate: firebase.firestore.Timestamp; 
    checked: boolean;
}

export default function HomePage() {

  const [notes, setNotes] = useState<Note[]>([]);

  const notesRef = collection(db, "notes")

  useEffect(() => {
    const getNotes = async () => {
      try {
        const data = await getDocs(notesRef)
        const filteredData: Note[] = data.docs.map((doc) => ({
          ...(doc.data() as Note),
          id: doc.id
        }))
        console.log({filteredData})
        setNotes(filteredData)
      } catch (error) {
        console.error(error)
      }
    }
    getNotes()
  }, [notes])

  const timestampToDate = (timestamp: firebase.firestore.Timestamp) => {
    const date = timestamp.toDate();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div>
      <h1>HomePage</h1>
      {notes.map(note => (
          <div key={note.id}>
            <h2>Title: {note.title}</h2>
            <p>Description: {note.description}</p>
            <p>Created: {timestampToDate(note.creationDate)}</p>
            <p>Deadline: {timestampToDate(note.deadlineDate)}</p>
            <p>Checked: {note.checked ? 'Yes' : 'No'}</p>
          </div>
        ))}
    </div>
  )
}
