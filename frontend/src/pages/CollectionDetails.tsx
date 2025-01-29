import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import collectionService from "../services/collectionService";
import Loading from "./Loading";
import NotFound from "../components/general/NotFound";

export default function CollectionDetails() {
  const { id = "" } = useParams();
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { data: collection, isLoading } = useQuery({
    queryFn: () => collectionService.getOne(id),
    queryKey: ["collection"],
  });

  if (isLoading) return <Loading />;

  if (!collection)
    return <NotFound text="Collections not found." size={50} color="#FFFFFF" />;

  return (
    <div>
      <h1>{collection.title}</h1>
      <p>Description: {collection.description}</p>
      <p>Users:</p>
      <ul>
        {collection.users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      {collection.notes.length < 1 ? (
        <p>No notes yet.</p>
      ) : (
        <>
          <p>Notes:</p>
          <ul>
            {collection.notes.map((note) => (
              <li
                key={note.id}
                onClick={() => navigate(`/dashboard/notes/${note.id}`)}
              >
                {note.title}
              </li>
            ))}
          </ul>
        </>
      )}
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
    </div>
  );
}
