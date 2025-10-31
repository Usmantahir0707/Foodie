import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import { useCart } from "../contexts/cartContext";

export default function ItemProfile({ selectedItem, setShowOverlay }) {
  const [showSticky, setShowSticky] = useState(false);
  const { cartData, setCartData } = useCart();
  const [count, setCount] = useState(
    (p) => cartData.find((f) => f.title === selectedItem.title)?.qty ?? 1,
  );
  const [options, setOptions] = useState((p) => {
    if (selectedItem.options) {
      return selectedItem.options.map((x) => ({
        title: x.title,
        selectedOption: null,
      }));
    } else {
      return null;
    }
  });


  const handleAddCart = () => {
    setCartData((p) => {
      const exist = p.find((f) => f.title === selectedItem.title);
      return exist
        ? p.map((x) =>
            x.title === selectedItem.title ? { ...x, qty: count } : x,
          )
        : [
            {
              title: selectedItem.title,
              desc: selectedItem.desc,
              img: selectedItem.img,
              price: selectedItem.price,
              qty: count,
            },
          ];
    });

    setShowOverlay(false);
  };

  return (
    <Overlay setShowOverlay={setShowOverlay} style={{ paddingTop: "100px" }}>
      {/* flex-col scrollable item-display and options*/}
      <div
        onClick={(e) => e.stopPropagation()}
        onScroll={(e) =>
          e.target.scrollTop > 260 ? setShowSticky(true) : setShowSticky(false)
        }
        className="fixed top-[15dvh] bottom-0 flex w-full flex-col justify-self-center overflow-x-hidden overflow-y-auto rounded-2xl bg-white pb-[200px] sm:top-[9dvh] sm:bottom-[40px] sm:max-w-[500px] md:max-w-[600px]"
      >
        {/* sticky close button */}
        <div
          onClick={() => {
            setShowOverlay(false);
            setShowSticky(false);
          }}
          className={`${!showSticky ? "" : "spinLittle"} sticky top-0 z-20 self-end p-1 px-2`}
        >
          <button className="text-[28px] text-gray-500">
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>

        {/* dynamic sticky header */}
        <header
          className={`bg-gray-100 p-2 text-[20px] shadow-md ${
            showSticky ? "sticky top-0 translate-y-0" : "translate-y-[-100px]"
          } z-10 transition-all duration-600 ease-in-out`}
        >
          <h2 className="px-4 py-0.5 text-left font-[500]">
            {selectedItem.title}
          </h2>
        </header>

        <img className="w-[220px] self-center" src={selectedItem.img} alt="" />
        <div className="sticky">
          <h2 className="w-fit px-2 text-[22px] font-[500]">
            {selectedItem.title}
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <div className="w-fit px-4 text-[18px] font-[500]">
            Rs. {selectedItem.price}
          </div>
          <p>{selectedItem.desc}</p>

          {/*flavours and otions for item*/}
          {selectedItem.options &&
            selectedItem.options.map((option) => (
              <div
                key={option.title}
                className="w-[90%] self-center rounded-2xl bg-[var(--secondary-color)] p-2 shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      key={option.title}
                      className="text-left text-[18px] font-[500]"
                    >
                      {option.title}
                    </h3>
                    <p className="px-1 text-left text-gray-600">select 1</p>
                  </div>

                  <span className="rounded-3xl bg-[var(--primary-color)] p-1 px-2 text-[14px] text-white">
                    Required
                  </span>
                </div>

                <div className="mt-2 flex flex-col gap-2">
                  {option.arr.map((x) => (
                    <div
                      onClick={() => {
                        if (!options) return;
                        setOptions((prev) =>
                          prev.map((opt) =>
                            opt.title === option.title
                              ? { ...opt, selectedOption: x.title }
                              : opt,
                          ),
                        );
                      }}
                      key={x.title}
                      className={`group flex w-full cursor-pointer justify-between rounded-2xl p-2 hover:shadow-[0_0px_10px_rgba(0,0,0,0.2)_inset] ${options.map((o)=> o.selectedOption === x.title && 'bg-red-200')}`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-[50px] overflow-hidden rounded-2xl"
                          src={x.img}
                          alt=""
                        />
                        <h3>{x.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>free</span>
                        <div className={`h-[12px] w-[12px] rounded-[50%] border-1 group-hover:border-2
                          ${options.map((o)=> o.selectedOption === x.title && 'border-3')}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Special instructions */}
          <div className="flex flex-col gap-1.5 p-2 px-5">
            <h2 className="text-left text-[16px] font-[500]">
              Special instructions
            </h2>
            <p className="text-gray-500">
              Special requests are subject to the restaurant's approval. Tell us
              here!
            </p>
            <textarea
              className="min-h-[70px] w-full resize-none self-center rounded-[6px] border-1 border-gray-400 p-2 text-[12px] shadow"
              name="instructions"
              placeholder="example: No mayo"
            ></textarea>
          </div>

          {/* If Un-avalibale*/}
          <div className="flex flex-col gap-1.5 p-2 px-5">
            <h2 className="text-left text-[16px] font-[500]">
              If this item is not avalibale
            </h2>
            <select className="border-1 border-gray-400 p-2" name="" id="">
              <option value="Remove">Remove it from my order</option>
              <option value="Cancel">Cancel the entire order</option>
              <option className="border-b" value="Call">
                Call me
              </option>
            </select>
          </div>
        </div>

        {/* Add to cart and quantity buttons*/}

        <footer className="py-1rem px-1.5rem fixed bottom-0 h-[75px] w-full border-t border-gray-300 bg-white shadow-2xl sm:bottom-[40px] sm:max-w-[500px] md:max-w-[600px]">
          <div className="flex h-full w-full items-center justify-between gap-8 px-5">
            <div className="flex items-center gap-2">
              <i
                onClick={() => count > 1 && setCount((p) => p - 1)}
                className="fa-solid fa-circle-minus p-1 text-[28px] cursor-pointer text-[var(--primary-color)] active:scale-[1.05]"
              ></i>
              <span className="text-[17px]">{count}</span>
              <i
                onClick={() => setCount((p) => p + 1)}
                className="fa-solid fa-circle-plus p-1 text-[28px] cursor-pointer text-[var(--primary-color)] active:scale-[1.05]"
              ></i>
            </div>

            <button
              onClick={handleAddCart}
              className={`flex-1 rounded-md cursor-pointer p-2 px-3 text-[18px] transition-all duration-300 ${
                !options || options.every((e) => e.selectedOption !== null)
                  ? "bg-[var(--primary-color)] text-white"
                  : "pointer-events-none bg-gray-500 text-gray-300"
              }`}
            >
              Add to cart
            </button>
          </div>
        </footer>
      </div>
    </Overlay>
  );
}
