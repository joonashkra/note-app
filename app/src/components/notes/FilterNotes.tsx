type FilterNotesProps = {
    displayFilterOptions: boolean;
    sortOption: string;
    handleSortOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    showCompleted: boolean;
    handleShowCompleted: () => void;
}

export default function FilterNotes({ displayFilterOptions, sortOption, handleSortOption, showCompleted, handleShowCompleted }: FilterNotesProps) {
  return (
    <div className={`flex flex-col bg-dark p-2 rounded-lg w-full sm:flex-row sm:w-max sm:gap-4 ${!displayFilterOptions && "hidden sm:flex"}`}>
            <select value={sortOption} onChange={handleSortOption} className="bg-dark p-2 w-full">
                <option value="deadline" title="Sort by note deadline date in ascending order.">Sort by Deadline Date</option>
                <option value="recent" title="Sort by note creation date in descending order.">Sort by Newest</option>
                <option value="creation" title="Sort by note creation date in ascending order.">Sort by Oldest</option>
            </select>
            <div title="Show/Hide completed notes." className="flex flex-row gap-2 p-2 w-max">
                <label htmlFor="checkbox" className="whitespace-nowrap">Show completed notes:</label>
                <input type="checkbox" className="mt-1 accent-light " checked={showCompleted} onChange={handleShowCompleted}/>
            </div>
    </div>
  )
}