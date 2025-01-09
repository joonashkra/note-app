import { Note } from "../../types/notes";
import { formatDate } from "../../utils";

interface NoteCardProps {
  note: Note;
  layout: "detailed" | "compact";
}

export default function NoteCard({ note, layout }: NoteCardProps) {
  if (layout === "compact")
    return (
      <div className="noteCard">
        <p>{note.title}</p>
        <p>Deadline: {formatDate(note.deadlineDate)}</p>
      </div>
    );
  return <div className="noteCard">NoteCard</div>;
}
