import { useNavigate } from "react-router-dom";
import data from "../../data";
import { useRef} from "react";

export default function ExclusiveFlex() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
 

  const exclusiveDeals = data.filter((f) =>
    f.menu.some((s) => s.title === "Exclusive Deals")
  );

 const scrollBy = (direction, amount = 250) => {
  const target = scrollRef.current;
  if (!target) return;

  target.scrollBy({
    left: direction === "left" ? -amount : amount,
    behavior: "smooth", 
  });
};

  return (
    <div className="lg:px-[70px] relative">
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

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-8 items-center overflow-x-auto overflow-y-hidden p-1 whitespace-nowrap scroll-smooth lg:px-[20px]"
      >
        {exclusiveDeals.map((restaurant, i) => {
          const deals = restaurant.menu.find(
            (m) => m.title === "Exclusive Deals"
          );

          return (
            <div
              onClick={() =>
                navigate("/restaurant", { state: restaurant.title })
              }
              key={restaurant.id || i}
              className="flex min-w-[160px] flex-shrink-0 flex-col items-center rounded-lg shadow-gray-400 shadow-[0_0_4px_rgba(0,0,0,0.2)] px-3 py-4 cursor-pointer"
            >
              {deals.deals.map(
                (deal, j) =>
                  deal.show && (
                    <div
                      key={deal.title || j}
                      className="flex flex-col items-center text-center gap-2"
                    >
                      <div className="h-5 w-full flex rounded-md overflow-hidden justify-center">
                        <img
                          className="h-full w-full object-contain"
                          src={deal.logo}
                          alt="Brand Logo"
                        />
                      </div>
                      <img
                        className="w-[90px] h-[80px] object-cover rounded-md"
                        src={deal.img}
                        alt={deal.title}
                      />
                      <div className="relative">
                        <div className="text-[11px] text-gray-500 absolute top-[-4px] left-[-11%] line-through decoration-1">
                          Rs {deal.prevPrice}
                        </div>
                        <div className="text-[18px] text-[#e21b70] font-semibold">
                          Rs {deal.price}
                        </div>
                        <div className="text-[15px] font-medium">
                          {deal.title}
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
