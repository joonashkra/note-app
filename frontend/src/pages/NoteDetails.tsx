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
import AddToCollectionBtn from "../components/dashboard/notes/AddToCollectionBtn";
import collectionService from "../services/collectionService";

export default function NoteDetails() {
  const { id = "" } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const { data: note } = useQuery({
    queryFn: () => noteService.getOne(id),
    queryKey: ["note"],
  });

  const { data: collections, isLoading } = useQuery({
    queryFn: () => collectionService.getAll(),
    queryKey: ["collections"],
  });

  if (isLoading) return <Loading />;

  if (!note)
    return <NotFound text="Note not found." size={50} color="#FFFFFF" />;

  if (!collections)
    return <NotFound text="Collections not found." size={50} color="#FFFFFF" />;

  return (
    <main className="noteDetailsPage" data-testid="noteDetailsPage">
      <div
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        data-testid="noteTitleDiv"
      >
        <h1>{note.title}</h1>
        {note.checked && <Check size={30} color="#FFFFFF" />}
      </div>
      <NoteCard note={note} layout="full" />
      <div className="noteButtons">
        <div className="noteActionButtons">
          <CheckNoteButton note={note} setErrorMsg={setErrorMsg} />
          <AddToCollectionBtn
            collections={collections}
            note={note}
            setErrorMsg={setErrorMsg}
          />
        </div>
        <div className="noteActionButtons">
          <ToggleUpdateButton note={note} />
          <DeleteNoteButton note={note} setErrorMsg={setErrorMsg} />
        </div>
      </div>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </main>
  );
}
