import { useEffect, useRef, useState } from "react";
import Overlay from "./Overlay";
import data from "../../data";
import Input from "./Input";
import { useSearch } from "../contexts/searchContext";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const {
    searchInput,
    setSearchInput,
    showOverlay,
    setShowOverlay,
    showPop,
    setShowPop,
  } = useSearch();
  const popularRef = useRef();
  const crossRef = useRef();
  const navigate = useNavigate();

  const popular = [
    "pizza",
    "whopper",
    "cafe",
    "kfc",
    "burger king",
    "pakistani",
    "kebab",
    "subway",
    "zinger",
    "mcdonalds",
    "mocha",
  ];

  useEffect(() => {
    if (searchInput === "") {
      setShowPop(true);
    } else {
      setShowPop(false);
    }
  }, [searchInput]);

  const handleBlur = () => {
    setTimeout(() => {
      const active = document.activeElement;
      if (popularRef.current?.contains(active) || crossRef.current?.contains(active)) return;
      setShowOverlay(false);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowOverlay(false);
      navigate("/search-result", { state: {query: searchInput} });
    }
  };

  const crossHandler = () => {
    if(showOverlay){
      setShowOverlay(true)
      setSearchInput('')
    }else{
      setSearchInput('')
      navigate('/home')
    }
  }

  return (
    <>
      <div role="search-wrapper" className="mt-6 w-2xs justify-self-center">
        <Input
          startIcon={showPop ? "glass" : ""}
          onKeyDown={handleKeyDown}
          type="search"
          placeholder={"Search for restaurants"}
          tail="ring-blue-500 z-35 relative ring-offset-2 focus-within:ring-[5px] ring-offset-white"
          value={searchInput}
          tailInput='custom-search'
          onFocus={() => setShowOverlay(true)}
          onBlur={() => handleBlur()}
          onChange={(e) => setSearchInput(e.target.value)}
          endIcon={showPop ? "filter" : "cross"}
          showOverlay={showOverlay}
          crossHandler={crossHandler}
          crossRef={crossRef}
        />
      </div>

      {showOverlay && (
        <Overlay setShowOverlay={setShowOverlay}>
          {showPop ? (
            <div
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              ref={popularRef}
              className="mt-[4px] mr-5 flex w-[280px] animate-[fader_0.8s_ease] flex-col justify-self-center rounded-md bg-white px-6 py-2 pb-8 text-start"
            >
              <div className="flex items-center gap-1">
                <i className="fa-solid fa-star text-amber-700"></i>
                <h3 className="text-[18px] font-[500] text-black">
                  Popular Searches
                </h3>
              </div>
              <div className="mt-6 flex w-full flex-wrap gap-3">
                {popular.map((x) => (
                  <div
                    key={x}
                    onClick={() => {
                      setSearchInput(x);
                      setShowOverlay(false);
                      navigate("/search-result", { state: { query: x } });
                    }}
                    className="cursor-pointer rounded-xl bg-[#EDEDED] px-3 pt-1 pb-2 shadow-md transition-colors duration-200 hover:bg-gray-300 active:scale-[0.98]"
                  >
                    {x}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-1 mr-3 flex max-h-[200px] w-[240px] flex-col gap-1 justify-self-center overflow-y-auto rounded-b-md bg-white text-start">
              {data
                .flatMap((f) => {
                  const query = searchInput.toLowerCase();

                  const titleMatch = f.title.toLowerCase().includes(query);
                  const cuisineMatch = f.cuisine.toLowerCase().includes(query);

                  const matchingDeals = f.menu.flatMap((section) =>
                    section.deals
                      .filter(
                        (deal) =>
                          deal.title.toLowerCase().includes(query) ||
                          deal.desc.toLowerCase().includes(query),
                      )
                      .map((deal) => deal.title),
                  );

                  if (titleMatch || cuisineMatch) {
                    return [f.title];
                  }

                  if (matchingDeals.length > 0) {
                    return matchingDeals;
                  }

                  return [];
                })
                .map((item, index) => (
                  <div
                    className="px-4 pt-1 pb-2 text-[15px] shadow-[0px_1px_3px_rgba(0,0,0,0.2)]"
                    key={index}
                    onClick={()=>{
                      setSearchInput(item)
                      setShowOverlay(false)
                      navigate("/search-result", { state: { query: item } })
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
          )}
        </Overlay>
      )}
    </>
  );
}
