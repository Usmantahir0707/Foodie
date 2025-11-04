import { useNavigate } from "react-router-dom";
import cuisines from "../../cuisineData.js";
import { useRef } from "react";
export default function CuisineFlex() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  
 const scrollBy = (direction, amount = 250) => {
  const target = scrollRef.current;
  if (!target) return;

  target.scrollBy({
    left: direction === "left" ? -amount : amount,
    behavior: "smooth", 
  });
};

  return (
 <div className="relative lg:px-[70px]">

       {/* Left scroll button */}
      <button
        onClick={() => scrollBy("left")}
        className="absolute active:text-[var(--primary-color)] left-[10px] top-[50%] -translate-y-1/2 h-[45px] w-[45px] bg-gray-200 hover:bg-gray-300 z-10 rounded-full hidden lg:flex items-center justify-center shadow"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Right scroll button */}
      <button
        onClick={() => scrollBy("right")}
        className="absolute right-[10px] top-[50%] active:text-[var(--primary-color)]  -translate-y-1/2 h-[45px] w-[45px] bg-gray-200 hover:bg-gray-300 z-10 rounded-full hidden lg:flex items-center justify-center shadow"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>


        {/* X-Scrollable Flex to show cuisines*/}
        <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-10 overflow-x-auto overflow-y-hidden
     p-1 whitespace-nowrap">
      {cuisines.map((x) => (
        <div
         onClick={()=> navigate('/search-result', { state: { query: x.title } })}
          className="flex w-[90px] cursor-pointer flex-shrink-0 flex-col items-center"
          key={x.title}
        >
          <img
            className="aspect-square w-full rounded-md object-cover"
            src={x.img}
            alt={x.title}
          />
          <h4 className="mt-1 text-[17px] text-[#e21b70]">{x.title}</h4>
        </div>
      ))}
    </div>
    </div>
    
  );
}
