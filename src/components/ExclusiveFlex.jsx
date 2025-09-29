import { Navigate, useNavigate } from "react-router-dom";
import data from "../../data";

export default function ExclusiveFlex() {
  const navigate = useNavigate();
  const exclusiveDeals = data.filter((f) =>
    f.menu.some((s) => s.title === "Exclusive Deals")
  );

  return (
    <div className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-hidden p-1 whitespace-nowrap">
      {exclusiveDeals.map((restaurant, i) => {
        const deals = restaurant.menu.find((m) => m.title === "Exclusive Deals");

        return (
          <div
            onClick={()=> navigate('/restaurant', {state: restaurant.title})}
            key={restaurant.id || i}
            className="flex min-w-[160px] flex-shrink-0 flex-col items-center rounded-lg shadow-gray-400 shadow-[0_0_6px_rgba(0,0,0,0.2)] px-3 py-4"
          >
            {deals.deals.map((deal, j) => 
           deal.show ? (
              <div key={deal.title || j} className="flex flex-col  items-center text-center gap-4">
                {/* Logo */}
                <div className="h-7 w-[100%] flex rounded-md overflow-hidden justify-center">
                  <img
                    className="h-full w-full object-contain"
                    src={deal.logo}
                    alt="Brand Logo"
                  />
                </div>

                {/* Deal Image */}
                <img
                  className="w-[110px] h-[100px] object-cover rounded-md"
                  src={deal.img}
                  alt={deal.title}
                />

                {/* Prices */}
                <div className="relative">
                  <div className="text-sm text-gray-500 absolute top-[-11px] left-[25%] line-through decoration-1">Rs {deal.prevPrice}</div>
                <div className="text-md text-[#e21b70] font-semibold">Rs {deal.price}</div>
                  <div className="text-[15px] font-medium">{deal.title}</div>
                </div>
                

                {/* Title */}
                
              </div>
            ) : ''
          )}
          </div>
        );
      })}
    </div>
  );
}
