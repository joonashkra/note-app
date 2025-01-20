import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import Check from "../../../assets/Check";
import { Note } from "../../../types/notes";
import Uncheck from "../../../assets/Uncheck";
import { NoteActionProps } from "../../../types/props";

export default function CheckNoteButton({
  note,
  setErrorMsg,
}: NoteActionProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: checkNoteMutation } = useMutation({
    mutationFn: (note: Note) =>
      noteService.update({ ...note, checked: !note.checked }),
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
