
import { Link } from 'react-router-dom'
import { Note } from '../../types/Note'

type EditNoteBtnProps = {
    note: Note;
}

export default function EditNoteBtn({ note }: EditNoteBtnProps) {
  return (
    <Link to={`/note/${note.id}`} className='m-1'>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5ebbe6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
    </Link>
  )
}
