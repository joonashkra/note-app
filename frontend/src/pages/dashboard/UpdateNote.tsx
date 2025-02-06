import { useLocation } from "react-router-dom";
import UpdateNoteForm from "../../components/dashboard/notes/UpdateNoteForm";
import { useState } from "react";
import ErrorMessage from "../../components/general/ErrorMessage";
import Fallback from "../Fallback";
import GoBackButton from "../../components/general/GoBackButton";

export default function UpdateNote() {
  const [errorMsg, setErrorMsg] = useState("");

  const { state } = useLocation();

  if (!state.data) return <Fallback />;

  return (
    <main className="updateNotePage">
      <GoBackButton text="Back to Dashboard" route="/dashboard" />
      <h1>Update note</h1>
      <UpdateNoteForm note={state.data} setErrorMsg={setErrorMsg} />
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
