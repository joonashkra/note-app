import { useEffect } from "react";
import DeleteNote from "./DeleteNote";
import CheckNote from "./CheckNote";
import { useNotesStore } from "../../stores/notesStore";
import EditNoteBtn from "./EditNoteBtn";
import { sortNotes } from "../../utils/sortUtil";
import { Link } from "react-router-dom";

type NotesProps = {
    showCompleted: boolean;
    sortOption: string;
}


export default function Notes({ showCompleted, sortOption}: NotesProps) {

    const { notes, loading, newNote, getNotes } = useNotesStore((state) => ({ notes: state.notes, getNotes: state.getNotes, loading: state.loading, newNote: state.newNote}))

    useEffect(() => {
        getNotes()
    }, [getNotes])

    useEffect(() => {
        if (newNote && !loading) {
            const element = document.getElementById(newNote as string);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                console.error("Element not found:", newNote);
            }
        }
    }, [newNote, loading]);

    const filteredNotes = showCompleted ? notes : notes.filter(note => !note.checked);

    if(loading) return <div>Loading...</div>

    return (
        <div className="flex flex-col gap-5">
            {notes.length < 1 && <div><p>No notes yet.</p><Link to="/create" className="hover:text-light/80">Click here to start adding notes!</Link></div>}
            {sortNotes(filteredNotes, sortOption).map(note => (
                <div className={`p-3 bg-dark rounded-sm ${newNote && newNote === note.id ? "animate-flash" : ""}`} key={note.id} id={note.id}>
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl">{note.title}</h2>
                        <EditNoteBtn note={note} />
                    </div>
                    <hr className="my-3"/>
                    <div className="flex flex-col mb-4 m-1">
                        <p className="mb-4">Description: <br/> {note.description}</p>
                        <p>Created: {note.creationDate}</p>
                        <p>Deadline: {note.deadlineDate}</p>
                    </div>
                    <div className="flex flex-row justify-between m-1">
                        <div title="Set Checked" className="flex flex-row gap-2 items-center">
                            <p>Done:</p>
                            <CheckNote noteId={note.id} noteChecked={note.checked}/>
                        </div>
                        <div title="Delete Note" className="flex flex-row">
                            <DeleteNote noteId={note.id} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
