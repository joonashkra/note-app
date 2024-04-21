import { useParams } from 'react-router-dom';
import UpdateNote from '../components/notes/UpdateNote';
export default function NotePage() {

  const { id } = useParams();

  return (
    <div className='flex flex-col m-5'>
        <UpdateNote noteId={id as string}/>
    </div>
  )
}
