import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Overlay({ children, setShowOverlay, style, onClick }) {
  return createPortal(
    <div
      style={style}
      onClick={() => {
        if(onClick) onClick()
        setShowOverlay(false)
      }}
      className={
        "fixed inset-0 z-50 overflow-hidden bg-black/70 text-center"
      }
    >
      {children}
    </div>,
    document.querySelector("#portal"),
  );
}
