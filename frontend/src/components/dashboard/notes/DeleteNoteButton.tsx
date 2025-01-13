import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import { useNavigate } from "react-router-dom";
import Trash from "../../../assets/Trash";

interface DeleteNoteButtonProps {
  noteId: string;
  setErrorMsg: (text: string) => void;
}

export default function DeleteNoteButton({
  noteId,
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
      window.alert("Note deleted succesfully");
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
          deleteNoteMutation(noteId);
      }}
    >
      Delete <Trash size={20} color="#000000" />
    </button>
  );
}
