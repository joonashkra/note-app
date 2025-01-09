import { useState } from "react";
import { Filter } from "../assets/Filter";
import Notes from "../components/notes/Notes";
import FilterNotes from "../components/notes/FilterNotes";
import { useNotesStore } from "../stores/notesStore";

export default function HomePage() {
  const [displayFilterOptions, setdisplayFilterOptions] = useState(false);
  const [sortOption, setSortOption] = useState("deadline");
  const [showCompleted, setShowCompleted] = useState(true);
  const getNotes = useNotesStore((state) => state.getNotes);

  const handleSortOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleShowCompleted = () => {
    getNotes();
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="flex flex-col m-5 sm:gap-6 gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl">Home</h1>
        <button
          className="hover:border-light focus:border-light bg-dark rounded-md sm:hidden"
          onClick={() => setdisplayFilterOptions(!displayFilterOptions)}
        >
          <Filter />
        </button>
        <div className="hidden sm:flex">
          <FilterNotes
            displayFilterOptions={displayFilterOptions}
            sortOption={sortOption}
            handleSortOption={handleSortOption}
            showCompleted={showCompleted}
            handleShowCompleted={handleShowCompleted}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="sm:hidden flex">
          <FilterNotes
            displayFilterOptions={displayFilterOptions}
            sortOption={sortOption}
            handleSortOption={handleSortOption}
            showCompleted={showCompleted}
            handleShowCompleted={handleShowCompleted}
          />
        </div>
        <Notes showCompleted={showCompleted} sortOption={sortOption} />
      </div>
    </div>
  );
}
