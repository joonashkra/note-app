import { useState } from "react";
import CreateNoteForm from "../../components/dashboard/notes/CreateNoteForm";
import ErrorMessage from "../../components/general/ErrorMessage";
import GoBackButton from "../../components/general/GoBackButton";

export default function CreateNote() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className="createNotePage">
      <GoBackButton text="Back to Dashboard" route="/dashboard" />
      <h1>Create New Note</h1>
      <CreateNoteForm setErrorMsg={setErrorMsg} />
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
