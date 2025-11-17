import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function ExclusiveFlex() {
  const [exclusiveDeals, setExclusiveDeals] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Usmantahir0707/Foodie/refs/heads/main/data.js",
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setExclusiveDeals((p) =>
          data.filter((f) => f.menu.some((s) => s.title === "Exclusive Deals")));
      })
      .catch((e) => console.log(e))
  }, []);

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
        className="absolute top-[50%] left-[10px] z-10 hidden h-[45px] w-[45px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 shadow hover:bg-gray-300 active:text-[var(--primary-color)] lg:flex"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      {/* Right scroll button */}
      <button
        onClick={() => scrollBy("right")}
        className="absolute top-[50%] right-[10px] z-10 hidden h-[45px] w-[45px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 shadow hover:bg-gray-300 active:text-[var(--primary-color)] lg:flex"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex items-center gap-8 overflow-x-auto overflow-y-hidden scroll-smooth p-1 whitespace-nowrap lg:px-[20px]"
      >
        {exclusiveDeals.map((restaurant, i) => {
          const deals = restaurant.menu.find(
            (m) => m.title === "Exclusive Deals",
          );

          return (
            <div
              onClick={() =>
                navigate("/restaurant", { state: restaurant.title })
              }
              key={restaurant.id || i}
              className="flex min-w-[160px] flex-shrink-0 cursor-pointer flex-col items-center rounded-lg px-3 py-4 shadow-[0_0_4px_rgba(0,0,0,0.2)] shadow-gray-400"
            >
              {deals.deals.map(
                (deal, j) =>
                  deal.show && (
                    <div
                      key={deal.title || j}
                      className="flex flex-col items-center gap-2 text-center"
                    >
                      <div className="flex h-5 w-full justify-center overflow-hidden rounded-md">
                        <img
                          className="h-full w-full object-contain"
                          src={deal.logo}
                          alt="Brand Logo"
                        />
                      </div>
                      <img
                        className="h-[80px] w-[90px] rounded-md object-cover"
                        src={deal.img}
                        alt={deal.title}
                      />
                      <div className="relative">
                        <div className="absolute top-[-4px] left-[-11%] text-[11px] text-gray-500 line-through decoration-1">
                          Rs {deal.prevPrice}
                        </div>
                        <div className="text-[18px] font-semibold text-[#e21b70]">
                          Rs {deal.price}
                        </div>
                        <div className="text-[15px] font-medium">
                          {deal.title}
                        </div>
                      </div>
                    </div>
                  ),
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
