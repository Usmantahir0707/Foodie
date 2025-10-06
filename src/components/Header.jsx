import logo from "../assets/logo.png";
import useLocation from "../hooks/useLocation";
import useScrollVisibility from "../hooks/useScrollVisibility";
import NavClick from "./NavClick";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { useEffect, useState } from "react";
import { useFirebase } from "../contexts/fireBaseContext";

export default function Header({ fullHeader, blockHeader }) {
  const showHeader = useScrollVisibility(100);
  const navigate = useNavigate();
  const [locate, location, loading] = useLocation();
  const { cartData } = useCart();
  const firebase = useFirebase();
  const [activeUser, setActiveUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const user = firebase.user;
    if (user) {
      setActiveUser(user);
      const getData = async () => {
        try {
          const snap = await firebase.getData(`users/${user.uid}`);
          const data = snap.val();
          setUserData(data);
          
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    }
  }, [firebase.user]);

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
        className="flex flex-wrap items-center justify-between px-5"
      >
        {!userData ? (
          <div
            className="flex w-[75px] translate-y-1 cursor-pointer flex-col items-center md:translate-y-[-5px] md:flex-row md:gap-1.5"
            onClick={() => navigate("/login")}
          >
            <i className="fa-solid fa-user rounded-[8px] bg-gray-300 p-2 text-[24px]"></i>{" "}
            {""}
            Log&nbsp;in
          </div>
        ) : (
          <div
            onClick={() => setUserMenu((p) => !p)}
            className={`relative w-[90px] rounded-[14%] px-[8px] ${userMenu ? "bg-gray-100" : ""}`}
          >
            <img className="w-[67%]" src={userData.profilePic} alt="" />
            <p className="w-full truncate">{userData.name}</p>
            <span>
              <i className="fa-solid fa-caret-down"></i>
            </span>

            {/* ///// User Menu */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute top-[101%] flex h-[296px] w-[180px] transform flex-col items-center gap-1 rounded-md bg-gray-200 p-2 shadow transition-transform duration-300 ease-in-out ${userMenu ? "scale-100" : "scale-0"}`}
            >
              <div className="flex w-full justify-center">
                <img
                  className="w-[70%]"
                  src={userData.profilePic}
                  alt=""
                />
              </div>
              <h2 className="w-full truncate text-center text-[18px] font-[600]">
                {userData.name}
              </h2>
              <ul className={`flex flex-col`}>
                <li className="py-0.5">Edit profile image</li>
                <li className="py-0.5">Change Location</li>
                <li className="py-0.5">Change Password</li>
              </ul>
              <span
              className="mt-2 w-full py-1.5 text-center font-[500]"
              onClick={()=>{
                firebase.logoutUser();
                navigate('/login')
              }}
              >
                Log out
              </span>
            </div>
          </div>
        )}

        <img
          onClick={() => {
            navigate("/home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-[70px] cursor-pointer"
          src={logo}
          alt=""
        />
        <div className="relative flex w-[60px] justify-end">
          <span className="absolute top-[-20px] right-0">
            {cartData.reduce((acc, item) => acc + item.qty, 0)}
          </span>
          <i className="fa-solid fa-cart-shopping text-[20px]"></i>
        </div>
      </div>

      {/* ///////////// LocaTion + Time */}
      <div
        role="location"
        onClick={() => locate()}
        className={`mt-0.5 flex cursor-pointer justify-self-center pb-2 ${
          !blockHeader
            ? "md:absolute md:top-5 md:right-30"
            : "flex w-full flex-row justify-between px-5 pb-0 md:w-full md:justify-center md:gap-5"
        }`}
      >
        <div className="flex items-center gap-2">
          <i
            className={`fa-solid fa-location-dot text-[#792b4c] ${loading ? "myani" : ""}`}
          ></i>{" "}
          <span className="inline-block w-25 truncate text-gray-600">
            {loading ? "..." : location || "My Location"}
          </span>
        </div>
        {!blockHeader ? (
          ""
        ) : (
          <div className="mt-2 rounded-md bg-gray-300 px-2 pt-0.5 pb-1">
            <i className="fa-regular fa-clock"></i> Estimated time 23min..{" "}
          </div>
        )}
      </div>

      {/* //////////////// NAV LINKS */}
      <div
        role="Nav-Links"
        className={`mt-1 flex justify-between px-5 pt-2 text-gray-700 transition-all duration-300 md:justify-start md:gap-8 md:pt-0 ${fullHeader ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <span className={!blockHeader ? "px-1" : "px-0"}>
          <NavClick
            icon={<i className="fa-solid fa-motorcycle"></i>}
            name={"Delivery"}
            to={"/home"}
          />
        </span>

        <span className={!blockHeader ? "px-1" : "px-0"}>
          <NavClick
            icon={<i className="fa-solid fa-person-walking"></i>}
            name={"Pick-up"}
            to={"/pick-up"}
          />
        </span>

        <span className={!blockHeader ? "px-1" : "px-0"}>
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
