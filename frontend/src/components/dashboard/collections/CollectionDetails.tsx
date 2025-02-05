import { useNavigate } from "react-router-dom";
import { PopulatedCollection } from "../../../types/collections";
import NotFound from "../../general/NotFound";
import RemoveFromCollection from "../notes/RemoveFromCollection";

interface CollectionDetailsProps {
  collection: PopulatedCollection | undefined;
  setErrorMsg: (text: string) => void;
}

export default function CollectionDetails({
  collection,
  setErrorMsg,
}: CollectionDetailsProps) {
  const navigate = useNavigate();

  if (!collection) return <NotFound text="Collection not found." size={50} />;

  const nonPopulatedCollection = {
    ...collection,
    notes: collection.notes.map((note) => note.id),
    users: collection.users.map((user) => user.id),
  };

  return (
    <div className="collectionDetails" data-testid="collectionDetails">
      <h1>{collection.title}</h1>
      <div className="collectionDetailsData">
        <section className="collectionDetailsDescription">
          <h2>Description</h2>
          <p>
            {collection.description ? collection.description : "No description"}
          </p>
        </section>
        <section className="collectionDetailsLists">
          <div className="collectionDetailsUsers">
            <h2>Users</h2>
            <ul>
              {collection.users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
          <div className="collectionDetailsNotes">
            <h2>Notes</h2>
            {collection.notes.length < 1 ? (
              <NotFound text="No notes yet." size={50} />
            ) : (
              <ul>
                {collection.notes.map((note) => (
                  <li key={note.id}>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/dashboard/notes/${note.id}`)}
                    >
                      {note.title}
                    </p>
                    <RemoveFromCollection
                      collection={nonPopulatedCollection}
                      noteId={note.id}
                      setErrorMsg={setErrorMsg}
                      layout="icon"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
