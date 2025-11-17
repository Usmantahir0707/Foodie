import { useRef } from "react";

export default function Filters({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
}) {
  const sortArray = ["Relevance", "Fastest delivery", "Distance", "Top Rated"];
  const offersArray = ["Free-delivery", "Accepts-voucher", "Deals"];
  const scrollRef = useRef()

  const handleApply = () => {};

  const scrollBy = (direction, amount = 250) => {
  const target = scrollRef.current;
  if (!target) return;

  target.scrollBy({
    top: direction === "top" ? -amount : amount,
    behavior: "smooth", 
  });
};

  return (
    // Scrollable Flex col
    <div 
    ref={scrollRef}
    className="flex h-full w-full flex-col gap-6 overflow-y-auto rounded-tr-[10px] rounded-br-[10px] p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Scroll up button (hidden in phones)*/}
      <div 
      onClick={()=> scrollBy('top')}
      className="absolute active:text-[var(--primary-color)] top-2 right-3 hidden cursor-pointer rounded-3xl bg-gray-200 p-2 px-3 lg:inline-block">
        <button>
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      </div>

      {/* Heading */}
      <div className="flex items-center gap-2">
        <h2 className="text-[25px] font-[700] sm:text-[18px]">Filters</h2>
        <span
          onClick={() => {
            setFilters({
              sort: "",
              quickFilters: "",
              offers: "",
              price: "",
            });
            setShowFilters(false);
          }}
          className="hidden cursor-pointer items-center gap-1 text-[12px] text-gray-500 hover:scale-[1.08] active:scale-[0.99] sm:flex"
        >
          (<i className="fa-solid fa-eraser text-[var(--primary-color)]"></i>
          <span>Remove all</span>)
        </span>
      </div>

      <div className="flex flex-col gap-7 pb-[28px]">
        {/* Sort section */}
        <div>
          <h3 className="text-[18px] font-[600] sm:text-[15px]">Sort by</h3>
          <div className="flex flex-col gap-0.5 lg:gap-0">
            {sortArray.map((x) => (
            <div
              onClick={() => {
                if (x === "Relevance") {
                  setFilters((p) => ({ ...p, sort: "" }));
                } else {
                  filters.sort !== x
                    ? setFilters((p) => ({ ...p, sort: x }))
                    : setFilters((p) => ({ ...p, sort: "" }));
                }
              }}
              key={x}
              className="group flex w-fit items-center gap-2 px-2 hover:cursor-pointer"
            >
              <div
                role="round with border"
                className={`h-[12px] w-[12px] rounded-[50%] border-1 group-hover:border-2 ${filters.sort === x && "border-3"} ${filters.sort === "" && x === "Relevance" ? "border-3" : "border-1"}`}
              ></div>
              <span className="text-[16px] sm:text-[14px]">{x}</span>
            </div>
          ))}
          </div>
          
        </div>

        {/* Quick filters section */}
        <div role="Quick-filters" className="flex flex-col gap-2">
          <h3 className="text-[18px] font-[600] sm:text-[15px]">
            Quick filters
          </h3>

          <span
            onClick={() =>
              filters.quickFilters === "rating"
                ? setFilters((p) => ({ ...p, quickFilters: "" }))
                : setFilters((p) => ({ ...p, quickFilters: "rating" }))
            }
            className={`w-fit cursor-pointer rounded-3xl border-1 border-dotted border-[var(--primary-color)] p-1 px-3 text-[18px] shadow-[0px_0px_2px_rgba(0,0,0,0.4)] hover:bg-[var(--primary-color)] hover:text-white sm:text-[16px] ${filters.quickFilters === "rating" && "bg-[var(--primary-color)] text-white"}`}
          >
            Ratings 4+
          </span>

          <span
            onClick={() =>
              filters.quickFilters === "super"
                ? setFilters((p) => ({ ...p, quickFilters: "" }))
                : setFilters((p) => ({ ...p, quickFilters: "super" }))
            }
            className={`w-fit cursor-pointer rounded-3xl border-1 border-dotted border-[var(--primary-color)] p-1.5 px-3 text-[18px] shadow-[0px_0px_2px_rgba(0,0,0,0.4)] hover:bg-[var(--primary-color)] hover:text-white sm:text-[16px] ${filters.quickFilters === "super" && "bg-[var(--primary-color)] text-white"}`}
          >
            🌟 Super restaurants
          </span>
        </div>

        {/* Offers */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] font-[600] sm:text-[15px]">Offers</h3>
          {offersArray.map((x) => (
            <div
              onClick={()=> filters.offers.includes(x) ? setFilters((p)=> ({...p, offers: p.offers.replace(x, '')})) : setFilters((p)=> ({...p, offers: p.offers + x}))}
              key={x}
              className="group flex w-fit cursor-pointer items-center gap-2 px-2"
            >
              <div
                role="box with border"
                className={`h-[16px] w-[16px] border-1 group-hover:border-2 flex text-[12px] justify-center items-center`}
              >{filters.offers.includes(x) && '✔️'}</div>
              <p>{x}</p>
            </div>
          ))}
        </div>

        {/* Price filter */}
        <div>
          <h3 className="mb-2 text-[18px] font-[600] sm:text-[15px]">Price</h3>
          <div className="flex gap-2">
            <span 
            onClick={()=> filters.price === '$' ? setFilters((p)=> ({...p, price: ''})) : setFilters((p)=> ({...p, price: '$'}))}
            className={`cursor-pointer rounded-2xl border-1 border-dotted border-[var(--primary-color)] p-1 px-3 shadow-[0px_0px_2px_rgba(0,0,0,0.4)] hover:bg-[var(--primary-color)] hover:text-white
            ${filters.price === '$' && 'bg-[var(--primary-color)] text-white'}`}>
              $
            </span>

            <span
            onClick={()=> filters.price === '$$' ? setFilters((p)=> ({...p, price: ''})) : setFilters((p)=> ({...p, price: '$$'}))}
            className={`cursor-pointer rounded-2xl border-1 border-dotted border-[var(--primary-color)] p-1 px-3 shadow-[0px_0px_2px_rgba(0,0,0,0.4)] hover:bg-[var(--primary-color)] hover:text-white
            ${filters.price === '$$' && 'bg-[var(--primary-color)] text-white'}`}>
              $$
            </span>

            <span 
            onClick={()=> filters.price === '$$$' ? setFilters((p)=> ({...p, price: ''})) : setFilters((p)=> ({...p, price: '$$$'}))}
            className={`cursor-pointer rounded-2xl border-1 border-dotted border-[var(--primary-color)] p-1 px-3 shadow-[0px_0px_2px_rgba(0,0,0,0.4)] hover:bg-[var(--primary-color)] hover:text-white
            ${filters.price === '$$$' && 'bg-[var(--primary-color)] text-white'}`}>
              $$$
            </span>
          </div>
        </div>
      </div>

      {/* Scroll down button (hidden in phones)*/}
      <div 
      onClick={()=> scrollBy('bottom')}
      className="absolute right-3 bottom-2 hidden cursor-pointer rounded-3xl bg-gray-200 p-2 px-3 sm:inline-block active:text-[var(--primary-color)]">
        <button>
          <i className="fa-solid fa-chevron-down"></i>
        </button>
      </div>
      {/* ========================================================== */}

      {/* Phone Buttons */}
      {/* //Asolute close button */}
      <div
        onClick={() => setShowFilters(false)}
        className="absolute top-4 right-5 w-fit p-2 lg:hidden rounded-[50%] active:scale-[0.98]"
      >
        <i className="fa-regular fa-circle-xmark text-[26px]"></i>
      </div>

      {/*flex ==  Remove-all and Apply button*/}
      <div className="flex justify-center gap-7 p-2 ">
        <button
          onClick={() => {
            setFilters({
              sort: "",
              quickFilters: "",
              offers: "",
              price: "",
            });
            setShowFilters(false);
          }}
          className="w-[120px] rounded-md bg-gray-200 p-3 text-[18px] lg:p-2 lg:text-[14px] lg:translate-y-[-30px]
          lg:flex lg:justify-self-center lg:mr-12 lg:justify-center"
        >
          Clear all
        </button>

        <button
          onClick={() => setShowFilters(false)}
          className={`w-[120px] lg:hidden rounded-md bg-[var(--primary-color)] p-3 text-[18px] text-white`}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
