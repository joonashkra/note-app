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
            <input id="checked" type="checkbox" onChange={handleChecked} checked={checked} className="hover:cursor-pointer absolute peer shrink-0 appearance-none w-6 h-6 border-2 bg-black/40 border-light rounded-2xl checked:opacity-0 transition-all ease-in-out duration-500"/>
            <svg className={`absolute w-6 h-6 pointer-events-none ${checked ? 'block' : 'hidden'} hover:cursor-pointer`} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 23 23" fill="none" stroke="#5ebbe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
    )
}