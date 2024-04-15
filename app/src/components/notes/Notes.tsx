import { useEffect } from "react";
import DeleteNote from "./DeleteNote";
import CheckNote from "./CheckNote";
import { useNotesStore } from "../../stores/notesStore";
import EditNoteBtn from "./EditNoteBtn";

export default function Notes() {

    const { notes, getNotes, loading } = useNotesStore((state) => ({ notes: state.notes, getNotes: state.getNotes, loading: state.loading}))

    useEffect(() => {
        getNotes()
    }, [getNotes])

    if(loading) return <div>Loading...</div>

    return (
        <div>
            {notes.map(note => (
                <div className="mb-8 p-3 bg-dark rounded-md" key={note.id}>
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
                        <div className="flex flex-row gap-2">
                            <p>Done:</p>
                            <CheckNote noteId={note.id} noteChecked={note.checked}/>
                        </div>
                        <div className="flex flex-row">
                            <DeleteNote noteId={note.id} />
                        </div>
                    </div>
                    
                </div>
            ))}
        </div>
    )
}
