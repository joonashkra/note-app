import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import Check from "../../../assets/Check";
import { PopulatedNote } from "../../../types/notes";
import Uncheck from "../../../assets/Uncheck";

interface CheckNoteButtonProps {
  note: PopulatedNote;
  setErrorMsg: (text: string) => void;
}

export default function CheckNoteButton({
  note,
  setErrorMsg,
}: CheckNoteButtonProps) {
  const queryClient = useQueryClient();

  console.log("note in component", note);

  const { mutateAsync: checkNoteMutation } = useMutation({
    mutationFn: (note: PopulatedNote) =>
      noteService.update({
        ...note,
        checked: !note.checked,
        noteCollection:
          note.noteCollection === null ? null : note.noteCollection.id,
        user: note.user.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
    onError: (error) => {
      console.log("Error:", error);
      setErrorMsg("Unexpected error when checking note");
    },
  });

  return (
    <button
      className="noteActionBtn"
      onClick={() => checkNoteMutation(note)}
      data-testid="checkNoteBtn"
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
