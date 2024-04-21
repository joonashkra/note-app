import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNotesStore } from "../../stores/notesStore";
import CheckNote from "./CheckNote";
import { formatDate } from "../../utils/dateUtil";
import DeleteNote from "./DeleteNote";
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
    <form onSubmit={handleUpdateNote} className='flex flex-col gap-6 w-full sm:items-center'>
      <div className="flex flex-col gap-2 lg:w-1/3 md:w-1/2 sm:w-full">
        <h1 className="text-3xl mb-3">Edit Note</h1>
        <label htmlFor="title" className="text-xl">New Title</label>
        <input maxLength={20} value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark" placeholder='Write a title for note...' required/>
        <label htmlFor="description" className="text-xl">New Description</label>
        <textarea rows={4} maxLength={250} value={newNoteDescription} onChange={(e) => setNewNoteDescription(e.target.value)} className="p-2 rounded-sm shadow-sm shadow-dark bg-dark focus:border-black" placeholder='Write a description for note...' required/>
      </div>
      <div title="Pick a deadline date for note." className="flex flex-col gap-2 lg:w-1/3 md:w-1/2 sm:w-full">
        <label htmlFor="deadline" className="text-xl">New Deadline Date</label>
        <Calendar onChange={setNewNoteDeadlineDate} value={newNoteDeadlineDate} minDate={new Date()}/>
      </div>
      <div title="Set Checked" className="flex flex-row justify-between sm:justify-start items-center gap-2 lg:w-1/3 md:w-1/2 sm:w-full">
        <p>Mark as Done:</p>
        <CheckNote noteId={noteId} noteChecked={noteChecked}/>
      </div>
      <div className="flex flex-row justify-between items-center lg:w-1/3 md:w-1/2 sm:w-full">
        <button title="Save Changes" className="hover:text-light hover:border-light focus:border-light bg-dark rounded-md w-max flex gap-2" type="submit">Save</button>
        <div className="flex flex-row gap-2">
          <DeleteNote noteId={noteId}/>
          <Link to="/"><button title="Cancel" className="text-white hover:text-red hover:border-red focus:border-red bg-dark rounded-md" type="button">Cancel</button></Link>
        </div>
      </div>
    </form>
  )
}
