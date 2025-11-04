import { motion } from "motion/react";
import data from "../../data";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FilteredResults({ filters, setFilters }) {
  const [filteredData, setFilteredData] = useState([]);

  // recompute whenever filters will change
  useEffect(() => {
    const arr = Object.values(filters);

    const results = data.filter((f) => {
      if (arr.includes("Free-delivery") && !f.assets.freeDelivery) return false;
      if (arr.includes("Fastest delivery") && parseInt(f.assets.time) > 30)
        return false;
      if (arr.includes("Distance") && f.assets.distance > 5) return false;
      if (arr.includes("Top Rated") && f.assets.rating < 4.5) return false;
      if (arr.includes("rating") && f.assets.rating < 4) return false;
      if (arr.includes("super") && !f.assets.super) return false;
      if (arr.includes("Accepts-voucher") && !f.assets.acceptsVoucher)
        return false;
      if (arr.includes("Deals") && f.menu[0].title !== "Exclusive Deals")
        return false;
      if (filters.price === "$" && f.assets.budget !== "$") return false;
      if (filters.price === "$$" && f.assets.budget !== "$$") return false;
      if (filters.price === "$$$" && f.assets.budget !== "$$$") return false;
      return true;
    });

    setFilteredData(results);
  }, [filters]);

  return (
    <div className="overflow-x-hidden fixed lg:static inset-0 z-[99] bg-white">
         {/* back / clear button */}
        <div className="fixed top-[20px] lg:top-[120px] left-2 lg:left-[310px] cursor-pointer z-10">
          <button
            onClick={() =>
              setFilters({ sort: "", quickFilters: "", offers: "", price: "" })
            }
          >
            <i className="fa-solid fa-circle-xmark text-[42px] text-gray-500 p-1
            active:shadow-2xl"></i>
          </button>
        </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 p-4 lg:pl-[325px]"
      >
       
    

        {/* heading */}
        <div className="text-center">
          <h2 className="text-[22px] font-[600] text-gray-700">
            Filtered Results
          </h2>
          <p className="text-gray-500">
            Showing {filteredData.length}{" "}
            {filteredData.length === 1 ? "restaurant" : "restaurants"}
          </p>
        </div>

        {/* Applied filters */}
        <div className="flex max-w-[80%] flex-wrap gap-3">
          {Object.values(filters).map(
            (x) =>
              x !== "" && (
                <div
                  key={x}
                  className="rounded-2xl bg-blue-400 p-1 px-2 text-[12px] text-white"
                >
                  {x
                    .replace("Free-delivery", "Delivery")
                    .replace("Accepts-voucher", "Voucher")}
                </div>
              ),
          )}
        </div>

        {/* Results */}
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {filteredData.length > 0 ? (
            filteredData.map((x, i) => (
              <Link
                className="flex scale-[0.95] justify-center"
                key={x.id}
                to="/restaurant"
                state={x.title}
              >
                <div className="flex w-[95%] flex-col gap-1 overflow-hidden rounded-md bg-gray-100 shadow-[0px_0px_5px_rgba(0,0,0,0.3)] md:w-[250px]">
                  <img
                    className="w-full object-contain"
                    src={x.assets.img}
                    alt=""
                  />
                  <div className="flex justify-between px-[12px]">
                    <h1 className="text-[17px] font-[500]">{x.title}</h1>
                    <div className="flex items-center gap-2">
                      <i
                        className="fa-solid fa-star text-[14px]"
                        style={{ color: "#ffae00" }}
                      ></i>
                      <span className="text-[14px]">
                        {x.assets.rating}{" "}
                        <span className="text-gray-400">
                          ({x.assets.totalReviews})
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="px-[12px] text-[14px] text-gray-400">
                    <span className="text-[var(--primary-color)]">
                      {x.assets.budget}
                    </span>{" "}
                    {x.cuisine}
                  </div>
                  <div className="px-[12px] pb-[12px] text-[14px] text-gray-400">
                    <i className="fa-solid fa-clock"></i> {x.assets.time} -{" "}
                    <i className="fa-solid fa-bicycle"></i>{" "}
                    <span className="text-[12px]">Rs.{x.assets.fee}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-8">
              🚫 No restaurants matched your selected filters.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
