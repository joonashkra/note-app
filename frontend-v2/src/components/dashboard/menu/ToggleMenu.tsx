
interface ToggleMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export default function ToggleMenu({ isMenuOpen, setIsMenuOpen }: ToggleMenuProps) {
  return (
    <button id="toggleMenuBtn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {isMenuOpen ? 'Close' : 'Open'}
    </button>
  );
};