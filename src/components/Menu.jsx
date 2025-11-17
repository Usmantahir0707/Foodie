import { motion } from "motion/react";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/cartContext";
import Overlay from "./Overlay";
import ItemProfile from "./ItemProfile";

export default function Menu({
  restaurant,
  setSelectedTab,
  menuRef,
  isClicked,
}) {
  const [showCart, setShowCart] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { cartData, setCartData } = useCart();
  const [cartArea, setCartArea] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (window.scrollY > 310) {
        setCartArea(true);
      } else {
        window.innerWidth > 1024 && setCartArea(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showOverlay) {
      // Prevent background scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [showOverlay]);

      // == Handle Add
  const handleAddButton = (item) => {
    const { title, price, desc, img } = item;

    if (item.options) {
      const checkExist = cartData.find((f) => f.title === title);

      if(checkExist){
        setCartData((p) =>
            p.map((x) =>
              x.title === title
                ? { ...x, qty: x.qty + 1, resTitle: restaurant.title }
                : { ...x, resTitle: restaurant.title },
            ),
          )
      } else {
        setSelectedItem(item);
      setShowOverlay(true);
      }
      
    } else {
      setCartData((p) => {
        const existingItem = p.find((f) => f.title === title);
        if (existingItem) {
          return p.map((x) =>
            x.title === title
              ? { ...x, qty: x.qty + 1, resTitle: restaurant.title }
              : { ...x, resTitle: restaurant.title },
          );
        } else {
          return [
            ...p,
            {
              title: title,
              price: price,
              desc: desc,
              img: img,
              qty: 1,
              resTitle: restaurant.title,
            },
          ];
        }
      });
    }
  };

  const handleMinusButton = (title) => {
    setCartData((p) =>
      p
        .map((x) => (x.title === title ? { ...x, qty: x.qty - 1 } : x))
        .filter((f) => f.qty > 0),
    );
  };
  console.log(cartData);
  return (
    <div className="bg-white pb-[150px]">
      {/* Item Profile of clicked item*/}
      <div>
        {showOverlay && (
          <div
            onScroll={(e) => e.stopPropagation()}
            className="z-50 overflow-hidden rounded-2xl"
          >
            <ItemProfile
              selectedItem={selectedItem}
              setShowOverlay={setShowOverlay}
            />
          </div>
        )}
      </div>

      {restaurant.menu.map((x) => (
        <motion.section
          ref={(el) => (menuRef.current[x.title] = el)}
          className="mb-6 scroll-mt-[55px] px-4 pt-6"
          key={x.title}
          onViewportEnter={() => !isClicked.current && setSelectedTab(x.title)}
          viewport={{ amount: "0.4", margin: "-10% 0px -85% 0px" }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-[21px] font-[700]">
              {x.title === "Exclusive Deals" ? (
                <i className="fa-solid fa-fire text-amber-400"></i>
              ) : (
                ""
              )}{" "}
              {x.title}
            </h2>
            <div>
              <div className="flex flex-col flex-wrap gap-7 lg:flex-row lg:justify-center">
                {x.deals.map((item) => (
                  <div
                    onClick={() => {
                      setSelectedItem(item);
                      setShowOverlay(true);
                    }}
                    key={item.title}
                    className="relative flex min-h-[150px] w-[full] cursor-pointer rounded-[10px] border border-gray-300 p-3 pr-6 shadow-[0px_0px_4px_rgba(0,0,0,0.4)] hover:shadow-[0px_0px_8px_rgba(226,27,112,0.6)] lg:w-[340px]"
                  >
                    <div className="flex w-[150%] flex-col gap-1">
                      <h2 className="text-[20px] font-[600] lg:text-[18px]">
                        {item.title}
                      </h2>
                      <div className="flex gap-2">
                        <span className="text-[#e21b70]">Rs.{item.price}</span>
                        <span className="line-through decoration-[0.5]">
                          Rs. 345
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="w-full overflow-hidden rounded-md">
                      <img
                        className="h-full object-cover"
                        src={item.img}
                        alt=""
                      />
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className={`ease absolute flex h-[42px] cursor-pointer items-center justify-center text-[25px] font-[500] text-white transition-all duration-200 lg:scale-[0.9] ${cartData.find((f) => f.title === item.title) ? "right-0 bottom-0 w-[120px] gap-2 rounded-md bg-[#e21b70]" : "right-2 bottom-3 w-[41px] rounded-[50%] bg-gray-600 hover:scale-[1.05]"}`}
                    >
                      {cartData.find((f) => f.title === item.title) && (
                        <span
                          onClick={() => handleMinusButton(item.title)}
                          className="flex w-full items-center justify-center"
                        >
                          {cartData.find((f) => f.title === item.title)?.qty <
                          2 ? (
                            <i className="fa-regular fa-trash-can text-[16px]"></i>
                          ) : (
                            "-"
                          )}
                        </span>
                      )}
                      <span className="text-[18px]">
                        {cartData.find((f) => f.title === item.title)?.qty}
                      </span>

                      <span
                        onClick={() => handleAddButton(item)}
                        className="w-full text-[16px]"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      ))}

      <div
        className={`ease fixed flex items-center justify-center bg-white shadow-[0px_-3px_10px_rgba(0,0,0,0.2)] transition-all duration-200 lg:hidden ${cartData.length > 0 ? "translate-y-0" : "translate-y-[100%]"} bottom-0 z-10 min-h-[110px] w-full`}
      >
        <button
          onClick={() => setShowCart(true)}
          className="flex h-[60px] w-[90%] items-center justify-between rounded-md bg-[#e21b70] px-4 text-white"
        >
          <div className="flex h-full items-center gap-1 px-2">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>
              {cartData.reduce((acc, item) => acc + item.qty, 0)}
            </span>{" "}
          </div>
          <div className="flex h-full items-center px-3 text-[18px]">
            view cart
          </div>
          <div className="flex h-full items-center px-1">
            Rs.{" "}
            {cartData.reduce(
              (acc, item) => acc + Number(item.price) * Number(item.qty),
              0,
            )}
          </div>
        </button>
      </div>

      <Cart
        restaurant={restaurant}
        setShowCart={setShowCart}
        showCart={showCart}
        cartData={cartData}
        setCartData={setCartData}
        cartArea={cartArea}
      />
    </div>
  );
}
