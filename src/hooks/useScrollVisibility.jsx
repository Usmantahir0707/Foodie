import { useEffect, useRef, useState } from "react";

export default function useScrollHide(threshold) {
  const [showElement, setShowElement] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current && currentY > threshold) {
        setShowElement(false);
      } else {
        setShowElement(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return showElement;
}
