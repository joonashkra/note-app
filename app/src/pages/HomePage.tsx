import CreateNote from "../components/CreateNote";
import Notes from "../components/Notes";


export default function HomePage() {

  return (
    <div className='flex flex-col w-max m-10 gap-5'>
      <h1>HomePage</h1>
      <Notes/>
      <CreateNote/>
    </div>
  )
}
