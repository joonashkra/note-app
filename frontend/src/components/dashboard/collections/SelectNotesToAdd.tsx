import NoteCard from "../notes/NoteCard";
import { Note } from "../../../types/notes";
import { useState } from "react";

interface SelectNotesToAddProps {
  setSelectedNotes: (notes: Note[]) => void;
  selectedNotes: Note[];
  notes: Note[];
}

export default function SelectNotesToAdd({
  selectedNotes,
  setSelectedNotes,
  notes,
}: SelectNotesToAddProps) {
  const [filterInput, setFilterInput] = useState("");

  const availableNotes = notes.filter(
    (note) => !selectedNotes.some((n) => n.id === note.id),
  );

  if (availableNotes && availableNotes.length < 1) return null;

  const filteredNotes = availableNotes.filter((note) =>
    note.title.toLowerCase().includes(filterInput.toLowerCase()),
  );

  return (
    <div className="collectionFormAddProperties">
      <input
        type="text"
        placeholder="Search for notes..."
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      <ul className="notesListCompact">
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            onClick={() => setSelectedNotes(selectedNotes.concat(note))}
            data-testid="notesListItem"
            className="noteSelectionItem"
          >
            <NoteCard note={note} layout="compact" />
          </li>
        ))}
      </ul>
    </div>
  );
}
