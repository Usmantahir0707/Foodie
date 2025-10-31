import logo from "../assets/logo.png";
import useScrollVisibility from "../hooks/useScrollVisibility";
import NavClick from "./NavClick";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { useEffect, useRef, useState } from "react";
import { useFirebase } from "../contexts/fireBaseContext";
import { useGoogleMapApi } from "../hooks/useGoogleMapsApi";
import Overlay from "./Overlay";

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
  const location = useLocation();

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
      className={`${blockHeader ? "block" : "sticky"} top-0 z-40 bg-white pt-3 shadow-md ${location.pathname === "/search-result" && "pb-2 sm:pb-6"}`}
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
            className="flex h-[45px] translate-y-0 cursor-pointer flex-col gap-1 text-[12px] md:translate-y-[-5px] md:flex-row md:gap-1.5"
            onClick={() => navigate("/login")}
          >
            <i className="fa-solid fa-user self-start rounded-[8px] bg-gray-300 p-2 text-[18px]"></i>{" "}
            {""}
            <span>Log-in</span>
          </div>
        ) : (
          <div
            onClick={() => setUserMenu((p) => !p)}
            className="h-[45px] flex gap-1 cursor-pointer"
          >
            {userData.profilePic ? (
              <img
              onClick={()=> firebase.logoutUser()}
                className="w-[40px] h-[40px] object-center overflow-hidden rounded-[50%] flex-shrink-0"
                src={userData.profilePic}
                alt=""
              />
            ) :
              <i className="fa-solid fa-user self-start rounded-[8px] bg-gray-300 p-2 text-[18px]"></i>}
              <span className="text-[12px]"
              >
                {userData.name}
                </span>
            
           
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
        <div className="relative flex cursor-pointer justify-end">
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
        className={`relative mt-1 flex items-center cursor-pointer justify-self-center rounded-md py-1 ${
          !blockHeader
            ? "max-w-[50vw] min-w-[10vw] justify-center sm:right-0 sm:max-w-[30vw] sm:min-w-[10vw] sm:bg-blue-50 lg:absolute lg:bottom-0"
            : "mt-2 flex  flex-row justify-between gap-3 px-5 pb-0 w-[100%]  "
        }`}
      >
        {/* location */}
        <div
          className={`flex items-center truncate ${!blockHeader ? "w-[90%]" : "w-[46%]"} gap-2 text-center md:w-[72%]`}
        >
          <span
            onClick={() => setLocating(true)}
            className="flex gap-1 items-center w-[full] truncate text-gray-600"
          >
            <i
              className={`fa-solid fa-location-dot text-[13px] text-[#792b4c]`}
            ></i>{" "}
            {userAddress ? (
              <span className="w-[full] inline-block truncate text-[10px]">
                {userAddress.replace(/^plot\b/i, "")}
              </span>
            ) : (
              <span className="text-[10px]">Add Location</span>
            )}
          </span>
        </div>

        {/* Estimated time */}
        {!blockHeader ? (
          ""
        ) : (
          <div className="w-fit rounded-md bg-gray-300 px-1 pt-0.5 pb-1 mb-1">
            <i className="fa-regular fa-clock mr-2"></i>
            <span className="text-[10px]">Estimated time 23min..</span>
          </div>
        )}

        {/* Update Address */}
        {locating && (
          <Overlay
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "0",
            }}
          >
            <div
              role="locating interface"
              onClick={(e) => e.stopPropagation()}
              className="tr relative flex w-[330px] flex-col rounded-md bg-white pt-5 pb-10"
            >
              <span
                role="locating close button"
                onClick={() => {
                  setLocating(false);
                  resetMap();
                }}
                className="absolute top-2 right-2 flex cursor-pointer items-center justify-center p-3"
              >
                <i className="fa-regular fa-circle-xmark text-[20px] text-gray-700"></i>
              </span>

              <h2 className="self-center text-[18px] font-[600]">
                Update Address
              </h2>
              <input
                className="mt-7 h-[40px] w-[70%] self-center bg-gray-200 px-2.5 text-[13px]"
                ref={inputRef}
                type="text"
                placeholder="Search Address"
              />

              <div
                ref={mapContainerRef}
                className="mt-6 h-[28vh] w-[80%] self-center shadow-md"
              />
              {loading && (
                <div className="shimmer absolute top-[-40px] right-0 h-[29vh] w-[80%] self-center overflow-hidden rounded-md shadow-md sm:top-[27%]"></div>
              )}

              <p className="mt-6 w-[80%] self-center text-[13px]">
                {" "}
                {address
                  ? address.fullAddress.replace(/^plot\b/i, "")
                  : loading
                    ? "loading..."
                    : "Add new address"}{" "}
              </p>
              <div className="mt-8 flex w-[80%] justify-center gap-6 self-center">
                <button
                  onClick={fetchUserLocation}
                  className="w-[120px] rounded bg-[#e21b70] p-2 text-[13px] text-white"
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
                  className={`w-[120px] rounded p-3 text-[13px] text-white ${address ? "bg-[#e21b70]" : "pointer-events-none bg-gray-300"}`}
                >
                  Save
                </button>
              </div>
            </div>
          </Overlay>
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
