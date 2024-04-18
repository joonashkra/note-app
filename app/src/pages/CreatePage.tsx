
import CreateNote from '../components/notes/CreateNote'

export default function CreatePage() {
  return (
    <div className='flex flex-col m-5'>
      <h1 className="text-3xl mb-5">Create a new note</h1>
      <CreateNote />
    </div>
  )
}
