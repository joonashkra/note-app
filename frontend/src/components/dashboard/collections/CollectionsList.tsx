import NotFound from "../../general/NotFound";
import Loading from "../../../pages/Loading";
import { useNavigate } from "react-router-dom";
import { Collection } from "../../../types/collections";
import CollectionCard from "./CollectionCard";

interface CollectionsListProps {
  collections: Collection[] | undefined;
  isLoading: boolean;
}

export default function CollectionsList({
  collections,
  isLoading,
}: CollectionsListProps) {
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  if (collections === undefined)
    return (
      <NotFound text="Unexpected error when fetching collections" size={24} />
    );

  if (collections.length < 1)
    return <NotFound text="No collections yet" size={50} />;

  return (
    <ul className="collectionList">
      {collections.map((collection, index) => (
        <li
          key={index}
          onClick={() => navigate(`collections/${collection.id}`)}
          data-testid="collectionListItem"
        >
          <CollectionCard collection={collection} layout="compact" />
        </li>
      ))}
    </ul>
  );
}
