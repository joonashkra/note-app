import Check from "../../../assets/Check";
import { Note } from "../../../types/notes";
import { formatDate } from "../../../utils";

interface NoteCardProps {
  note: Note;
  layout: "full" | "detailed" | "compact";
}

export default function NoteCard({ note, layout }: NoteCardProps) {
  if (layout === "compact")
    return (
      <div className="noteCardCompact">
        <p>{note.title}:</p>
        <p>{note.noteCollection ? `${note.noteCollection.title}` : `-`}</p>
      </div>
    );

  if (layout === "detailed")
    return (
      <div className="noteCard">
        <div>
          <p>{note.title}</p>
          {note.checked && <Check size={24} color="#FFFFFF" />}
        </div>
        <p>Deadline: {formatDate(note.deadlineDate)}</p>
      </div>
    );
  return (
    <section className="noteCardDetailed">
      <p>Description: {note.description}</p>
      <p>Creation date: {formatDate(note.creationDate)}</p>
      <p>Deadline date: {formatDate(note.deadlineDate)}</p>
      {note.noteCollection ? (
        <p>Collection: {note.noteCollection.title}</p>
      ) : (
        <p>Note doesn't belog to a collection.</p>
      )}
    </section>
  );
}
