import { Tooltip } from "react-tooltip";
import Check from "../../../assets/Check";
import Warning from "../../../assets/Warning";
import { Note } from "../../../types/notes";
import { formatDate } from "../../../utils";
import { useNavigate } from "react-router-dom";

interface NoteCardProps {
  note: Note;
  layout: "full" | "compact";
}

export default function NoteCard({ note, layout }: NoteCardProps) {
  const navigate = useNavigate();

  if (layout === "compact")
    return (
      <div className="noteCardCompact">
        <p>{note.title}</p>
        <div
          data-tooltip-id="warning-tooltip"
          data-tooltip-content="This note is already in a collection. Adding it to a new collection will remove it from its previous one."
        >
          <Tooltip id="warning-tooltip" />
          {note.noteCollection && <Warning size={24} color="#e04343" />}
        </div>
      </div>
    );
  return (
    <div className="noteCard" onClick={() => navigate(`notes/${note.id}`)}>
      <div>
        <p>{note.title}</p>
        {note.checked && <Check size={24} color="#FFFFFF" />}
      </div>
      <p>Deadline: {formatDate(note.deadlineDate)}</p>
    </div>
  );
}
