import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import collectionService from "../services/collectionService";
import Loading from "./Loading";
import CollectionDetails from "../components/dashboard/collections/CollectionDetails";
import DeleteCollectionBtn from "../components/dashboard/collections/DeleteCollectionBtn";
import Fallback from "./Fallback";
import ErrorMessage from "../components/general/ErrorMessage";
import ToggleUpdateButton from "../components/general/ToggleUpdateButton";

export default function Collection() {
  const { id = "" } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const { data: collection, isLoading } = useQuery({
    queryFn: () => collectionService.getOne(id),
    queryKey: ["collection"],
  });

  if (!collection) return <Fallback />;

  if (isLoading) return <Loading />;

  return (
    <main className="collectionDetailsPage">
      <CollectionDetails collection={collection} setErrorMsg={setErrorMsg} />
      <div className="noteActionButtons">
        <ToggleUpdateButton data={collection} />
        <DeleteCollectionBtn
          collectionId={collection.id}
          setErrorMsg={setErrorMsg}
        />
      </div>
      <ErrorMessage text={errorMsg} />
    </main>
  );
}
