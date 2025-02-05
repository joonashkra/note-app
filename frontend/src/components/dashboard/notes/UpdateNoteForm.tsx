import { useMutation, useQueryClient } from "@tanstack/react-query";
import noteService from "../../../services/noteService";
import { Note, PopulatedNote } from "../../../types/notes";
import { newNoteSchema } from "../../../types/schemas";
import { useNavigate } from "react-router-dom";
import Check from "../../../assets/Check";
import Uncheck from "../../../assets/Uncheck";
import { useTab } from "../../../hooks/useTab";

interface UpdateNoteFormProps {
  note: PopulatedNote;
  setErrorMsg: (text: string) => void;
}

export default function UpdateNoteForm({
  note,
  setErrorMsg,
}: UpdateNoteFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useTab();

  const { mutateAsync: updateNoteMutation } = useMutation({
    mutationFn: (note: Note) => noteService.update(note),
    onSuccess: (updatedNote) => {
      queryClient.setQueryData(["note"], updatedNote);
      navigate(-1);
    },
    onError: () => {
      setErrorMsg("Unexpected error when updating note");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    const parseNote = newNoteSchema.safeParse({
      ...formValues,
      noteCollection:
        note.noteCollection === null ? null : note.noteCollection.id,
    });

    if (!parseNote.success) {
      console.error(parseNote.error);
      setErrorMsg(`Error: ${parseNote.error.issues[0].message}`);
      return;
    }

    const updatedNote: Note = {
      ...parseNote.data,
      id: note.id,
      user: note.user.id,
      creationDate: note.creationDate,
      deadlineDate: parseNote.data.deadlineDate.toISOString(),
      checked: note.checked,
    };

    await updateNoteMutation(updatedNote);
  };

  const cancelUpdate = () => {
    if (window.confirm("Cancel update? All changes will be lost.")) {
      navigate(-1);
    }
  };

  return (
    <form className="noteForm" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="title"
        maxLength={25}
        id="titleInput"
        placeholder="Title for note..."
        defaultValue={note.title}
      ></input>
      <textarea
        required
        typeof="text"
        name="description"
        maxLength={2500}
        rows={12}
        placeholder="Description and details for note..."
        defaultValue={note.description}
      ></textarea>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label>Deadline date:</label>
        <input
          required
          name="deadlineDate"
          id="dateInput"
          type="datetime-local"
          min={note.creationDate.slice(0, 16)}
          defaultValue={note.deadlineDate.slice(0, 16)}
          data-testid="dateTimeInput"
        ></input>
      </div>
      <div className="noteActionButtons">
        <button
          className="noteActionBtn"
          type="submit"
          data-testid="updateNoteBtn"
        >
          Update <Check size={20} />
        </button>
        <button className="noteActionBtn" type="button" onClick={cancelUpdate}>
          Cancel <Uncheck size={18} />
        </button>
      </div>
    </form>
  );
}
