import Uncheck from "../../../assets/Uncheck";
import { Note } from "../../../types/notes";
import NotFound from "../../general/NotFound";

interface CollectionNotesListProps {
  notes: Pick<Note, "id" | "title">[];
  removeNoteSelection: (noteId: string) => void;
}

export default function CollectionNotesList({
  notes,
  removeNoteSelection,
}: CollectionNotesListProps) {
  return (
    <ul className="noteToAddList">
      {notes.map((note) => (
        <li key={note.id} className="noteToAdd">
          {note.title}
          <div
            className="removeSelection"
            onClick={() => removeNoteSelection(note.id)}
          >
            <Uncheck color="#e04343" size={15} />
          </div>
        </li>
      ))}
      {notes.length < 1 && (
        <NotFound size={50} color="#F0F0F0" text="No notes yet." />
      )}
    </ul>
  );
}
