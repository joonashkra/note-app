import { useEffect } from "react";

export const useTab = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const target = event.target as HTMLTextAreaElement;
        if (target && target.tagName === "TEXTAREA") {
          event.preventDefault();
          const { selectionStart, selectionEnd } = target;
          target.setRangeText("\t", selectionStart, selectionEnd, "end");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};
