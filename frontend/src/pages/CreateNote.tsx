import { useState } from "react";
import CreateNoteForm from "../components/dashboard/notes/CreateNoteForm";

export default function CreateNote() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="createNotePage">
      <h1>Create New Note</h1>
      <CreateNoteForm setErrorMsg={setErrorMsg} />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}
