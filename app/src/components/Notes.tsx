import { useEffect, useState } from "react";
import useNotesStore from "../stores/notesStore";
import { Link } from "react-router-dom";

export default function Notes() {

    const { notes, getNotes } = useNotesStore();

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div className='flex flex-col w-max m-10'>
            {notes.map(note => (
                <div className="mb-8" key={note.id}>
                    <h2>Title: {note.title}</h2>
                    <p>ID: {note.id}</p>
                    <p>Description: {note.description}</p>
                    <p>Created: {note.creationDate}</p>
                    <p>Deadline: {note.deadlineDate}</p>
                    <p>Checked: {note.checked ? 'Yes' : 'No'}</p>
                    <Link to={`/note/${note.id}`}>Edit</Link>
                </div>
            ))}
        </div>
    )
}
