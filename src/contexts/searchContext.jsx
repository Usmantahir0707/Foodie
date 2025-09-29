import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) { 
  const [searchInput, setSearchInput] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [showPop, setShowPop] = useState(true);

  return <SearchContext.Provider
    value={{searchInput, setSearchInput, showOverlay, setShowOverlay, showPop, setShowPop}}
  >
    {children}
    </SearchContext.Provider>
}


export function useSearch() {
  return (
    useContext(SearchContext)
  )
}

