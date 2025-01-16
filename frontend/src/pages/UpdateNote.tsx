import { useLocation } from "react-router-dom";
import Loading from "./Loading";
import UpdateNoteForm from "../components/dashboard/notes/UpdateNoteForm";
import GoBackButton from "../components/general/GoBackButton";
import { useState } from "react";

export default function UpdateNote() {
  const [errorMsg, setErrorMsg] = useState("");

  const { state } = useLocation();

  if (!state.note) return <Loading />;

  return (
    <div className="updateNotePage">
      <UpdateNoteForm note={state.note} setErrorMsg={setErrorMsg} />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}
