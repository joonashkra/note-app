import { Tooltip } from "react-tooltip";
import Uncheck from "../../../assets/Uncheck";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import collectionService from "../../../services/collectionService";
import { Collection } from "../../../types/collections";

interface RemoveFromCollectionProps {
  collection: Collection;
  noteId: string;
  setErrorMsg: (text: string) => void;
  layout: "button" | "icon";
}

export default function RemoveFromCollection({
  collection,
  noteId,
  setErrorMsg,
  layout,
}: RemoveFromCollectionProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: removeNoteFromCollectionMutation } = useMutation({
    mutationFn: () =>
      collectionService.update({
        ...collection,
        notes: collection.notes.filter((id) => id !== noteId),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection"] });
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
    onError: () => {
      setErrorMsg("Unexpected error when updating note");
    },
  });

  if (layout === "button")
    return (
      <button
        className="noteActionBtn"
        onClick={() => removeNoteFromCollectionMutation()}
      >
        Remove from current collection <Uncheck size={18} />
      </button>
    );

  return (
    <div>
      <Tooltip id="remove-note" />
      <div
        onClick={() => removeNoteFromCollectionMutation()}
        className="removeNote"
        data-tooltip-id="remove-note"
        data-tooltip-content="Remove note from collection."
      >
        <Uncheck size={18} />
      </div>
    </div>
  );
}
