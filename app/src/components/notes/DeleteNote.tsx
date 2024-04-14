import { useLocation, useNavigate } from "react-router-dom";
import { useNotesStore } from "../../stores/notesStore";
import { useState } from "react";

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
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5ebbe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        <p className={showRedirectMessage ? "" : "hidden"}>Note Deleted. Going back home...</p>
    </div>
  )
}