import { Note } from "../../types/notes";
import NoDataCard from "../NoDataCard";
import NoteCard from "./NoteCard";

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  if (notes.length < 1) return <NoDataCard error={false} />;
  if (notes === undefined) return <NoDataCard error={true} />;

  return (
    <ul className="notesList">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteCard note={note} layout="compact" />
        </li>
      ))}
    </ul>
  );
}
