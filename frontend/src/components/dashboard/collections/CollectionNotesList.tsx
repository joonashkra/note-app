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
    <ul className="notesToAddList">
      {notes.map((note) => (
        <li key={note.id} className="noteToAdd">
          {note.title}
          <div
            className="removeSelection"
            onClick={() => removeNoteSelection(note.id)}
          >
            <Uncheck size={15} />
          </div>
        </li>
      ))}
      {notes.length < 1 && <NotFound size={50} text="No notes yet" />}
    </ul>
  );
}
