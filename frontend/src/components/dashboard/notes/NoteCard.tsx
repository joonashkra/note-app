import Check from "../../../assets/Check";
import { Note } from "../../../types/notes";
import { formatDate } from "../../../utils";

interface NoteCardProps {
  note: Note;
  layout: "detailed" | "compact";
}

export default function NoteCard({ note, layout }: NoteCardProps) {
  if (layout === "compact")
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
    <div className="noteCardDetailed">
      <p>Description: {note.description}</p>
      <p>Creation date: {formatDate(note.creationDate)}</p>
      <p>Deadline date: {formatDate(note.deadlineDate)}</p>
    </div>
  );
}
