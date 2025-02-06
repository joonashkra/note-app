import { useParams } from "react-router-dom";
import noteService from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../../components/general/NotFound";
import Loading from "../Loading";
import DeleteNoteButton from "../../components/dashboard/notes/DeleteNoteButton";
import { useState } from "react";
import CheckNoteButton from "../../components/dashboard/notes/CheckNoteButton";
import AddToCollectionBtn from "../../components/dashboard/notes/AddToCollectionBtn";
import collectionService from "../../services/collectionService";
import ErrorMessage from "../../components/general/ErrorMessage";
import NoteDetails from "../../components/dashboard/notes/NoteDetails";
import RemoveFromCollection from "../../components/dashboard/notes/RemoveFromCollection";
import ToggleUpdateButton from "../../components/general/ToggleUpdateButton";
import Check from "../../assets/Check";
import GoBackButton from "../../components/general/GoBackButton";

export default function Note() {
  const { id = "" } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const { data: note, isLoading: isNoteLoading } = useQuery({
    queryFn: () => noteService.getOne(id),
    queryKey: ["note"],
  });

  const { data: collections, isLoading: isCollectionsLoading } = useQuery({
    queryFn: () => collectionService.getAll(),
    queryKey: ["collections"],
  });

  if (isNoteLoading || isCollectionsLoading) return <Loading />;

  if (!note) return <NotFound text="Note not found." size={50} />;

  if (!collections) return <NotFound text="Collections not found." size={50} />;

  const currentCollection =
    note.noteCollection !== null
      ? collections.find(
          (collection) => collection.id === note.noteCollection.id,
        )
      : null;

  return (
    <main className="notePage" data-testid="notePage">
      <GoBackButton text="Back to Dashboard" route="/dashboard" />
      <section
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        data-testid="noteTitleDiv"
        className="noteTitleDiv"
      >
        <h1>{note.title}</h1>
        {note.checked && <Check size={30} />}
      </section>
      <div>
        <NoteDetails note={note} />
        <ErrorMessage text={errorMsg} />
      </div>
      <div className="noteActions">
        <CheckNoteButton note={note} setErrorMsg={setErrorMsg} />
        <ToggleUpdateButton data={note} />
        <DeleteNoteButton note={note} setErrorMsg={setErrorMsg} />
      </div>
      {currentCollection && (
        <RemoveFromCollection
          collection={currentCollection}
          noteId={note.id}
          layout="button"
          setErrorMsg={setErrorMsg}
        />
      )}
      {collections.length > 0 && (
        <AddToCollectionBtn
          collections={collections}
          note={note}
          setErrorMsg={setErrorMsg}
        />
      )}
    </main>
  );
}
