import delivery from "../assets/delivery.png";
import ExclusiveFlex from "./ExclusiveFlex";
import RestaurantsFlex from "./RestaurantsFlex";
import CuisineFlex from "./CuisineFlex";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { useEffect, useState } from "react";
import { useSearch } from "../contexts/searchContext";
import { motion } from "motion/react";
import FilteredResults from "./FilteredResults";

export default function Home() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    sort: "",
    quickFilters: "",
    offers: "",
    price: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showFilterResults, setShowFilterResults] = useState(false);
  const { showOverlay } = useSearch();

  useEffect(() => {
    console.log(filters)
    const valuesCheck = Object.values(filters).every((x)=> x === '')
    console.log(valuesCheck)
    
    if (valuesCheck) {
      setShowFilterResults(false);
    } else {
      setShowFilterResults(true);
    }
  }, [filters]);

  return (
    <div>
      {/* Fixed Filter Menu =============================== */}
      <div
        className={`fixed inset-0 z-40 transform rounded-tr-[10px] rounded-br-[10px] bg-white p-3 shadow-[0_0_6px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out lg:top-[111px] lg:bottom-[0px] lg:left-0 lg:w-[280px] lg:p-0 lg:pr-0.5 lg:pb-0.5 ${showFilters && !showOverlay && "translate-x-0 lg:translate-x-0"} ${showFilters && showOverlay && "translate-0"} ${showOverlay && !showFilters && "translate-x-[-100%]"} ${!showFilters && !showOverlay && "translate-x-[-100%] lg:translate-x-0"} `}
      >
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* Main ===============*/}
      {!showFilterResults ? (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col pr-4 pl-4 lg:pl-[340px]"
        >
          {/* search */}
          <Search setShowFilters={setShowFilters} />

          {/* promo */}
          <div
            role="signUp-promo"
            className="relative mt-5 h-[120px] w-full rounded-[8px] bg-[#FFDDDD] p-3 px-4 text-[16px] font-[600] text-[#2E3138] lg:w-[90%]"
          >
            <h2>
              Free delivery on first <br /> order
            </h2>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 flex items-center rounded-[4px] bg-[#e21b70] px-[16px] py-2 text-[11px] font-[500] text-white"
            >
              Sign up
            </button>
            <img
              className="absolute top-2 right-4 w-[100px]"
              src={delivery}
              alt=""
            />
          </div>

          {/* Exclusive flex */}
          <section
            role="deals-wrapper"
            className="mt-4 flex flex-col gap-2 text-[20px] font-[500]"
          >
            <h2 className="text-[19px]">Exclusive Deals</h2>
            <ExclusiveFlex />
          </section>

          {/* Cousine Flex */}
          <section
            role="Cuisine-wrapper"
            className="mt-6 flex flex-col gap-3 text-2xl font-[500]"
          >
            <h2>Cuisines for you</h2>
            <CuisineFlex />
          </section>

          {/* All- Restaurants */}
          <section role="All-Restaurants" className="mt-8 text-2xl font-[500]">
            <h2 className="mb-[20px]">All Restaurants</h2>
            <RestaurantsFlex />
          </section>
        </motion.main>
      ) : (
        // Filtered ============
        <FilteredResults filters={filters} setFilters={setFilters} />
      )}
    </div>
  );
}
