import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useNotesStore } from "../../stores/notesStore";
import { formatDate } from "../../utils/dateUtil";
import "./CalendarStyle.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CreateNote() {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteDeadlineDate, setNoteDeadlineDate] = useState<Value>(new Date());
  const createNote = useNotesStore((state) => state.createNote);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    useNotesStore.setState({ newNote: null });
  }, []);

  const creationDate = formatDate(new Date());

  const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formattedDeadlineDate = formatDate(noteDeadlineDate as Date);
    createNote(noteTitle, noteDescription, creationDate, formattedDeadlineDate);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleCreateNote}
      className="flex flex-col gap-6 w-full sm:items-center"
    >
      <div className="flex flex-col gap-2 lg:w-1/3 md:w-1/2 sm:w-full">
        <h1 className="text-3xl mb-4">Create a new note</h1>
        <label htmlFor="title" className="text-xl">
          Title
        </label>
        <input
          maxLength={20}
          ref={inputRef}
          name="title"
          onChange={(e) => setNoteTitle(e.target.value)}
          className="p-2 mb-1 rounded-sm shadow-sm shadow-dark bg-dark"
          placeholder="Write a title for note..."
          required
        />
        <label htmlFor="description" className="text-xl">
          Description
        </label>
        <textarea
          maxLength={250}
          name="description"
          onChange={(e) => setNoteDescription(e.target.value)}
          rows={4}
          className="p-2 rounded-sm shadow-sm shadow-dark bg-dark focus:border-black"
          placeholder="Write a description for note..."
          required
        />
      </div>
      <div
        title="Pick a deadline date for note."
        className="flex flex-col gap-2 lg:w-1/3 md:w-1/2 sm:w-full"
      >
        <label htmlFor="deadline" className="text-xl">
          Deadline date
        </label>
        <Calendar
          onChange={setNoteDeadlineDate}
          value={noteDeadlineDate}
          minDate={new Date()}
        />
      </div>
      <div className="flex flex-row justify-between items-center lg:w-1/3 md:w-1/2 sm:w-full">
        <button
          title="Create Note"
          className="hover:border-light hover:text-light bg-dark rounded-md"
          type="submit"
        >
          Create
        </button>
        <Link to="/" className="hover:text-white text-white">
          <button
            title="Cancel"
            className="hover:border-red hover:text-red focus:border-light bg-dark rounded-md"
            type="button"
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
}
