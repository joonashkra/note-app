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
    deleteNote(noteId as string)
    setShowRedirectMessage(true)
    if (navigate && location.pathname !== '/') {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }
  }

  return (
    <div>
        <button onClick={handleDeleteNote}>Delete</button>
        <p className={showRedirectMessage ? "" : "hidden"}>Note Deleted. Going back home...</p>
    </div>
  )
}