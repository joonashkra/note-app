import { useLocation, useNavigate } from "react-router-dom";
import { useNotesStore } from "../../stores/notesStore";
import { Trash } from "../../assets/Trash";

type DeleteNoteProps = {
  noteId: string;
}

export default function DeleteNote({ noteId }: DeleteNoteProps) {

  const deleteNote = useNotesStore((state) => state.deleteNote)
  const navigate = useNavigate()
  const location = useLocation()

  const handleDeleteNote = () => {
    const confirmDelete = window.confirm("Do you wish to permanently delete this note?");
    if (confirmDelete) {
        deleteNote(noteId as string);
        if (navigate && location.pathname !== '/') {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }
  }

  if (location.pathname === '/') {
    return <div onClick={handleDeleteNote} className="hover:cursor-pointer"><Trash/></div>
  }

  return (
    <button title="Delete Note" onClick={handleDeleteNote} className="hover:border-red focus:border-light bg-dark rounded-md w-max" type="button"><Trash/></button>
  )
}