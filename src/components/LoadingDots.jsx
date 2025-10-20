export default function LoadingDots({text}) {
  return (
    <div className="flex items-center justify-center text-lg font-medium">
      {text}
      <span className="ml-1 flex">
        <span className="opacity-0 animate-[blink_1.5s_infinite] [animation-delay:0s]">.</span>
        <span className="opacity-0 animate-[blink_1.5s_infinite] [animation-delay:0.3s]">.</span>
        <span className="opacity-0 animate-[blink_1.5s_infinite] [animation-delay:0.6s]">.</span>
      </span>

      <style>{`
        @keyframes blink {
          0%, 60%, 100% { opacity: 0; }
          20%, 40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
  