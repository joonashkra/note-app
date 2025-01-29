import { useState } from "react";
import CreateCollectionForm from "../components/dashboard/collections/CreateCollectionForm";

export default function CreateCollection() {
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <main className="createCollectionPage">
      <h1>Create New Collection</h1>
      <CreateCollectionForm setErrorMsg={setErrorMsg} />
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </main>
  );
}
