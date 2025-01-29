import { useQuery } from "@tanstack/react-query";
import NotFound from "../../general/NotFound";
import collectionService from "../../../services/collectionService";
import Loading from "../../../pages/Loading";
import { useNavigate } from "react-router-dom";

export default function CollectionsList() {
  const navigate = useNavigate();

  const { data: collections, isLoading } = useQuery({
    queryFn: () => collectionService.getAll(),
    queryKey: ["collections"],
  });

  if (isLoading) return <Loading />;

  if (collections === undefined)
    return (
      <NotFound
        text="Unexpected error when fetching collections"
        size={24}
        color="#FFFFFF"
      />
    );

  if (collections.length < 1)
    return <NotFound text="No collections yet" size={50} color="#FFFFFF" />;

  return (
    <ul className="collectionList">
      {collections.map((collection, index) => (
        <li
          key={index}
          className="collectionCard"
          onClick={() => navigate(`collections/${collection.id}`)}
        >
          <p>{collection.title}</p>
          <p>{collection.notes.length} notes</p>
        </li>
      ))}
    </ul>
  );
}
