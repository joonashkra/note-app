
import Notes from "../components/notes/Notes";


export default function HomePage() {

  return (
    <div className='flex flex-col m-6'>
      <h1 className="text-3xl mb-5">Home</h1>
      <Notes/>
    </div>
  )
}
