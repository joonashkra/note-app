import { Note } from "../types/notes";

export const sortNotes = (notes: Note[], sortOption: string) => {
  if (sortOption === "deadline") {
    notes.sort((a, b) => {
      const dateA = Date.parse(a.deadlineDate);
      const dateB = Date.parse(b.deadlineDate);
      return dateA - dateB;
    });
  }

  if (sortOption === "creation") {
    notes.sort((a, b) => {
      const dateA = Date.parse(a.creationDate);
      const dateB = Date.parse(b.creationDate);
      return dateA - dateB;
    });
  }

  if (sortOption === "recent") {
    notes.sort((a, b) => {
      const dateA = Date.parse(a.creationDate);
      const dateB = Date.parse(b.creationDate);
      return dateB - dateA;
    });
  }

  return notes;
};
