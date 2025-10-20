import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import useResponsiveClamp from "../hooks/useResponsiveClamp";

export default function Modal({ children, heading }) {
  const scale = useResponsiveClamp({
    view: "height",
    minView: 530,
    maxView: 800,
    minValue: 0.75,
    maxValue: 1,
    unit: "none",
    capped: 768,
  });

  const top = useResponsiveClamp({
    view: "height",
    minView: 540,
    maxView: 800,
    minValue: 90,
    maxValue: 230,
    capped: 768,
  });

  return createPortal(
    <div
      style={{
        ...(top !== null && { top: top }),
        ...(scale !== null && { transform: `scale(${scale})` }),
      }}
      className="fixed top-[clamp(10.938rem,calc(-0.063rem+55vw),14.375rem)] flex h-[420px] w-[300px] flex-col items-center gap-3 justify-self-center rounded-2xl bg-white p-4 shadow-2xl lg:top-[90px] lg:h-[440px] lg:scale-[0.72]"
    >
      <h2 className="text-[1.4rem] font-bold">{heading}</h2>
      {children}
      <Link
        to={"/home"}
        className="underline decoration-gray-300 decoration-[1px] underline-offset-6"
      >
        Skip
      </Link>
    </div>,
    document.querySelector("#portal"),
  );
}
