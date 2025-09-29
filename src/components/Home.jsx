import delivery from "../assets/delivery.png";
import ExclusiveFlex from "./ExclusiveFlex";
import RestaurantsFlex from "./RestaurantsFlex";
import CuisineFlex from "./CuisineFlex";
import Search from "./Search";

export default function Home() {
  return (
    <main className="pr-4 pl-4 md:pl-[300px] ">
      <Search/>
      <div
        role="signUp-promo"
        className="relative mt-6 h-[142px] rounded-[8px] bg-[#FFDDDD] p-3 px-4 text-[1.3rem] font-[600] text-[#2E3138]"
      >
        <h2>
          Free delivery on first <br /> order
        </h2>
        <button className="mt-2 flex items-center rounded-[10px] bg-[#e21b70] px-[16px] py-1 pb-1.5 text-[14px] font-[500] text-white">
          Sign up
        </button>
        <img
          className="absolute top-2 right-4 w-[120px]"
          src={delivery}
          alt=""
        />
      </div>

      <section
        role="deals-wrapper"
        className="mt-4 flex flex-col gap-1.5 text-2xl font-[500]"
      >
        <h2>Exclusive Deals</h2>
        <ExclusiveFlex />
      </section>

      <section
        role="Cuisine-wrapper"
        className="mt-4 flex flex-col gap-1.5 text-2xl font-[500]"
      >
        <h2>Cuisines for you</h2>
        <CuisineFlex />
      </section>

      <section role="All-Restaurants" className="mt-6 text-2xl font-[500]">
        <h2>All Restaurants</h2>
        <RestaurantsFlex />
      </section>
    </main>
  );
}
