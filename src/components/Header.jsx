import logo from "../assets/logo.png";
import useLocation from "../hooks/useLocation";
import useScrollVisibility from "../hooks/useScrollVisibility";
import NavClick from "./NavClick";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";

export default function Header({ fullHeader, blockHeader }) {
  const showHeader = useScrollVisibility(100);
  const navigate = useNavigate();
  const [locate, location, loading] = useLocation();
  const {cartData} = useCart()

  return (
    <header
      role="Header"
      style={{
        transform: blockHeader
          ? "translateY(0)"
          : showHeader
            ? "translateY(0)"
            : "translateY(-100%)",
        transition: "all 0.3s ease",
      }}
      className={`${blockHeader ? "block" : "sticky"} top-0 z-40 bg-white pt-3 shadow-md`}
    >

      {/* //////////// Header Main */}
      <div
        role="Header-Main"
        className="flex items-center justify-between px-5"
      >
        <div onClick={()=> navigate('/login')}>
          <i className="fa-solid fa-user rounded-[8px] bg-gray-300 p-2 text-[24px]"></i>
        </div>
        <img
          onClick={() => {
            navigate("/home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-[70px]"
          src={logo}
          alt=""
        />
        <div className="relative">
          <span className="absolute top-[-20px] right-0">
            {cartData.reduce((acc, item)=> acc + item.qty, 0)}
          </span>
          <i className="fa-solid fa-cart-shopping text-[20px]"></i>
        </div>
      </div>

      {/* ///////////// LocaTion + Time */}
      <div
        role="location"
        onClick={() => locate()}
        className={`absolute top-3 right-20 mt-0.5 justify-self-center pb-2
                  ${!blockHeader ? '' : 'flex justify-between w-full px-5 pb-0'}`}
      >
        <div className="flex items-center gap-2">
          <i
          className={`fa-solid fa-location-dot text-[#792b4c] ${loading ? "myani" : ""}`}
        ></i>{" "}
        <span className="truncate inline-block w-25">{loading ? "..." : location || "My Location"}</span>
        </div>
        {!blockHeader ? '' : 
        <div className="pb-1 pt-0.5 px-2 mt-2 rounded-md bg-gray-300"><i className="fa-regular fa-clock"></i> Estimated time 23min.. </div>
        }
      </div>
       
       {/* //////////////// NAV LINKS */}
      <div
        role="Nav-Links"
        className={`mt-1 flex justify-between px-5 pt-2 text-gray-700 transition-all duration-300 ${fullHeader ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <span className={!blockHeader ? 'px-1' : 'px-0'}>
          <NavClick
            icon={<i className="fa-solid fa-motorcycle"></i>}
            name={"Delivery"}
            to={"/home"}
          />
        </span>

        <span className={!blockHeader ? 'px-1' : 'px-0'}>
          <NavClick
            icon={<i className="fa-solid fa-person-walking"></i>}
            name={"Pick-up"}
            to={"/pick-up"}
          />
        </span>

        <span className={!blockHeader ? 'px-1' : 'px-0'}>
          <NavClick
            icon={<i className="fa-solid fa-store"></i>}
            name={"Shop"}
            to={"/shop"}
          />
        </span>
      </div>
    </header>
  );
}
