import { useParams } from 'react-router-dom';
import UpdateNote from '../components/notes/UpdateNote';
export default function NotePage() {

  const { id } = useParams();

  return (
    <div className='flex flex-col m-5'>
        <h1 className="text-3xl mb-5">Update Note</h1>
        <UpdateNote noteId={id as string}/>
    </div>
  )
}
