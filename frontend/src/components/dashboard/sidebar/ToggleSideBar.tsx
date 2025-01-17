interface ToggleSideBarProps {
  isBarOpen: boolean;
  setIsBarOpen: (value: boolean) => void;
}

export default function ToggleSideBar({
  isBarOpen,
  setIsBarOpen,
}: ToggleSideBarProps) {
  return (
    <button id="toggleSideBarBtn" onClick={() => setIsBarOpen(!isBarOpen)}>
      {isBarOpen ? "Close" : "Open"}
    </button>
  );
}
