import { useNavigate } from "react-router-dom";
import { PopulatedCollection } from "../../../types/collections";
import NotFound from "../../general/NotFound";
import RemoveFromCollection from "../notes/RemoveFromCollection";
import Uncheck from "../../../assets/Uncheck";
import { Tooltip } from "react-tooltip";

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
      <section className="collectionDetailsDescription">
        <h2>Description</h2>
        <p>
          {collection.description ? collection.description : "No description"}
        </p>
      </section>
      <section className="collectionDetailsLists">
        <div>
          <h2>Notes</h2>
          {collection.notes.length < 1 ? (
            <NotFound text="No notes yet." size={50} />
          ) : (
            <ul className="notesListCompact">
              {collection.notes.map((note) => (
                <li key={note.id} className="notesListItem">
                  <div className="noteCardCompact">
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
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2>Users</h2>
          <ul className="notesListCompact users">
            {collection.users.map((user) => (
              <li className="notesListItem" key={user.id}>
                <div
                  className="noteCardCompact"
                  data-tooltip-id="remove-user"
                  data-tooltip-content="Managing collection users not available yet."
                >
                  <Tooltip id="remove-user" />
                  {user.username} <Uncheck size={18} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
