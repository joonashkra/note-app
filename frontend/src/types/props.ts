import { Note } from "./notes";

export interface SvgButtonProps {
  size: number;
  color: string;
  navigate: (route: string) => void;
}

export type SvgProps = Omit<SvgButtonProps, "navigate">;

export interface NoteActionProps {
  note: Note;
  setErrorMsg: (text: string) => void;
}
