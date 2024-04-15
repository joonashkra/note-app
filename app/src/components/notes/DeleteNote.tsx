import { useLocation, useNavigate } from "react-router-dom";
import { useNotesStore } from "../../stores/notesStore";
import { useState } from "react";
import { Trash } from "../../assets/Trash";

type DeleteNoteProps = {
  noteId: string;
}

export default function DeleteNote({ noteId }: DeleteNoteProps) {

  const deleteNote = useNotesStore((state) => state.deleteNote)
  const navigate = useNavigate()
  const location = useLocation()
  const [showRedirectMessage, setShowRedirectMessage] = useState(false)

  const handleDeleteNote = () => {
    const confirmDelete = window.confirm("Do you wish to permanently delete this note?");
    if (confirmDelete) {
        deleteNote(noteId as string);
        setShowRedirectMessage(true);
        if (navigate && location.pathname !== '/') {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    }
}

  return (
    <div onClick={handleDeleteNote} className="hover:cursor-pointer">
        <Trash/>
        <p className={showRedirectMessage ? "" : "hidden"}>Note Deleted. Going back home...</p>
    </div>
  )
}