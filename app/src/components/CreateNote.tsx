import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import useNotesStore from "../stores/notesStore";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CreateNote() {

    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    const [noteDeadlineDate, setNoteDeadlineDate] = useState<Value>(new Date());
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const { getNotes } = useNotesStore();
    
    const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(e.target.value);
    }

    const handleNoteDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteDescription(e.target.value);
    }

    const currentDate = new Date();

    const formatDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const createNote = async () => {
        const notesRef = collection(db, "notes")
        try {
            await addDoc(notesRef, {
                title: noteTitle,
                description: noteDescription,
                noteCreationDate: formatDate(currentDate as Date),
                noteDeadlineDate: formatDate(noteDeadlineDate as Date),
                checked: false
            }) 
            getNotes()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex flex-col w-max m-10 items-start'>
            <input onChange={handleNoteTitle} className="p-1" placeholder='Title...' />
            <input onChange={handleNoteDescription} className="p-1" placeholder='Description...' />
            <input value={formatDate(noteDeadlineDate as Date)} onClick={() => setDisplayCalendar(!displayCalendar)} readOnly />
            <Calendar className={displayCalendar ? "text-black" : "hidden"} onChange={setNoteDeadlineDate} value={noteDeadlineDate} />
            <button onClick={createNote}>Create</button>
        </div>
    );
}
