import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import { Link } from "react-router-dom";
import DeleteNote from "./DeleteNote";
import CheckNote from "./CheckNote";

export default function Notes() {

    const { notes, getNotes, loading } = notesStore();

    useEffect(() => {
        getNotes()
    }, [getNotes])

    if(loading) return <div>Loading...</div>

    return (
        <div>
            {notes.map(note => (
                <div className="mb-8" key={note.id}>
                    <h2>Title: {note.title}</h2>
                    <p>ID: {note.id}</p>
                    <p>Description: {note.description}</p>
                    <p>Created: {note.creationDate}</p>
                    <p>Deadline: {note.deadlineDate}</p>
                    <CheckNote noteId={note.id} noteChecked={note.checked}/>
                    <Link to={`/note/${note.id}`}>Edit</Link>
                    <DeleteNote noteId={note.id} />
                </div>
            ))}
        </div>
    )
}
