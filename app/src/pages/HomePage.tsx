
import { useState } from "react";
import { Filter } from "../assets/Filter";
import Notes from "../components/notes/Notes";

export default function HomePage() {

  const [displayFilterOptions, setdisplayFilterOptions] = useState(false)

  return (
    <div className='flex flex-col m-5 gap-6'>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl">Home</h1>
        <button className="hover:border-light focus:border-light bg-dark rounded-md" onClick={() => setdisplayFilterOptions(!displayFilterOptions)}><Filter/></button>
      </div>
      <Notes displayFilterOptions={displayFilterOptions}/>
    </div>
  )
}
