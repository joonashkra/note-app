import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useNotesStore } from "../../stores/notesStore";
import { formatDate } from "../../utils/dateUtil";
import './CalendarStyle.css'
import { Link } from "react-router-dom";
import { Cancel } from "../../assets/Cancel";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CreateNote() {

    const [noteTitle, setNoteTitle] = useState("");
    const [noteDescription, setNoteDescription] = useState("");
    const [noteDeadlineDate, setNoteDeadlineDate] = useState<Value>(new Date());
    const createNote = useNotesStore((state) => state.createNote);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const creationDate = formatDate(new Date())

    const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formattedDeadlineDate = formatDate(noteDeadlineDate as Date);
        createNote(noteTitle, noteDescription, creationDate, formattedDeadlineDate);
    }

    return (
        <form onSubmit={handleCreateNote} className='flex flex-col gap-5'>
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-xl">Title</label>
                <input maxLength={21} ref={inputRef} name="title" onChange={(e) => setNoteTitle(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder='Write a title for note...' required/>
                <label htmlFor="description" className="text-xl">Description</label>
                <textarea maxLength={200} name="description" onChange={(e) => setNoteDescription(e.target.value)} rows={4} className="p-2 rounded-sm shadow-sm shadow-dark bg-dark focus:border-black" placeholder='Write a description for note...' required/>
            </div>
            <div title="Pick a deadline date for note." className="flex flex-col gap-2">
                <label htmlFor="deadline" className="text-xl">Deadline date</label>
                <Calendar onChange={setNoteDeadlineDate} value={noteDeadlineDate} minDate={new Date()}/>
            </div>
            <div className="flex flex-row justify-between items-center">
                <button title="Create Note" className="hover:border-light focus:border-light bg-dark rounded-md" type="submit">Create</button>
                <Link to="/"><button title="Cancel" className="hover:border-light focus:border-light bg-dark rounded-md" type="button"><Cancel/></button></Link>
            </div>
        </form>
    );
}