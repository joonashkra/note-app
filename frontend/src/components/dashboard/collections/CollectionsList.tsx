import dummyCollections from "../../../dummyData";
import NotFound from "../../general/NotFound";

export default function CollectionsList() {
  const collections = dummyCollections;

  if (collections.length < 1)
    return <NotFound text="No collections yet" size={24} color="#FFFFFF" />;
  if (collections === undefined)
    return (
      <NotFound
        text="Unexpected error when fetching collections"
        size={24}
        color="#FFFFFF"
      />
    );

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
