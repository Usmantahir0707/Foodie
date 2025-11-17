import { Link } from "react-router-dom";
import data from "../../data";

export default function RestaurantsFlex() {
  
  return (
      // All Restaurants
      <div className="my-4 pb-8 flex flex-wrap justify-center gap-[50px]">
      {data.map((x, i) => (
        <Link className="flex justify-center scale-[0.95]" key={x.id} to={'/restaurant'} state={x.title}>
        <div
          key={i}
          className="flex w-[95%] bg-gray-100 flex-col gap-1 overflow-hidden rounded-md shadow-[0px_0px_5px_rgba(0,0,0,0.3)] hover:scale-[1.015] hover:shadow-[0px_0px_13px_rgba(226,27,112,0.6)] md:w-[250px]
          active:scale-[1.015] active:shadow-[0px_0px_13px_rgba(226,27,112,0.6)]"
        >
          <img className="w-full object-contain" src={x.assets.img} alt="" />
          <div
            role="title + rating container"
            className="flex justify-between px-[12px]"
          >
            <h1 className="text-[17px] leading-normal font-[500]">
              {x.title}
            </h1>
            <div className="flex items-center justify-between gap-2">
              <i
                className="fa-solid fa-star text-[14px]"
                style={{ color: "#ffae00" }}
              ></i>{" "}
              <span className="text-[14px]">
                {x.assets.rating} <span className="text-gray-400">({x.assets.totalReviews})</span>
              </span>
            </div>
          </div>

          <div className="px-[12px] text-[14px] text-gray-400">
                    <span className="text-[var(--primary-color)]">{x.assets.budget}</span> {x.cuisine}
                  </div>
          <div className="text-gray-400 text-[14px] px-[12px] pb-[12px]">
            <i className="fa-solid fa-clock"></i>
            {''} {x.assets.time} - <i className="fa-solid fa-bicycle"></i>
            {''} <span className="text-[12px]">Rs.{x.assets.fee}</span>
          </div>
        </div>
        </Link>
      ))}
    </div>
    
    
  );
}
