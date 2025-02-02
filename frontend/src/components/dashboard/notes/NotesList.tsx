import NoteCard from "./NoteCard";
import NotFound from "../../general/NotFound";
import Loading from "../../../pages/Loading";
import { Note } from "../../../types/notes";

interface NotesListProps {
  layout: "full" | "compact";
  notes: Note[] | undefined;
  isLoading: boolean;
}

export default function NotesList({
  layout,
  notes,
  isLoading,
}: NotesListProps) {
  if (isLoading) return <Loading />;

  if (notes && notes.length < 1)
    return <NotFound text="No notes yet" size={50} color="#FFFFFF" />;

  if (notes === undefined)
    return (
      <NotFound
        text="Unexpected error when fetching notes"
        size={24}
        color="#FFFFFF"
      />
    );

  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime(),
  );

  if (layout === "compact")
    return (
      <ul className="notesListCompact">
        {sortedNotes.map((note) => (
          <li key={note.id} data-testid="notesListItem">
            <NoteCard note={note} layout={layout} />
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="notesList">
      {sortedNotes.map((note) => (
        <li key={note.id} data-testid="notesListItem">
          <NoteCard note={note} layout={layout} />
        </li>
      ))}
    </ul>
  );
}
