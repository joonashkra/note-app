import { PopulatedNote } from "../../../types/notes";
import { Collection } from "../../../types/collections";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import Warning from "../../../assets/Warning";
import { Tooltip } from "react-tooltip";
import Check from "../../../assets/Check";
import Uncheck from "../../../assets/Uncheck";
import CollectionSvg from "../../../assets/CollectionSvg";

interface AddToCollectionBtnProps {
  note: PopulatedNote;
  setErrorMsg: (text: string) => void;
  collections: Collection[];
}

export default function AddToCollectionBtn({
  note,
  setErrorMsg,
  collections,
}: AddToCollectionBtnProps) {
  const [isToggled, setIsToggled] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );

  const queryClient = useQueryClient();

  const { mutateAsync: addToCollectionMutation, isPending } = useMutation({
    mutationFn: async (collectionId: string) =>
      noteService.update({
        ...note,
        user: note.user.id,
        noteCollection: collectionId,
      }),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setIsToggled(false);
    },
    onError: () => {
      setErrorMsg("Unexpected error when adding note to collection.");
    },
  });

  const handleAddToCollection = () => {
    if (!selectedCollection) return;
    addToCollectionMutation(selectedCollection);
  };

  const availableCollections = note.noteCollection
    ? collections.filter(
        (collection) => collection.id !== note.noteCollection.id,
      )
    : collections;

  if (availableCollections.length < 1) return null;

  return (
    <>
      {isToggled ? (
        <div className="noteCollectionSelector">
          <div style={{ display: "flex" }}>
            <Tooltip id="warning-tooltip" />
            <p
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              data-tooltip-id="warning-tooltip"
              data-tooltip-content="This note is already in a collection. Adding it to a new collection will remove it from its previous one."
            >
              Select collection to add note in{" "}
              {note.noteCollection && <Warning size={20} color="#e04343" />}
            </p>
          </div>
          {availableCollections.length > 0 ? (
            <select
              onChange={(e) => setSelectedCollection(e.target.value)}
              value={selectedCollection || ""}
            >
              <option value="" disabled>
                Select a collection
              </option>
              {availableCollections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
              ))}
            </select>
          ) : (
            <p>No collections yet.</p>
          )}
          <div className="noteActionButtons">
            <button
              onClick={handleAddToCollection}
              disabled={!selectedCollection || isPending}
              className="noteActionBtn"
            >
              {isPending ? "Adding..." : "Add"}{" "}
              <Check size={20} color="#F0F0F0" />
            </button>
            <button
              onClick={() => setIsToggled(!isToggled)}
              className="noteActionBtn"
            >
              Cancel <Uncheck size={20} color="#F0F0F0" />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="noteActionBtn"
          onClick={() => setIsToggled(!isToggled)}
        >
          {note.noteCollection !== null
            ? "Change collection"
            : "Add to collection"}
          <CollectionSvg size={18} color="F0F0F0" />
        </button>
      )}
    </>
  );
}
