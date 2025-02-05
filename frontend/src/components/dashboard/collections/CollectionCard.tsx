import { Collection } from "../../../types/collections";

interface CollectionCardProps {
  collection: Collection;
  layout: "full" | "compact";
}

export default function CollectionCard({
  collection,
  layout,
}: CollectionCardProps) {
  if (layout === "compact")
    return (
      <div className="collectionCard">
        <p className="collectionCardTitle">{collection.title}</p>
        <p>
          {collection.notes.length}{" "}
          {collection.notes.length === 1 ? "note" : "notes"}
        </p>
      </div>
    );

  return (
    <div className="collectionCard">
      <p>{collection.title}</p>
      <p>{collection.description}</p>
      <p>{collection.users.length} users</p>
      <p>{collection.notes.length} notes</p>
    </div>
  );
}
