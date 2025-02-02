import { useParams } from "react-router-dom";
import noteService from "../services/noteService";
import { useQuery } from "@tanstack/react-query";
import NotFound from "../components/general/NotFound";
import Loading from "./Loading";
import DeleteNoteButton from "../components/dashboard/notes/DeleteNoteButton";
import { useState } from "react";
import CheckNoteButton from "../components/dashboard/notes/CheckNoteButton";
import AddToCollectionBtn from "../components/dashboard/notes/AddToCollectionBtn";
import collectionService from "../services/collectionService";
import ErrorMessage from "../components/general/ErrorMessage";
import NoteDetails from "../components/dashboard/notes/NoteDetails";
import RemoveFromCollection from "../components/dashboard/notes/RemoveFromCollection";
import ToggleUpdateButton from "../components/general/ToggleUpdateButton";

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

  if (!note)
    return <NotFound text="Note not found." size={50} color="#FFFFFF" />;

  if (!collections)
    return <NotFound text="Collections not found." size={50} color="#FFFFFF" />;

  const currentCollection =
    note.noteCollection !== null
      ? collections.find(
          (collection) => collection.id === note.noteCollection.id,
        )
      : null;

  return (
    <main className="noteDetailsPage" data-testid="noteDetailsPage">
      <div>
        <NoteDetails note={note} />
        <ErrorMessage text={errorMsg} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: "1rem",
        }}
      >
        <CheckNoteButton note={note} setErrorMsg={setErrorMsg} />
        <ToggleUpdateButton data={note} />
        <DeleteNoteButton note={note} setErrorMsg={setErrorMsg} />
        {collections.length > 0 && (
          <AddToCollectionBtn
            collections={collections}
            note={note}
            setErrorMsg={setErrorMsg}
          />
        )}
        {currentCollection && (
          <RemoveFromCollection
            collection={currentCollection}
            noteId={note.id}
            layout="button"
            setErrorMsg={setErrorMsg}
          />
        )}
      </div>
    </main>
  );
}
