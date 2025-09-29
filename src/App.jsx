import "./App.css";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { SearchProvider } from "./contexts/searchContext";
import {CartProvider} from "./contexts/cartContext";
import { FirebaseProvider } from "./contexts/fireBaseContext";

function App() {
  const location = useLocation();
  const [fullHeader, setFullHeader] = useState(true);
  const [blockHeader, setBlockHeader] = useState(false);

  useEffect(() => {
    !["/home", "/pick-up", "/shop"].includes(location.pathname)
      ? setFullHeader(false)
      : setFullHeader(true);
    ["/restaurant"].includes(location.pathname)
      ? setBlockHeader(true)
      : setBlockHeader(false);
  }, [location.pathname]);

  return (
    <>
       
      <div>
        <FirebaseProvider>
          <SearchProvider>
          <CartProvider>
            {!["/", "/login", "/profile-completion"].includes(location.pathname) && (
        <Header blockHeader={blockHeader} fullHeader={fullHeader} />
      )}
            <Outlet />
          </CartProvider>
        </SearchProvider>
        </FirebaseProvider>        
      </div>
      <ScrollRestoration />
    </>
  );
}

export default App;
