import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import { useNavigate } from "react-router-dom";
import Trash from "../../../assets/Trash";
import { NoteActionProps } from "../../../types/props";

export default function DeleteNoteButton({
  note,
  setErrorMsg,
}: NoteActionProps) {
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
        if (window.confirm("Delete note permanently?"))
          deleteNoteMutation(note.id);
      }}
    >
      Delete <Trash size={18} color="#000000" />
    </button>
  );
}
