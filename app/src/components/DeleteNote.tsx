import { useLocation, useNavigate } from "react-router-dom";
import notesStore from "../stores/notesStore";
import { useState } from "react";

export default function DeleteNote({ noteId }: { noteId: string }) {

  const { deleteNote } = notesStore()
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