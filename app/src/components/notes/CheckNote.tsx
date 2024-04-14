import { useEffect, useState } from "react"
import { useNotesStore } from "../../stores/notesStore"

type CheckNoteProps = {
    noteId: string;
    noteChecked: boolean;
}

export default function CheckNote({ noteId, noteChecked }: CheckNoteProps) {

    const checkNote = useNotesStore((state) => state.checkNote)
    const [checked, setChecked] = useState(noteChecked)

    useEffect(() => {
        if (noteChecked !== undefined) {
            setChecked(noteChecked)
        }
    }, [noteChecked])

    const handleChecked = () => {
        const newChecked = !checked
        setChecked(newChecked)
        checkNote(noteId, newChecked)
    }

    return (
        <div className="flex gap-2">
            <p>Completed: </p>
            <input type="checkbox" onChange={handleChecked} checked={checked}/>
        </div>
    )
}