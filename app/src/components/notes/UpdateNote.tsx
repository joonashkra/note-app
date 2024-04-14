import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNotesStore } from "../../stores/notesStore";
import CheckNote from "./CheckNote";
import { formatDate } from "../../utils/dateUtil";

type UpdateNoteProps = {
  noteId: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UpdateNote({ noteId }: UpdateNoteProps) {
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteDescription, setNewNoteDescription] = useState("");
    const [newNoteDeadlineDate, setNewNoteDeadlineDate] = useState<Value>(new Date());
    const [displayCalendar, setDisplayCalendar] = useState(false);
    const { updateNote, getNote, note, loading } = useNotesStore((state) => ({ updateNote: state.updateNote, getNote: state.getNote, note: state.note, loading: state.loading }));

    useEffect(() => {
      getNote(noteId)
    }, [getNote, noteId])

    useEffect(() => {
      if (note) {
        setNewNoteTitle(note.title)
        setNewNoteDescription(note.description)
        const dateStr = note.deadlineDate
        setNewNoteDeadlineDate(new Date(dateStr))
      }
    }, [note])
    
    const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const confirmUpdate = window.confirm("Do you wish to apply these changes permanently?")
        if(confirmUpdate) {
          const formattedDeadlineDate = formatDate(newNoteDeadlineDate as Date);
          await updateNote(noteId, newNoteTitle, newNoteDescription, formattedDeadlineDate);
          window.location.reload()
        }
    }

    if(loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleUpdateNote} className='flex flex-col w-max items-start gap-2'>
      <input value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} className="p-1" placeholder='Title...' />
      <input value={newNoteDescription} onChange={(e) => setNewNoteDescription(e.target.value)} className="p-1" placeholder='Description...' />
      <input value={formatDate(newNoteDeadlineDate as Date)} onClick={() => setDisplayCalendar(!displayCalendar)} readOnly />
      <Calendar className={displayCalendar ? "text-black" : "hidden"} onChange={setNewNoteDeadlineDate} value={newNoteDeadlineDate} />
      <CheckNote noteId={note?.id as string} noteChecked={note?.checked as boolean}/>
      <button type="submit">Update</button>
    </form>
  )
}
