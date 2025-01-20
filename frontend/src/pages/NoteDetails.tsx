import { useParams } from "react-router-dom";
import noteService from "../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NoteCard from "../components/dashboard/notes/NoteCard";
import NotFound from "../components/general/NotFound";
import Loading from "./Loading";
import DeleteNoteButton from "../components/dashboard/notes/DeleteNoteButton";
import { useState } from "react";
import CheckNoteButton from "../components/dashboard/notes/CheckNoteButton";
import ToggleUpdateButton from "../components/dashboard/notes/ToggleUpdateButton";
import Check from "../assets/Check";

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
    <main className="noteDetailsPage" data-testid="noteDetailsPage">
      <div
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        data-testid="noteTitleDiv"
      >
        <h1>{note.title}</h1>
        {note.checked && <Check size={30} color="#FFFFFF" />}
      </div>
      <NoteCard note={note} layout="detailed" />
      <div className="noteButtons">
        <CheckNoteButton note={note} setErrorMsg={setErrorMsg} />
        <div className="noteActionButtons">
          <ToggleUpdateButton note={note} />
          <DeleteNoteButton note={note} setErrorMsg={setErrorMsg} />
        </div>
      </div>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </main>
  );
}
