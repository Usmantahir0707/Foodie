import { useEffect, useRef, useState } from "react";

export default function Cart({
  restaurant,
  setShowCart,
  showCart,
  cartData,
  setCartData,
}) {
  const scrollRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [maxScrolled, setMaxScrolled] = useState(true);
  const [option, setOption] = useState("delivery");
  const subTotal = cartData.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  useEffect(() => {
    setMaxScrolled(cartData.length < 3);
  }, [cartData]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setScrolled(el.scrollTop > 0);
      setMaxScrolled(el.scrollHeight - el.scrollTop <= el.clientHeight + 1);
    };

    el.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      setMaxScrolled(cartData.length < 2);
    }, 50);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMinus = (title) => {
    setCartData((p) =>
      p
        .map((x) => (x.title === title ? { ...x, qty: x.qty - 1 } : x))
        .filter((f) => f.qty > 0),
    );
  };
  const handleAdd = (title) => {
    setCartData((p) =>
      p.map((x) => (x.title === title ? { ...x, qty: x.qty + 1 } : x)),
    );
  };

  return (
    <div
      className={`ease fixed inset-0 z-10 overflow-hidden bg-white transition-all duration-[200ms] md:inset-[15%_0_15%_70%] ${showCart ? "translate-x-0" : "translate-x-[100%]"}`}
    >
      {/* //////// HEader */}
      <header
        className={`flex justify-between p-[16px] ${scrolled ? "shadow-[0px_3px_10px_rgba(0,0,0,0.2)]" : ""}`}
      >
        <div>
          <h2 className="text-[20px] font-bold">Cart</h2>
          <p className="text-gray-500">
            {restaurant.title} - {restaurant.cuisine}
          </p>
        </div>

        <button
          onClick={() => setShowCart(false)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-2xl shadow-[0px_0px_8px_rgba(0,0,0,0.3)]"
        >
          <i className="fa-solid fa-xmark text-[22px] text-gray-600"></i>
        </button>
      </header>

      <div className="flex h-full flex-col pt-[16px]">
        {/* ///////// Mid area with Y auto */}
        <div
          ref={scrollRef}
          className="flex flex-col overflow-x-hidden overflow-y-auto px-4 pb-[265px]"
        >
          <div className="flex w-full justify-between bg-gray-100 p-2">
            <button
              onClick={() => setOption("delivery")}
              className={`w-full ${option === "delivery" ? "rounded-md border border-gray-300 bg-white p-1.5 px-4" : ""} `}
            >
              <h3 className="font-[500]">Delivery</h3>
              <p className="text-[14px]">Standard (45 - 60 mins)</p>
            </button>
            <button
              onClick={() => setOption("pick-up")}
              className={`w-full ${option === "pick-up" ? "rounded-md border border-gray-300 bg-white p-1.5 px-4 py-[17px]" : ""} `}
            >
              Pick-up
            </button>
          </div>

          {/* \\\\\\\ Empty-Cart image */}
          {!cartData.length > 0 ? (
            <div className="flex justify-center pt-[150px]">
              <div className="flex flex-col items-center gap-1">
                <img
                  className="mb-3 max-w-[100px]"
                  src="	https://foodpanda.dhmedia.io/image/bento/production/web/fp/empty-state/illu_cart_empty.svg"
                  alt=""
                />
                <h2 className="text-[20px] font-[700]">Hungry?</h2>
                <p>You haven't added anything to your cart!</p>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="mt-[16px]">
            {cartData.length > 0 ? (
              <h3 className="text-[18px] font-[700]">Your items</h3>
            ) : (
              ""
            )}

            {/* == Items Map == */}
            {cartData.map((x) => (
              <div
                key={x.title}
                className="flex gap-2 border-b border-gray-300 py-4"
              >
                <div className="w-[25%]">
                  <img src={x.img} alt="" />
                </div>

                <div className="flex w-full flex-col justify-center gap-1.5">
                  <h2>{x.title}</h2>
                  <div className="flex items-center justify-between">
                    <p>Rs. {x.price * x.qty}</p>
                    <div className="flex h-[32px] w-[90px] items-center justify-between gap-2 rounded-2xl shadow-[0px_0px_3px_rgba(0,0,0,0.2)]">
                      <span
                        onClick={() => handleMinus(x.title)}
                        className="flex h-full w-full items-center justify-center rounded-2xl shadow-[0px_0px_3px_rgba(0,0,0,0.2)]"
                      >
                        {x.qty < 2 ? (
                          <i className="fa-regular fa-trash-can"></i>
                        ) : (
                          "-"
                        )}
                      </span>
                      <span>{x.qty}</span>
                      <span
                        onClick={() => handleAdd(x.title)}
                        className="flex h-full w-full items-center justify-center rounded-[50%] shadow-[0px_0px_3px_rgba(0,0,0,0.2)]"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              {cartData.length > 0 ? (
                <>
                  {" "}
                  <div className="flex items-center gap-2 border-b border-gray-300 py-6">
                    <i
                      onClick={() => setShowCart(false)}
                      className="fa-solid fa-plus pt-0.5 text-[17px]"
                    ></i>
                    <p onClick={() => setShowCart(false)}>Add more items</p>
                  </div>
                  <dl className="flex flex-col gap-1 pt-[16px]">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>Rs. {subTotal}</dd>
                    </div>
                    {option === "delivery" ? (
                      <div className="flex justify-between">
                        <dt>Standard delivery</dt>
                        <dd>Rs. {Number(restaurant.assets.fee)}</dd>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="flex justify-between">
                      <dt>Service fee ⓘ</dt>
                      <dd>Rs. 9</dd>
                    </div>
                  </dl>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* //////// Bottom fixed total area */}
        <div
          className={`fixed bottom-0 flex w-full flex-col gap-4 bg-white pt-3 pb-5 ${!maxScrolled ? "shadow-[0px_-3px_10px_rgba(0,0,0,0.2)]" : ""}`}
        >
          <div className="flex justify-between px-5">
            <div>
              <h5 className="text-[18px] font-[400]">Total</h5>
              <p
                onClick={() =>
                  scrollRef.current.scrollTo({
                    top: scrollRef.current.scrollHeight,
                    behavior: "smooth",
                  })
                }
                className="underline decoration-1 underline-offset-3"
              >
                See summary
              </p>
            </div>

            <div className="text-[18px] font-[400]">
              Rs.{" "}
              {cartData.length > 0
                ? subTotal +
                  (option === "delivery" ? Number(restaurant.assets.fee) : 0) +
                  9
                : "0"}
            </div>
          </div>
          <div className="flex w-full justify-center px-5">
            <button
              onClick={() => console.log("first")}
              className={`h-[50px] w-full rounded-md font-[500] text-white ${cartData.length > 0 ? "bg-[#e21b70]" : "pointer-events-none bg-gray-400"}`}
            >
              Review payment and address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
