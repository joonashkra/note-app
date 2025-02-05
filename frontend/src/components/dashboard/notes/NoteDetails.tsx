import { PopulatedNote } from "../../../types/notes";
import { formatDate } from "../../../utils";

interface NoteDetailsProps {
  note: PopulatedNote;
}

export default function NoteDetails({ note }: NoteDetailsProps) {
  return (
    <div className="noteDetails">
      <div className="noteDetailsDescription">
        <h2>Description</h2>
        <p>{note.description}</p>
      </div>
      <div className="noteDetailsCollection">
        <h2>Collection</h2>
        {note.noteCollection !== null ? (
          <p>{note.noteCollection.title}</p>
        ) : (
          <p>No collection.</p>
        )}
      </div>
      <div>
        <h2>Creation date</h2>
        <p>{formatDate(note.creationDate)}</p>
      </div>
      <div>
        <h2>Deadline date</h2>
        <p>{formatDate(note.deadlineDate)}</p>
      </div>
    </div>
  );
}
