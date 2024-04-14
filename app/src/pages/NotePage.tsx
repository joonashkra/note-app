import { useParams } from 'react-router-dom';
import DeleteNote from '../components/notes/DeleteNote';
import UpdateNote from '../components/notes/UpdateNote';
import { Link } from "react-router-dom"
export default function NotePage() {

  const { id } = useParams();

  return (
    <div>
        <h1>Note: {id}</h1>
        <UpdateNote noteId={id as string}/>
        <DeleteNote noteId={id as string}/>
        <Link to="/">Go Back Home</Link>
    </div>
  )
}
