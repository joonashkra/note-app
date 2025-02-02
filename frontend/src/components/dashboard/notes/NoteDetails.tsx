import Check from "../../../assets/Check";
import { PopulatedNote } from "../../../types/notes";
import { formatDate } from "../../../utils";

interface NoteDetailsProps {
  note: PopulatedNote;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <div className="noteDetails">
      <section
        style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        data-testid="noteTitleDiv"
      >
        <h1>{note.title}</h1>
        {note.checked && <Check size={30} color="#FFFFFF" />}
      </section>
      <section className="noteDetailsDetails">
        <div>
          <div>
            <h2>Description</h2>
            <p>{note.description}</p>
          </div>
          <div>
            <h2>Collection</h2>
            {note.noteCollection !== null ? (
              <p>{note.noteCollection.title}</p>
            ) : (
              <p>No collection.</p>
            )}
          </div>
        </div>
        <div>
          <div>
            <h2>Creation date</h2>
            <p>{formatDate(note.creationDate)}</p>
          </div>
          <div>
            <h2>Deadline date</h2>
            <p>{formatDate(note.deadlineDate)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
