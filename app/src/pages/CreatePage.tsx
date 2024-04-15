
import CreateNote from '../components/notes/CreateNote'

export default function CreatePage() {
  return (
    <div className='flex flex-col m-6'>
      <h1 className="text-3xl mb-5">Create a New Note</h1>
      <CreateNote />
    </div>
  )
}
