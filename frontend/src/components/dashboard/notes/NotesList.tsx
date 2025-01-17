import { useNavigate } from "react-router-dom";
import NoteCard from "./NoteCard";
import NotFound from "../../general/NotFound";
import noteService from "../../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../pages/Loading";

export default function NotesList() {
  const navigate = useNavigate();

  const { data: notes, isLoading } = useQuery({
    queryFn: () => noteService.getAll(),
    queryKey: ["notes"],
  });

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

  return (
    <ul className="notesList">
      {sortedNotes.map((note) => (
        <li key={note.id} onClick={() => navigate(`notes/${note.id}`)}>
          <NoteCard note={note} layout="compact" />
        </li>
      ))}
    </ul>
  );
}
