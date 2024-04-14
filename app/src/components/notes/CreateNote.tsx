import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNotesStore } from "../../stores/notesStore";
import { formatDate } from "../../utils/dateUtil";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CreateNote() {

    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    const [noteDeadlineDate, setNoteDeadlineDate] = useState<Value>(new Date());
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const createNote = useNotesStore((state) => state.createNote);

    const creationDate = formatDate(new Date())

    const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formattedDeadlineDate = formatDate(noteDeadlineDate as Date);
        createNote(noteTitle, noteDescription, creationDate, formattedDeadlineDate);
    }

    return (
        <form onSubmit={handleCreateNote} className='flex flex-col w-max items-start gap-2'>
            <label>Note Info:</label>
            <input name="title" onChange={(e) => setNoteTitle(e.target.value)} className="p-1" placeholder='Title...' />
            <input name="description" onChange={(e) => setNoteDescription(e.target.value)} className="p-1" placeholder='Description...' />
            <label>Enter deadline date:</label>
            <input name="deadline" value={formatDate(noteDeadlineDate as Date)} onClick={() => setDisplayCalendar(!displayCalendar)} readOnly />
            <Calendar className={displayCalendar ? "text-black" : "hidden"} onChange={setNoteDeadlineDate} value={noteDeadlineDate} />
            <button type="submit">Create</button>
        </form>
    );
}
