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
    const { createNote } = useNotesStore();
    
    const handleNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(e.target.value);
    }

    const handleNoteDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteDescription(e.target.value);
    }

    const formatDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formattedDeadlineDate = formatDate(noteDeadlineDate as Date);
        createNote(noteTitle, noteDescription, formattedDeadlineDate);
    }

    return (
        <form onSubmit={handleCreateNote} className='flex flex-col w-max items-start gap-2'>
            <input onChange={handleNoteTitle} className="p-1" placeholder='Title...' />
            <input onChange={handleNoteDescription} className="p-1" placeholder='Description...' />
            <input value={formatDate(noteDeadlineDate as Date)} onClick={() => setDisplayCalendar(!displayCalendar)} readOnly />
            <Calendar className={displayCalendar ? "text-black" : "hidden"} onChange={setNoteDeadlineDate} value={noteDeadlineDate} />
            <button type="submit">Create</button>
        </form>
    );
}
