import { Collection } from "../../types/collections";
import NoDataCard from "../NoDataCard";

interface CollectionsListProps {
  collections: Collection[];
}

export default function CollectionsList({ collections }: CollectionsListProps) {
  if (collections.length < 1) return <NoDataCard error={false} />;
  if (collections === undefined) return <NoDataCard error={true} />;

  return (
    <ul className="collectionList">
      {collections.map((collection, index) => (
        <li key={index} className="collectionCard">
          <p>{collection.title}</p>
        </li>
      ))}
    </ul>
  );
}
