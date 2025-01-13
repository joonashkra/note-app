import { useParams } from "react-router-dom";
import noteService from "../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NoteCard from "../components/dashboard/notes/NoteCard";
import NotFound from "../components/general/NotFound";
import Loading from "./Loading";
import DeleteNoteButton from "../components/dashboard/notes/DeleteNoteButton";
import { useState } from "react";
import CheckNoteButton from "../components/dashboard/notes/CheckNoteButton";

export default function NoteDetails() {
  const { id = "" } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

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
      <div className="noteActions">
        <CheckNoteButton note={note} setErrorMsg={setErrorMsg} />
        <DeleteNoteButton noteId={note.id} setErrorMsg={setErrorMsg} />
      </div>
      {errorMsg && <p>{errorMsg}</p>}
    </div>
  );
}
