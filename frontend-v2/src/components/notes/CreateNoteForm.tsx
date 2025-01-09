import { useState } from "react";
import { newNoteSchema } from "../../types/schemas";
import noteService from "../../services/noteService";
import { NewNote } from "../../types/notes";

export default function CreateNoteForm() {
  const [errorMsg, setErrorMsg] = useState("");

  const currDate = new Date();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    noteService.create(newNote);

    window.alert("Note created succesfully.");
  };

  return (
    <form className="createNoteForm" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="title"
        maxLength={30}
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
          min={currDate.toISOString()}
        ></input>
      </div>
      <button type="submit">Create</button>
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
}
