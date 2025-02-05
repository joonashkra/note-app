import { useState } from "react";
import CreateCollectionForm from "../../components/dashboard/collections/CreateCollectionForm";
import ErrorMessage from "../../components/general/ErrorMessage";
import NotFound from "../../components/general/NotFound";
import noteService from "../../services/noteService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";

export default function CreateCollection() {
  const [errorMsg, setErrorMsg] = useState("");

  const { data: notes, isLoading } = useQuery({
    queryFn: () => noteService.getAll(),
    queryKey: ["notes"],
  });

  if (isLoading) return <Loading />;

  if (notes === undefined)
    return (
      <NotFound
        text="Unexpected error when fetching notes"
        size={24}
        color="#FFFFFF"
      />
    );

  return (
    <main className="createCollectionPage">
      <h1>Create New Collection</h1>
      <CreateCollectionForm setErrorMsg={setErrorMsg} notes={notes} />
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
