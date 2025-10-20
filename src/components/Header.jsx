import logo from "../assets/logo.png";
import useScrollVisibility from "../hooks/useScrollVisibility";
import NavClick from "./NavClick";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { useEffect, useRef, useState } from "react";
import { useFirebase } from "../contexts/fireBaseContext";
import { useGoogleMapApi } from "../hooks/useGoogleMapsApi";

export default function Header({ fullHeader, blockHeader }) {
  const showHeader = useScrollVisibility(100);
  const [locating, setLocating] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const { cartData } = useCart();
  const firebase = useFirebase();
  const [activeUser, setActiveUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userMenu, setUserMenu] = useState(false);
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);

// ===========================================================================
        //  google map api hook
  const {
    address,
    loading,
    error,
    fetchUserLocation,
    initAutocomplete,
    initMap,
    resetMap,
  } = useGoogleMapApi(mapContainerRef);
// ==========================================================================

      // reinitialize the map each time 
  useEffect(() => {
    if (locating && mapContainerRef.current) {
      initMap();
    }
  }, [locating, initMap]);

  
  useEffect(() => {
    if (locating && inputRef.current) {
      initAutocomplete(inputRef.current);
    }
  }, [locating, initAutocomplete]);
// =======================================================================

    // Fire User and his realtime data
  useEffect(() => {
    const user = firebase.user;
    if (user) {
      setActiveUser(user);
      const getData = async () => {
        try {
          const snap = await firebase.getData(`users/${user.uid}`);
          const data = snap.val();
          setUserData(data);
          setUserAddress(data.address);
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    }
  }, [firebase.user]);
// ========================================================================

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
   {/* =========================================================================== */}
      {/* //////////// Header Top flex with -user -logo -cart */}
      <div
        role="Header-Main"
        className="flex flex-wrap items-center justify-between px-5"
      >
        {/* User and Signup area */}
        {!userData ? (
          <div
            className="flex gap-1 translate-y-0 text-[12px] cursor-pointer flex-col  md:translate-y-[-5px] md:flex-row md:gap-1.5"
            onClick={() => navigate("/login")}
          >
            <i className="fa-solid fa-user self-start rounded-[8px] bg-gray-300 p-2 text-[18px]"></i>{" "}
            {""}
            <span>
              Log-in
            </span>
            
          </div>
        ) : (
          <div
            onClick={() => setUserMenu((p) => !p)}
            className={`relative w-[90px] rounded-[14%] px-[8px] ${userMenu ? "bg-gray-100" : ""}`}
          >
            {userData.profilePic && (
              <img className="w-[67%]" src={userData.profilePic} alt="" />
            )}
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
                <img className="w-[70%]" src={userData.profilePic} alt="" />
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
                onClick={() => {
                  firebase.logoutUser();
                  navigate("/login");
                }}
              >
                Log out
              </span>
            </div>
          </div>
        )}

        {/* logo */}
        <img
          onClick={() => {
            navigate("/home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-[105px] cursor-pointer"
          src={logo}
          alt=""
        />

        {/* cart */}
        <div className="relative flex justify-end cursor-pointer">
          <span className="absolute top-[-20px] right-0">
            {cartData.reduce((acc, item) => acc + item.qty, 0)}
          </span>
          <i className="fa-solid fa-cart-shopping text-[20px]"></i>
        </div>
      </div>
{/* =============================================================================== */}
      {/* ///////////// Middle Flex with things like -location -estimated time*/}
      <div
        role="location Estimatmed time"
        className={`mt-1 flex relative cursor-pointer justify-self-center pb-2 ${
          !blockHeader
            ? "md:absolute md:bottom-0 right-0 justify-center"
            : "flex flex-row w-full mt-3 gap-3 justify-between px-2 pb-0 md:w-full md:justify-center md:gap-5"
        }`}
      >
                {/* location */}
        <div className={`flex truncate items-center ${!blockHeader ? 'w-[90%]' : 'w-[46%]'}  md:w-[80%] gap-2 text-center`}>
          <span
            onClick={() => setLocating(true)}
            className="inline-block truncate text-gray-600"
          >
            <i className={`fa-solid fa-location-dot text-[#792b4c] text-[13px]`}></i>{" "}
            {userAddress ? (
              <span className="text-[12px] w-[200px] truncate">{userAddress.replace(/^plot\b/i, '')}</span>
            ) : (
              <span className="w-[80%] text-[12px]">Add Location</span>
            )}
          </span>
        </div>

        {/* Estimated time */}
        {!blockHeader ? (
          ""
        ) : (
          <div className="rounded-md w-[50%] md:w-[20%] bg-gray-300 px-2 pt-0.5 pb-1">
            <i className="fa-regular fa-clock  mr-2"></i>
            <span className="text-[13px]">
              Estimated time 23min..
            </span>
             
          </div>
        )}

        {/* Update Address */}
        {locating && (
          <div
            role="locating overlay"
            onClick={() => {
              setLocating(false);
              resetMap();
            }}
            className="fixed top-0 left-0 z-10 flex h-[100vh] w-[100vw] items-center justify-center bg-gray-500/45"
          >
            <div
              role="locating interface"
              onClick={(e) => e.stopPropagation()}
              className="relative pb-10 pt-5 flex w-[330px] flex-col rounded-md bg-white"
            >
              <span
                role="locating close button"
                onClick={() => {
                  setLocating(false);
                  resetMap();
                }}
                className="absolute top-2 right-2 flex items-center justify-center p-3"
              >
                <i className="fa-regular fa-circle-xmark text-[18px] text-gray-700"></i>
              </span>

              <h2 className=" self-center text-[18px] font-[600]">
                Update Address
              </h2>
              <input
                className="mt-7 h-[40px] text-[13px] w-[70%] self-center bg-gray-200 px-2.5"
                ref={inputRef}
                type="text"
                placeholder="Search Address"
              />
              <div
                ref={mapContainerRef}
                className="mt-6 h-[28vh] w-[80%] self-center shadow-md"
              />
              <p className="mt-6 w-[80%] text-[13px] self-center">
                {" "}
                {address
                  ? address.fullAddress.replace(/^plot\b/i, '')
                  : loading
                    ? "loading..."
                    : "Add new address"}{" "}
              </p>
              <div className="mt-8 flex w-[80%] justify-center gap-6 self-center">
                <button
                  onClick={fetchUserLocation}
                  className="w-[120px] text-[13px] rounded bg-[#e21b70] p-2 text-white"
                >
                  Auto locate
                </button>
                <button
                  onClick={() => {
                    if (activeUser) {
                      firebase
                        .updateData(`users/${activeUser.uid}`, {
                          address: address.fullAddress,
                        })
                        .then(() => {
                          setUserAddress(address.fullAddress);
                          setLocating(false);
                          resetMap();
                        })
                        .catch((e) => alert(e.message));
                    } else {
                      setUserAddress(address.fullAddress);
                      setLocating(false);
                      resetMap();
                    }
                  }}
                  className={`w-[120px] text-[13px] rounded p-3 text-white ${address ? "bg-[#e21b70]" : "pointer-events-none bg-gray-300"}`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* //////////////// Bottom flex NAV LINKS */}
      <div
        role="Nav-Links"
        className={`flex justify-between px-5 pt-1 text-gray-700 transition-all duration-300 md:justify-start md:gap-8 md:pt-0 ${fullHeader ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
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
