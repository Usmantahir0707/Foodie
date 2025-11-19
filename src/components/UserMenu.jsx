import { useEffect, useState } from "react";
import Overlay from "./Overlay";
import discountImg from "../assets/discount.png";
import Camera from "./Camera";
import UpdatePassword from "./UpdatePassword";
import { useFirebase } from "../contexts/fireBaseContext";
import useFirebaseStorage from "../hooks/useFirebaseStorage";
import dataURLtoFile from "../utility/dataURLtoFile";

export default function UserMenu({
  userData,
  setUserMenu,
  setLocating,
  logout,
}) {
  const [section, setSection] = useState("main");
  const [cameraActive, setCameraActive] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(() =>
    userData.profilePic === "" ? "" : userData.profilePic,
  );
  const { updateData } = useFirebase();
  const { uploadFile, deleteFile, loading: uploadloading, error } = useFirebaseStorage();

  useEffect(() => {

    if (imageCaptured === '' || (typeof imageCaptured === 'string' && imageCaptured.startsWith('https'))) {
  return;
}
    const imgFormatted =
      imageCaptured instanceof File
        ? imageCaptured
        : dataURLtoFile(imageCaptured, "profile.png");

    uploadFile(imgFormatted, `users/${userData.uid}/profile.png`)
    .then((link)=>{
      updateData(`users/${userData.uid}`,{profilePic: `${link}`})
      .catch((err)=> console.log(err))
    })
    .catch((err)=> console.log(err))
  }, [imageCaptured]);

  //  Deleting image from storage and data
  const handleDeleteImage = ()=>{
    deleteFile(`users/${userData.uid}/profile.png`)
    .then(()=>{
      updateData(`users/${userData.uid}`,{profilePic: ''})
      .catch((err)=> console.log(err))
    })
    .catch((err)=> console.log(err))
    setImageCaptured('')
  }

  return (
    <Overlay onClick={() => setUserMenu(false)}>
      {/* User Menu Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 h-[490px] w-[90%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white text-center"
      >
        {/* sticky Header */}
        <header className="sticky top-0 flex items-center justify-between bg-gray-200 p-2 pl-2 shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
          {/* title */}
          <h2>User Menu</h2>

          {/* Close Button */}
          <div
            onClick={() => setUserMenu(false)}
            className="spinLittle flex h-[34px] w-[34px] cursor-pointer items-center justify-center justify-self-end rounded-[50%] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            <i class="fa-solid fa-xmark text-[20px]"></i>
          </div>
        </header>

        {/* Main Section ====================================================================================*/}
        {section === "main" && (
          <div>
            {/* Profile-Pic */}
            <div className="mt-8 h-[100px] w-[100px] cursor-pointer justify-self-center">
              {userData.profilePic ? (
                <img
                  className="h-full w-full flex-shrink-0 overflow-hidden rounded-[8px] object-contain"
                  src={userData.profilePic}
                  alt=""
                />
              ) : (
                <i className="fa-solid fa-user h-full w-full self-start rounded-[8px] bg-gray-300 p-2 text-[58px] shadow-[0_0_10px_rgba(0,0,0,0.3)]"></i>
              )}
            </div>

            <div className="flex flex-col gap-4 justify-self-center">
              <h2 className="text-[22px] font-[500] mt-2">{userData.name}</h2>
              {/* Menu */}
              <ul className="text-[14px] text-[var(--primary-color)]">
                {/* vouchers */}
                <li
                  onClick={() => setSection("vouchers")}
                  className="cursor-pointer p-0.5 px-2 hover:border-[0px_2px_0px_2px] active:border-[0px_2px_0px_2px]"
                >
                  <i className="fa-solid fa-ticket-simple"></i> Vouchers
                </li>
                {/* Fav */}
                <li
                  onClick={() => setSection("favourites")}
                  className="cursor-pointer p-0.5 px-2 hover:border-[0px_2px_0px_2px] active:border-[0px_2px_0px_2px]"
                >
                  <i className="fa-regular fa-star"></i> Favourites
                </li>
                {/* Address */}
                <li
                  onClick={() => {
                    setUserMenu(false);
                    setLocating(true);
                  }}
                  className="cursor-pointer p-0.5 px-2 hover:border-[0px_2px_0px_2px] active:border-[0px_2px_0px_2px]"
                >
                  <i className="fa-solid fa-map-location-dot"></i> Update
                  Address
                </li>
                {/* Cam */}
                <li
                  onClick={() => setSection("picture")}
                  className="cursor-pointer p-0.5 px-2 hover:border-[0px_2px_0px_2px] active:border-[0px_2px_0px_2px]"
                >
                  <i className="fa-solid fa-camera-retro"></i> Update Profile
                  Pic
                </li>
                {/* password */}
                <li
                  onClick={() => setSection("password")}
                  className="cursor-pointer p-0.5 px-4 hover:border-[0px_2px_0px_2px] active:border-[0px_2px_0px_2px]"
                >
                  <i className="fa-solid fa-key"></i> Update Password
                </li>
              </ul>

              {/* Logout Button */}
              <span
                onClick={() => logout()}
                className="cursor-pointer p-2 hover:scale-[1.03] active:scale-[1.03] active:text-red-600"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log-out
              </span>
            </div>
          </div>
        )}

        {/* Vouchers Section ===========================================================================*/}
        {section === "vouchers" && (
          <div className="flex h-[400px] flex-col items-center overflow-y-auto p-2 pb-12">
            {/* Back Buttoon */}
            <div
              className="absolute left-4 top-16 cursor-pointer self-baseline justify-self-start rounded bg-gray-200 p-1"
              onClick={() => setSection("main")}
            >
              <i className="fa-solid fa-angle-left text-[var(--primary-color)]"></i>{" "}
              Main
            </div>
            {/* title*/}
            <div className="mt-4">
              <h4 className="mt-2 text-[20px] font-[500]">My Vouchers</h4>
              <p className="text-[14px] text-gray-500">
                Grab your vouchers and start saving
              </p>
            </div>

            {/* Deal */}
            <div className="mt-8">
              <div
                role="2nd Deal"
                className="relative h-[110px] w-[280px] flex-shrink-0 rounded-[14px] border border-gray-300 bg-white p-3 px-4 shadow-[0px_0px_4px_rgba(0,0,0,0.1)] before:absolute before:top-[50%] before:left-[-13px] before:z-auto before:h-[20px] before:w-[20px] before:rounded-[45%] before:border-r before:border-gray-300 before:bg-white before:shadow-[-1px_0px_1px_rgba(0,0,0,0.1)_inset] before:content-[''] after:absolute after:top-[50%] after:right-[-12px] after:z-auto after:h-[20px] after:w-[20px] after:rounded-[45%] after:border-l after:border-gray-300 after:bg-white after:shadow-[1px_0px_1px_rgba(0,0,0,0.1)_inset] after:content-['']"
              >
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="text-[#e21b70]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.9985 2C6.47909 2 1.99976 6.47933 1.99976 11.9988C1.99976 17.5207 6.47909 22 11.9985 22C17.5204 22 21.9998 17.5207 21.9998 11.9988C21.9998 6.47933 17.5204 2 11.9985 2ZM13.9335 7.09028C13.6481 6.97369 13.3346 6.88664 12.993 6.82914V5.2C12.993 5.08954 12.9035 5 12.793 5H11.193C11.0826 5 10.993 5.08954 10.993 5.2V6.81574C10.5998 6.87929 10.2374 6.98581 9.90569 7.13529C9.32862 7.39034 8.87954 7.75541 8.55843 8.2305C8.24197 8.70059 8.08374 9.2507 8.08374 9.88082V9.89583C8.08374 10.4459 8.18845 10.9235 8.39787 11.3286C8.61195 11.7287 8.93305 12.0637 9.3612 12.3338C9.794 12.5989 10.3315 12.7989 10.9737 12.9339L12.2233 13.204C12.7771 13.319 13.154 13.459 13.3541 13.6241C13.5589 13.7841 13.6613 14.0041 13.6613 14.2842V14.2917C13.6613 14.5017 13.6031 14.6818 13.4867 14.8318C13.3704 14.9818 13.1936 15.0993 12.9562 15.1844C12.7189 15.2644 12.4187 15.3044 12.0557 15.3044C11.6741 15.3044 11.353 15.2619 11.0924 15.1769C10.8364 15.0918 10.6363 14.9693 10.4921 14.8093C10.3524 14.6493 10.2594 14.4592 10.2128 14.2392C10.2047 14.1999 10.1701 14.1717 10.1299 14.1717H8.09825C8.04128 14.1717 7.9962 14.2198 7.99998 14.2767C8.04186 14.9068 8.22801 15.4444 8.55843 15.8895C8.88884 16.3346 9.34258 16.6746 9.91965 16.9097C10.2453 17.0385 10.6031 17.1312 10.993 17.1879V18.8C10.993 18.9105 11.0825 19 11.193 19H12.793C12.9034 19 12.993 18.9105 12.993 18.8V17.1789C13.3915 17.1159 13.7585 17.0136 14.0941 16.8722C14.699 16.6121 15.1668 16.2421 15.4972 15.762C15.8322 15.2769 15.9998 14.6943 15.9998 14.0141V13.9991C15.9998 13.179 15.7578 12.5338 15.2738 12.0637C14.7945 11.5937 14.0499 11.2511 13.04 11.036L11.7556 10.766C11.4344 10.691 11.1762 10.606 10.9807 10.5109C10.7852 10.4109 10.6433 10.2934 10.5549 10.1584C10.4665 10.0184 10.4223 9.85832 10.4223 9.67828V9.67078C10.4223 9.47574 10.4781 9.30571 10.5898 9.16068C10.7015 9.01566 10.8667 8.90313 11.0854 8.82312C11.3088 8.7381 11.5857 8.69559 11.9161 8.69559C12.2558 8.69559 12.5444 8.7381 12.7817 8.82312C13.019 8.90313 13.2075 9.02566 13.3471 9.19069C13.4914 9.35072 13.5845 9.55576 13.6264 9.80581C13.6345 9.84512 13.6691 9.87332 13.7093 9.87332H15.7035C15.7812 9.87332 15.843 9.80836 15.8392 9.73079C15.7834 9.09067 15.5926 8.54806 15.2668 8.10298C14.9457 7.65789 14.5013 7.32033 13.9335 7.09028Z"
                    />
                  </svg>

                  <h2 className="text-[14px] font-[700] text-[#e21b70]">
                    10% cashback (GIFTCARD500)
                  </h2>
                </div>
                <p className="mt-1 text-[13px]">
                  Min. order Rs. 2000. Valid for selected <br /> items. Auto
                  applied.
                </p>
              </div>
            </div>

            {/* Deal 2 */}
            <div className="mt-4">
              <div
                role="1st Deal"
                className="relative h-[110px] w-[280px] flex-shrink-0 overflow-hidden rounded-[14px] bg-[#FDE2E4] p-3 px-4 shadow-[0px_0px_4px_rgba(0,0,0,0.1)]"
              >
                <img
                  className="absolute right-0 bottom-[-5px] w-[70px]"
                  src={discountImg}
                  alt=""
                />

                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    aria-hidden="true"
                    className="scale-130 text-[#e21b70]"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.65484 2.56705C7.3923 1.81115 8.60773 1.81115 9.34518 2.56705L9.39322 2.61629C9.74688 2.9788 10.2319 3.18322 10.7384 3.18322L10.9377 3.18322C11.9755 3.18322 12.8169 4.02447 12.8169 5.0622V5.26146C12.8169 5.76789 13.0213 6.25287 13.3839 6.60649L13.4331 6.65452C14.1891 7.3919 14.1891 8.6072 13.4331 9.34457L13.3839 9.39261C13.0213 9.74623 12.8169 10.2312 12.8169 10.7376V10.9369C12.8169 11.9746 11.9755 12.8159 10.9377 12.8159L10.7384 12.8159C10.2319 12.8159 9.74688 13.0203 9.39322 13.3828L9.34518 13.432C8.60773 14.188 7.3923 14.1879 6.65484 13.432L6.6068 13.3828C6.25314 13.0203 5.76811 12.8159 5.26163 12.8159L5.06235 12.8159C4.02451 12.8159 3.18316 11.9746 3.18316 10.9369L3.18316 10.7376C3.18316 10.2312 2.97872 9.74623 2.61618 9.39261L2.56693 9.34457C1.81094 8.6072 1.81094 7.3919 2.56693 6.65452L2.61618 6.60649C2.97872 6.25287 3.18316 5.76789 3.18316 5.26147L3.18316 5.0622C3.18316 4.02447 4.0245 3.18322 5.06235 3.18322L5.26163 3.18322C5.76811 3.18322 6.25314 2.9788 6.6068 2.61629L6.65484 2.56705ZM6.89645 5.89616C6.89645 6.44839 6.44873 6.89607 5.89644 6.89607C5.34415 6.89607 4.89643 6.44839 4.89643 5.89616C4.89643 5.34393 5.34415 4.89626 5.89644 4.89626C6.44873 4.89626 6.89645 5.34393 6.89645 5.89616ZM10.1036 11.1028C10.6559 11.1028 11.1036 10.6552 11.1036 10.1029C11.1036 9.5507 10.6559 9.10303 10.1036 9.10303C9.5513 9.10303 9.10358 9.5507 9.10358 10.1029C9.10358 10.6552 9.5513 11.1028 10.1036 11.1028ZM5.90129 9.05883C5.6084 9.35172 5.6084 9.82659 5.90129 10.1195C6.19419 10.4124 6.66906 10.4124 6.96195 10.1195L10.1439 6.93751C10.4368 6.64461 10.4368 6.16974 10.1439 5.87685C9.85104 5.58395 9.37617 5.58395 9.08327 5.87685L5.90129 9.05883Z"
                    />
                  </svg>
                  <h2 className="text-[14px] font-[700] text-[#e21b70]">
                    Rs. 550 off
                  </h2>
                </div>
                <p className="mt-1 text-[13px]">
                  Min. order Rs. 2000. Valid for selected <br /> items. Auto
                  applied.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Favourites Section ======================================================================== */}
        {section === "favourites" && (
          <div className="p-2">
            {/* Back Buttoon */}
            <div
              className="absolute left-4 top-16  cursor-pointer justify-self-start rounded bg-gray-200 p-1"
              onClick={() => setSection("main")}
            >
              <i className="fa-solid fa-angle-left text-[var(--primary-color)]"></i>{" "}
              Main
            </div>

            {/* title*/}
            <div className="mt-4">
              <h4 className="mt-2 text-[20px] font-[500]">My Favourites</h4>
              <p className="text-[14px] text-gray-500">
                Your best picks, saved here
              </p>
            </div>

            <div className="mt-[100px]">
              <i className="fa-solid fa-circle-exclamation text-[34px] text-[var(--primary-color)]"></i>
              <p>Empty</p>
            </div>
          </div>
        )}

        {/* Picture Section ============================================================================== */}
        {section === "picture" && (
          <div className="p-2">
            {/* Back Buttoon */}
            <div
              className="absolute left-4 top-16 cursor-pointer justify-self-start rounded bg-gray-200 p-1"
              onClick={() => setSection("main")}
            >
              <i className="fa-solid fa-angle-left text-[var(--primary-color)]"></i>{" "}
              Main
            </div>

            {/* title*/}
            <div className="mt-4">
              <h4 className="mt-2 text-[20px] font-[500]">Profile Pic</h4>
              <p className="text-[14px] text-gray-500">New profile pic?</p>
            </div>

            <div className="mt-8 flex scale-[0.8] justify-center">
              {cameraActive ? (
                <Camera
                  setCameraActive={setCameraActive}
                  setImageCaptured={setImageCaptured}
                />
              ) : imageCaptured ? (
                <div className="h-[90%] flex-1">
                  <div className="flex h-[90%] w-full items-center justify-center overflow-hidden">
                    <img
                      className="max-h-full w-[250px] object-contain"
                      src={
                        imageCaptured instanceof File
                          ? URL.createObjectURL(imageCaptured)
                          : imageCaptured
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex justify-center">
                    <div
                      onClick={() => handleDeleteImage()}
                      className="flex cursor-pointer items-center gap-1 p-3 px-3.5 text-[#e21b70] 
                      shadow-[0_0_10px_var(--primary-color)] mt-4 rounded-[50%]"
                    >
                      <i className="fa-solid fa-trash text-[25px]"></i>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-[23px] font-[500]">"Strike a pose 📷"</h4>
                  <p className="text-gray-600">Faces create connections.</p>
                  <div className="mt-[40px] flex flex-col items-center gap-4">
                    <button
                      onClick={() => setCameraActive(true)}
                      className="w-[250px] border border-[#e21b70] py-2 text-[20px] text-[#e21b70] hover:bg-[#e21b70] hover:text-white"
                    >
                      Use Camera
                    </button>
                    <button className="flex w-[250px] items-center justify-center border border-[#e21b70] py-2 text-[20px] text-[#e21b70] hover:bg-[#e21b70] hover:text-white">
                      <label className="w-full">
                        Upload
                        <input
                          className="hidden"
                          onChange={(e) => setImageCaptured(e.target.files[0])}
                          type="file"
                        />
                      </label>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* password Section ==========================================================================*/}
        {section === "password" && (
          <div className="p-2">
            {/* Back Buttoon */}
            <div
              className="absolute left-4 top-16 cursor-pointer justify-self-start rounded bg-gray-200 p-1"
              onClick={() => setSection("main")}
            >
              <i className="fa-solid fa-angle-left text-[var(--primary-color)]"></i>{" "}
              Main
            </div>

            {/* title*/}
            <div className="mt-4">
              <h4 className="mt-2 text-[20px] font-[500]">Update Password</h4>
              <p className="text-[14px] text-gray-500">
                Keep your account safe
              </p>
            </div>

            <div className="">
              <UpdatePassword setSection={setSection} />
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
}
