import { useParams } from 'react-router-dom';
import DeleteNote from '../components/DeleteNote';
import UpdateNote from '../components/UpdateNote';
export default function NotePage() {

  const { id } = useParams();

  return (
    <div>
        <h1>Note: {id}</h1>
        <UpdateNote />
        <DeleteNote noteId={id as string}/>
    </div>
  )
}
