import { useQuery } from "@tanstack/react-query";
import UpdateCollectionForm from "../../components/dashboard/collections/UpdateCollectionForm";
import { useLocation } from "react-router-dom";
import Fallback from "../Fallback";
import noteService from "../../services/noteService";
import Loading from "../Loading";
import { useState } from "react";
import ErrorMessage from "../../components/general/ErrorMessage";
import GoBackButton from "../../components/general/GoBackButton";

export default function UpdateCollection() {
  const { state } = useLocation();
  const [errorMsg, setErrorMsg] = useState("");

  const { data: notes, isLoading } = useQuery({
    queryFn: () => noteService.getAll(),
    queryKey: ["notes"],
  });

  if (!state.data) return <Fallback />;
  if (isLoading) return <Loading />;

  return (
    <div className="updateCollectionPage">
      <GoBackButton text="Back to Dashboard" route="/dashboard" />
      <h1>Update collection</h1>
      <UpdateCollectionForm
        collection={state.data}
        notes={notes ?? []}
        setErrorMsg={setErrorMsg}
      />
      <ErrorMessage text={errorMsg} />
    </div>
  );
}
