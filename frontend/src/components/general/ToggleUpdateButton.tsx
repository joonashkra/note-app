import { useNavigate } from "react-router-dom";
import Edit from "../../assets/Edit";
import { PopulatedNote } from "../../types/notes";
import { PopulatedCollection } from "../../types/collections";

interface ToggleUpdateButtonProps {
  data: PopulatedNote | PopulatedCollection;
}

export default function ToggleUpdateButton({ data }: ToggleUpdateButtonProps) {
  const navigate = useNavigate();

  const toggleUpdate = () => {
    navigate(`update`, { state: { data } });
  };

  return (
    <button
      className="noteActionBtn"
      onClick={toggleUpdate}
      data-testid="toggleUpdateBtn"
    >
      Update <Edit size={16} />
    </button>
  );
}
