import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import { useNavigate } from "react-router-dom";
import Trash from "../../../assets/Trash";
import { PopulatedNote } from "../../../types/notes";

interface DeleteNoteButtonProps {
  note: PopulatedNote;
  setErrorMsg: (text: string) => void;
}

export default function DeleteNoteButton({
  note,
  setErrorMsg,
}: DeleteNoteButtonProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: deleteNoteMutation } = useMutation({
    mutationFn: (id: string) => noteService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      navigate("/dashboard");
    },
    onError: () => {
      setErrorMsg("Unexpected error when deleting note");
    },
  });

  return (
    <button
      className="noteActionBtn"
      onClick={() => {
        deleteNoteMutation(note.id);
      }}
      data-testid="deleteNoteBtn"
    >
      Delete <Trash size={18} color="#000000" />
    </button>
  );
}
