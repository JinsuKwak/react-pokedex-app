import { useEffect } from "react";

export default function useOnClickOutside(ref, onClickHandler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      onClickHandler();
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, onClickHandler]);
}
