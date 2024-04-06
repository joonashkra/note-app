
import { useParams } from 'react-router-dom'

export default function NotePage() {

    const { id } = useParams();

  return (
    <div>
        <h1>Note: {id}</h1>
    </div>
  )
}
