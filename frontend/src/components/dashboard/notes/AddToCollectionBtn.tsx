import { Note } from "../../../types/notes";
import { Collection } from "../../../types/collections";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import collectionService from "../../../services/collectionService";

interface AddToCollectionBtnProps {
  note: Note;
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
    mutationFn: async (collection: Collection) =>
      collectionService.update({
        ...collection,
        notes: collection.notes.concat(note.id),
      }),
    onSuccess: async (updatedCollection) => {
      queryClient.setQueryData(["collection", updatedCollection.id], {
        ...updatedCollection,
        notes: updatedCollection.notes.concat(note.id),
      });

      await queryClient.invalidateQueries({ queryKey: ["note"] });

      setIsToggled(false);
    },
    onError: () => {
      setErrorMsg("Unexpected error when adding note to collection.");
    },
  });

  const handleAddToCollection = () => {
    if (!selectedCollection) return;
    const collectionToUpdate = collections.find(
      (col) => col.id === selectedCollection,
    );
    if (!collectionToUpdate) return;

    addToCollectionMutation(collectionToUpdate);
  };

  return (
    <div>
      <button onClick={() => setIsToggled(!isToggled)}>
        Add to collection
      </button>
      {isToggled && (
        <div>
          <p>Select collection to add note in:</p>
          {collections.length > 0 ? (
            <select
              onChange={(e) => setSelectedCollection(e.target.value)}
              value={selectedCollection || ""}
            >
              <option value="" disabled>
                Select a collection
              </option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
              ))}
            </select>
          ) : (
            <p>No collections yet.</p>
          )}
          <button
            onClick={handleAddToCollection}
            disabled={!selectedCollection || isPending}
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
}
