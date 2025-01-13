import { useParams } from "react-router-dom";
import noteService from "../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NoteCard from "../components/dashboard/notes/NoteCard";
import NotFound from "../components/general/NotFound";
import Loading from "./Loading";

export default function NoteDetails() {
  const { id = "" } = useParams();

  const { data: note, isLoading } = useQuery({
    queryFn: () => noteService.getOne(id),
    queryKey: ["note"],
  });

  if (isLoading) return <Loading />;

  if (!note)
    return <NotFound text="Note not found." size={50} color="#FFFFFF" />;

  return (
    <div className="noteDetailsPage">
      <h1>Note {id}</h1>
      <NoteCard note={note} layout="detailed" />
    </div>
  );
}
