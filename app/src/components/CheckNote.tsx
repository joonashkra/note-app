import { useEffect, useState } from "react"
import notesStore from "../stores/notesStore"

export default function CheckNote({ noteId, noteChecked }: { noteId: string, noteChecked: boolean }) {

    const { checkNote } = notesStore()
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
