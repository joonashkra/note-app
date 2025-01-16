import { useNavigate } from "react-router-dom";
import Edit from "../../../assets/Edit";
import { Note } from "../../../types/notes";

interface ToggleUpdateButtonProps {
  note: Note;
}

export default function ToggleUpdateButton({ note }: ToggleUpdateButtonProps) {
  const navigate = useNavigate();

  const toggleUpdate = () => {
    navigate(`update`, { state: { note } });
  };

  return (
    <button className="noteActionBtn" onClick={toggleUpdate}>
      Update <Edit size={18} color="#000000" />
    </button>
  );
}
