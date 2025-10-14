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

  const {
    address,
    loading,
    error,
    fetchUserLocation,
    initAutocomplete,
    initMap,
    resetMap,
  } = useGoogleMapApi(mapContainerRef);

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
        {/* User and Signup area */}
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
          className="w-[120px] cursor-pointer"
          src={logo}
          alt=""
        />

        {/* cart */}
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
        className={`mt-0.5 flex cursor-pointer justify-self-center pb-2 ${
          !blockHeader
            ? "md:absolute md:top-5 md:right-30"
            : "flex flex-row justify-between px-5 pb-0 md:w-full md:justify-center md:gap-5"
        }`}
      >
        <div className="flex items-center gap-2 text-center">
          <span
            onClick={() => setLocating(true)}
            className="inline-block w-50 truncate text-gray-600"
          >
            <i className={`fa-solid fa-location-dot text-[#792b4c]`}></i>{" "}
            {userAddress ? (
              <span>{userAddress}</span>
            ) : (
              <span className="w-full">Add Location</span>
            )}
          </span>
        </div>
        {!blockHeader ? (
          ""
        ) : (
          <div className="mt-2 rounded-md bg-gray-300 px-2 pt-0.5 pb-1">
            <i className="fa-regular fa-clock"></i> Estimated time 23min..{" "}
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
              className="relative flex h-[65%] w-[90%] flex-col rounded-md bg-white"
            >
              <span
                role="locating close button"
                onClick={() => {
                  setLocating(false);
                  resetMap();
                }}
                className="absolute right-0 flex items-center justify-center p-3"
              >
                <i className="fa-regular fa-circle-xmark text-[26px] text-gray-700"></i>
              </span>

              <h2 className="mt-3 self-center text-[24px] font-[600]">
                Update Address
              </h2>
              <input
                className="mt-5 h-[45px] w-[80%] self-center bg-gray-300 px-2.5"
                ref={inputRef}
                type="text"
                placeholder="Search Address"
              />
              <div
                ref={mapContainerRef}
                className="mt-4 h-[40%] w-[80%] self-center shadow-md"
              />
              <p className="mt-4 w-[80%] self-center">
                {" "}
                {address
                  ? address.fullAddress
                  : loading
                    ? "loading..."
                    : "Add new address"}{" "}
              </p>
              <div className="mt-4 flex w-[80%] justify-center gap-4 self-center">
                <button
                  onClick={fetchUserLocation}
                  className="w-[45%] rounded bg-[#e21b70] p-3 text-white"
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
                  className={`w-[45%] rounded p-3 text-white ${address ? "bg-[#e21b70]" : "pointer-events-none bg-gray-300"}`}
                >
                  Save
                </button>
              </div>
            </div>
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
