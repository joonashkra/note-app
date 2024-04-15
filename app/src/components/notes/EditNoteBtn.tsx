
import { Link } from 'react-router-dom'
import { Note } from '../../types/Note'
import { Edit } from '../../assets/Edit';

type EditNoteBtnProps = {
    note: Note;
}

export default function EditNoteBtn({ note }: EditNoteBtnProps) {
  return (
    <Link to={`/note/${note.id}`} className='m-1'>
        <Edit/>
    </Link>
  )
}
