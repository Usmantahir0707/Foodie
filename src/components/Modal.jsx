import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export default function Modal({ children, heading}) {
  return createPortal(
    <div className="fixed top-[280px] md:top-[150px] md:scale-[0.8] flex h-[398px] w-[300px] flex-col items-center gap-3 justify-self-center rounded-2xl bg-white p-4 shadow-2xl">
      <h2 className="text-[25px] font-bold">{heading}</h2>
      {children}
      <Link to={'/home'} className="underline decoration-gray-300 decoration-[1px] underline-offset-6">
          Skip 
        </Link>
    </div>,
    document.querySelector("#portal"),
  );
}
