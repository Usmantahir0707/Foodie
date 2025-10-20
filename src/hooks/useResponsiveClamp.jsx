import { useState, useEffect } from "react";

export default function useResponsiveClamp({
  view = "height",
  minView,
  maxView,
  minValue,
  maxValue,
  unit = "px",
  capped, 
}) {
  const viewportUnit = view === "height" ? "vh" : "vw";

  const computeValue = () => {
    const currentView =
      view === "height" ? window.innerHeight : window.innerWidth;
    const crossView =
      view === "height" ? window.innerWidth : window.innerHeight;

    
    const effectiveView =
      capped && crossView >= capped ? maxView : currentView;

    // Calculate interpolated value
    const ratio = (effectiveView - minView) / (maxView - minView);
    const rawValue = minValue + ratio * (maxValue - minValue);
    const clampedValue = Math.min(Math.max(rawValue, minValue), maxValue);

    
    if (unit === "none") return Math.round(clampedValue * 100) / 100;

    const factor = ((maxValue - minValue) / (maxView - minView)) * 100;
    const base = minValue - (factor * minView) / 100;

  
    if (capped && crossView >= capped) return null;

    return `clamp(${minValue}${unit}, calc(${base}${unit} + ${factor} * 1${viewportUnit}), ${maxValue}${unit})`;
  };

  const [value, setValue] = useState(() => computeValue());

  useEffect(() => {
    const handleResize = () => setValue(computeValue());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [view, minView, maxView, minValue, maxValue, unit, capped]);

  return value;
}
