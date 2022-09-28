import React, { MouseEvent } from "react"

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(ref, action) {
  React.useEffect(() => {
    /**
     * Run action if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action()
      }
    }
    /* Bind the event listener */
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      /* Unbind the event listener on clean up */
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
