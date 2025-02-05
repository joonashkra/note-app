import { useLocation } from "react-router-dom";
import UpdateNoteForm from "../../components/dashboard/notes/UpdateNoteForm";
import { useState } from "react";
import ErrorMessage from "../../components/general/ErrorMessage";
import Fallback from "../Fallback";

export default function UpdateNote() {
  const [errorMsg, setErrorMsg] = useState("");

  const { state } = useLocation();

  if (!state.data) return <Fallback />;

  return (
    <main className="updateNotePage">
      <UpdateNoteForm note={state.data} setErrorMsg={setErrorMsg} />
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
