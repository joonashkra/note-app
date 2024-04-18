import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNotesStore } from "../../stores/notesStore";
import CheckNote from "./CheckNote";
import { formatDate } from "../../utils/dateUtil";
import DeleteNote from "./DeleteNote";
import { Save } from "../../assets/Save";
import { Cancel } from "../../assets/Cancel";
import { Link, useNavigate } from "react-router-dom";

type UpdateNoteProps = {
  noteId: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function UpdateNote({ noteId }: UpdateNoteProps) {
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteDescription, setNewNoteDescription] = useState("");
    const [newNoteDeadlineDate, setNewNoteDeadlineDate] = useState<Value>(new Date());
    const [noteChecked, setNoteChecked] = useState(false)
    const { updateNote, getNote, note, loading } = useNotesStore((state) => ({ updateNote: state.updateNote, getNote: state.getNote, note: state.note, loading: state.loading }));
    const navigate = useNavigate()

    useEffect(() => {
      getNote(noteId)
      useNotesStore.setState({ newNote: null })
    }, [getNote, noteId])

    useEffect(() => {
      if (note) {
        setNewNoteTitle(note.title)
        setNewNoteDescription(note.description)
        const dateStr = note.deadlineDate
        setNewNoteDeadlineDate(new Date(dateStr))
        setNoteChecked(note.checked)
      }
    }, [note])
    
    const handleUpdateNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const confirmUpdate = window.confirm("Do you wish to apply these changes permanently?")
        if(confirmUpdate) {
          const formattedDeadlineDate = formatDate(newNoteDeadlineDate as Date);
          await updateNote(noteId, newNoteTitle, newNoteDescription, formattedDeadlineDate);
          navigate("/")
        }
    }

    if(loading) return <div>Loading...</div>

  return (
    <form onSubmit={handleUpdateNote} className='flex flex-col gap-6'>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-xl">New Title</label>
        <input maxLength={21} value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder='Write a title for note...' required/>
        <label htmlFor="description" className="text-xl">New Description</label>
        <textarea rows={3} maxLength={200} value={newNoteDescription} onChange={(e) => setNewNoteDescription(e.target.value)} className="p-2 rounded-sm shadow-sm shadow-dark bg-dark focus:border-black" placeholder='Write a description for note...' required/>
      </div>
      <div title="Pick a deadline date for note." className="flex flex-col gap-2">
        <label htmlFor="deadline" className="text-xl">New Deadline Date</label>
        <Calendar onChange={setNewNoteDeadlineDate} value={newNoteDeadlineDate} minDate={new Date()}/>
      </div>
      <div title="Set Checked" className="flex flex-row gap-2 items-center">
        <p>Done:</p>
        <CheckNote noteId={noteId} noteChecked={noteChecked}/>
      </div>
      <div className="flex flex-row justify-between items-center">
        <button title="Save Changes" className="hover:border-light focus:border-light bg-dark rounded-md w-max" type="submit"><Save/></button>
        <div className="flex flex-row gap-2">
          <button title="Delete Note" className="hover:border-light focus:border-light bg-dark rounded-md w-max" type="button"><DeleteNote noteId={noteId}/></button>
          <Link to="/"><button title="Cancel" className="hover:border-light focus:border-light bg-dark rounded-md" type="button"><Cancel/></button></Link>
        </div>
      </div>
    </form>
  )
}
