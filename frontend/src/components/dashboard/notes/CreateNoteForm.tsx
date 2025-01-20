import { newNoteSchema } from "../../../types/schemas";
import noteService from "../../../services/noteService";
import { NewNote } from "../../../types/notes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Check from "../../../assets/Check";
import Uncheck from "../../../assets/Uncheck";
import { useTab } from "../../../hooks/useTab";

interface CreateNoteFormProps {
  setErrorMsg: (text: string) => void;
}

export default function CreateNoteForm({ setErrorMsg }: CreateNoteFormProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useTab();

  const { mutateAsync: addNoteMutation } = useMutation({
    mutationFn: (newNote: NewNote) => noteService.create(newNote),
    onSuccess: (note) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      navigate(`/dashboard/notes/${note.id}`);
    },
    onError: () => {
      setErrorMsg("Unexpected error when creating the note");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);
    const parseNote = newNoteSchema.safeParse(formValues);

    if (!parseNote.success) {
      setErrorMsg(`Error: ${parseNote.error.issues[0].message}`);
      return;
    }

    const newNote: NewNote = {
      ...parseNote.data,
      deadlineDate: parseNote.data.deadlineDate.toISOString(),
    };

    await addNoteMutation(newNote);
  };

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const currDate = now.toISOString().slice(0, 16);

  const cancelCreate = () => {
    if (window.confirm("Cancel? All changes will be lost.")) {
      navigate(-1);
    }
  };

  return (
    <form
      className="noteForm"
      onSubmit={handleSubmit}
      data-testid="createNoteForm"
    >
      <input
        required
        type="text"
        name="title"
        maxLength={25}
        id="titleInput"
        placeholder="Title for note..."
      ></input>
      <textarea
        required
        typeof="text"
        name="description"
        maxLength={2500}
        rows={12}
        placeholder="Description and details for note..."
      ></textarea>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label>Deadline date:</label>
        <input
          required
          name="deadlineDate"
          id="dateInput"
          type="datetime-local"
          min={currDate}
          defaultValue={currDate}
          data-testid="datetimeInput"
        ></input>
      </div>
      <div className="noteActionButtons">
        <button className="noteActionBtn" type="submit">
          Create <Check size={20} color="#000000" />
        </button>
        <button className="noteActionBtn" type="button" onClick={cancelCreate}>
          Cancel <Uncheck size={18} color="#000000" />
        </button>
      </div>
    </form>
  );
}
