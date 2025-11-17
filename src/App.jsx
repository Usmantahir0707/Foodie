import "./App.css";
import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import { SearchProvider } from "./contexts/searchContext";
import { CartProvider } from "./contexts/cartContext";
import { FirebaseProvider } from "./contexts/fireBaseContext";

function App() {
  const location = useLocation();
  const [fullHeader, setFullHeader] = useState(true);
  const [blockHeader, setBlockHeader] = useState(false);
  const recaptchaRef = useRef();

  useEffect(() => {
    if (!recaptchaRef.current) return;

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          observer.disconnect();

          setTimeout(() => {
            if (recaptchaRef.current) {
              recaptchaRef.current.style.opacity = "0";
              recaptchaRef.current.style.transition = "opacity 0.5s";
              setTimeout(() => {
                recaptchaRef.current.style.display = "none";
              }, 500);
            }
          }, 10000);

          break;
        }
      }
    });

    observer.observe(recaptchaRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

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
              {!["/", "/login", "/profile-completion"].includes(
                location.pathname,
              ) && <Header blockHeader={blockHeader} fullHeader={fullHeader} />}
              <div ref={recaptchaRef} id="recaptcha-container"></div>
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
