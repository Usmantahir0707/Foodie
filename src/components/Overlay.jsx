import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Overlay({children, setShowOverlay}) {
  useEffect(() => {
    window.scrollTo({top: '0', behavior: 'smooth'})
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);
  return createPortal(
    <div onClick={()=> setShowOverlay(false)} className="fixed inset-0 z-20 pt-[241px] text-center overflow-hidden bg-black/70">
      {children}
    </div>,
    document.querySelector("#portal"),
  );
}
