import { motion } from "motion/react";
import Cart from "./Cart";
import { useState } from "react";
import { useCart } from '../contexts/cartContext'

export default function Menu({
  restaurant,
  setSelectedTab,
  menuRef,
  isClicked,
}) {
  const [showCart, setShowCart] = useState(false);
  const {cartData, setCartData} = useCart()

  const handleAddButton = (title, price, desc, img) => {
    setCartData((p) => {
      const existingItem = p.find((f) => f.title === title);
      if (existingItem) {
        return p.map((x) => (x.title === title ? { ...x, qty: x.qty + 1 } : x));
      } else {
        return [
          ...p,
          { title: title, price: price, desc: desc, img: img, qty: 1 },
        ];
      }
    });
  };
  const handleMinusButton = (title) => {
    setCartData((p) =>
      p
        .map((x) => (x.title === title ? { ...x, qty: x.qty - 1 } : x))
        .filter((f) => f.qty > 0),
    );
  };

  return (
    <div className="bg-white pb-[150px]">
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
              <div className="flex flex-col gap-7">
                {x.deals.map((item) => (
                  <div
                    key={item.title}
                    className="relative flex min-h-[150px] w-full rounded-[10px] border border-gray-300 p-3 pr-6 shadow-[0px_0px_2px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex w-[150%] flex-col gap-1">
                      <h2 className="text-[20px] font-[600]">{item.title}</h2>
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
                      className={`ease absolute flex h-[42px] cursor-pointer items-center justify-center text-[25px] font-[500] text-white transition-all duration-200 ${cartData.find((f) => f.title === item.title) ? "right-0 bottom-0 w-[92px] gap-0 rounded-md bg-[#e21b70]" : "right-2 bottom-3 w-[42px] rounded-[50%] bg-gray-500 pb-1.5"}`}
                    >
                      {cartData.find((f) => f.title === item.title) && (
                        <span
                          onClick={() => handleMinusButton(item.title)}
                          className="w-full flex justify-center items-center"
                        >
                          {cartData.find((f) => f.title === item.title)?.qty < 2 ? <i className="fa-regular fa-trash-can text-[16px]"></i> : '-'}
                        </span>
                      )}
                      <span className="text-[18px]">
                        {cartData.find((f) => f.title === item.title)?.qty}
                      </span>

                      <span
                        onClick={() =>
                          handleAddButton(
                            item.title,
                            item.price,
                            item.desc,
                            item.img,
                          )
                        }
                        className="w-full"
                      >
                        +
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
        className={`ease fixed flex items-center justify-center bg-white shadow-[0px_-3px_10px_rgba(0,0,0,0.2)] transition-all duration-200 ${cartData.length > 0 ? "translate-y-0" : "translate-y-[100%]"} bottom-0 z-10 min-h-[110px] w-full`}
      >
        <button
          onClick={() => setShowCart(true)}
          className="flex h-[60px] w-[90%] items-center justify-between rounded-md bg-[#e21b70] px-4 text-white"
        >
          <div className="flex gap-1 h-full items-center px-2"><i className="fa-solid fa-cart-shopping"></i>
          <span>{cartData.reduce((acc, item)=> acc + item.qty, 0)}</span> </div>
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
      />
    </div>
  );
}
