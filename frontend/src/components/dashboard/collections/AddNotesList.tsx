import NoteCard from "../notes/NoteCard";
import NotFound from "../../general/NotFound";
import { Note } from "../../../types/notes";
import Loading from "../../../pages/Loading";
import noteService from "../../../services/noteService";
import { useQuery } from "@tanstack/react-query";

interface AddNotesListProps {
  setNotesToAdd: (notes: Note[]) => void;
  notesToAdd: Note[];
}

export default function AddNotesList({
  notesToAdd,
  setNotesToAdd,
}: AddNotesListProps) {
  const { data: notes, isLoading } = useQuery({
    queryFn: () => noteService.getAll(),
    queryKey: ["notes"],
  });

  if (notes === undefined)
    return (
      <NotFound
        text="Unexpected error when fetching notes"
        size={24}
        color="#FFFFFF"
      />
    );

  console.log(notes);

  const availableNotes = notes.filter(
    (note) => !notesToAdd.some((n) => n.id === note.id),
  );

  if (availableNotes && availableNotes.length < 1)
    return <NotFound text="No available notes." size={50} color="#FFFFFF" />;

  if (isLoading) return <Loading />;

  return (
    <ul className="notesListCompact">
      {availableNotes.map((note) => (
        <li
          key={note.id}
          onClick={() => setNotesToAdd(notesToAdd.concat(note))}
          data-testid="notesListItem"
          className="noteSelectionItem"
        >
          <NoteCard note={note} layout="compact" />
        </li>
      ))}
    </ul>
  );
}
