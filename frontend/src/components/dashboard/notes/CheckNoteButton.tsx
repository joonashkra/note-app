import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import Check from "../../../assets/Check";
import { Note } from "../../../types/notes";
import Uncheck from "../../../assets/Uncheck";

interface CheckNoteButtonProps {
  note: Note;
  setErrorMsg: (text: string) => void;
}

export default function CheckNoteButton({
  note,
  setErrorMsg,
}: CheckNoteButtonProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: checkNoteMutation } = useMutation({
    mutationFn: (id: string) => noteService.check(id),
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(
        ["note"],
        { ...updatedNote, checked: !note.checked },
        updatedNote,
      );
    },
    onError: () => {
      setErrorMsg("Unexpected error when checking note");
    },
  });

  return (
    <button
      className="noteActionBtn checkNoteBtn"
      onClick={() => checkNoteMutation(note.id)}
    >
      {!note.checked ? (
        <>
          Check as done <Check size={22} color="#000000" />
        </>
      ) : (
        <>
          Uncheck done <Uncheck size={22} color="#000000" />
        </>
      )}
    </button>
  );
}
