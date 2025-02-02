import { useMutation, useQueryClient } from "@tanstack/react-query";
import Trash from "../../../assets/Trash";
import collectionService from "../../../services/collectionService";
import { useNavigate } from "react-router-dom";

interface DeleteCollectionBtnProps {
  collectionId: string;
  setErrorMsg: (text: string) => void;
}

export default function DeleteCollectionBtn({
  collectionId,
  setErrorMsg,
}: DeleteCollectionBtnProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deleteCollectionMutation } = useMutation({
    mutationFn: () => collectionService.remove(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections", "notes"],
      });
      navigate("/dashboard");
    },
    onError: () => {
      setErrorMsg("Unexpected error when deleting collection.");
    },
  });

  const handleDelete = () => {
    if (
      window.confirm(
        "Deleting collection will delete all notes in it. Continue?",
      )
    ) {
      deleteCollectionMutation();
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="noteActionBtn"
        data-testid="deleteCollectionBtn"
      >
        Delete collection <Trash size={18} color="#000000" />
      </button>
    </div>
  );
}
