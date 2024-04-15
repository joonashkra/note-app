import { useEffect, useState } from "react"
import { useNotesStore } from "../../stores/notesStore"
import { X } from "../../assets/X";
import { Check } from "../../assets/Check";

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
        <div className="mt-0.5">
            <input id="checked" type="checkbox" onChange={handleChecked} checked={checked} className="hover:cursor-pointer absolute peer shrink-0 appearance-none w-6 h-6 bg-black/40 rounded-2xl checked:opacity-0 transition-all ease-in-out duration-1000"/>
            {checked ? <Check /> : <X/>}
        </div>
    )
}