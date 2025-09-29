import { useLocation } from "react-router-dom";
import data from "../../data";
import { useRef, useState } from "react";
import discountImg from "../assets/discount.png";
import MenuHeader from "./MenuHeader";
import Menu from "./Menu";



export default function Restaurant() {
  const location = useLocation();
  const query = location.state.toLowerCase();
  const [restaurant] = data.filter((f) =>
    f.title.toLowerCase().includes(query),
  );
  const [selectedTab, setSelectedTab] = useState(restaurant.menu[0].title);
  const menuRef = useRef({})
  const isClicked = useRef(false);

  return (
    <main className="bg-gray-100 md:pr-[30vw]">
      {/* /////// Profile */}
      <div
        role="PROFILE PIC AND HEADING"
        className="flex items-center gap-5 px-[16px] pt-[36px]"
      >
        <div className="flex items-center overflow-hidden rounded-md bg-white">
          <img
            className="w-30 rounded-md object-cover"
            src={restaurant.assets.img}
            alt=""
          />
        </div>

        <div className="flex-1">
          <h5 className="text-gray-500">- {restaurant.cuisine}</h5>
          <h2 className="pl-2 font-[chivo] text-[23px] font-bold text-gray-800">
            {restaurant.title}
          </h2>
        </div>
      </div>

      <div role="DETAILS" className="pb-6 shadow-[0px_2px_3px_rgba(0,0,0,0.1)]">
        <div className="flex items-center bg-gray-100 px-[16px] pt-[26px] text-gray-600">
          <div className="text-[13px]">
            <i className="fa-solid fa-bicycle"></i> {""}
            <span>Rs. {restaurant.assets.fee}</span> {""} delivery &nbsp; ● {""}{" "}
            &nbsp;
            <i className="fa-solid fa-bag-shopping"></i> Min-order Rs. 500
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-100 px-[16px] pt-[16px] text-gray-800">
          <div>
            <i className="fa-solid fa-star text-[#e9c02e]"></i> {""} &nbsp;
            {restaurant.assets.rating}/5 ({restaurant.assets.totalReviews}+)
            &nbsp;
            <span className="font-[500]">See Reviews..</span>
          </div>

          <div className="flex items-center gap-2 text-[22px]">
            <i className="fa-solid fa-circle-info"></i>
            <span className="text-[16px] font-[500]">More info</span>
          </div>
        </div>
      </div>

      {/* ////////////// DEALS */}

      <div className="flex flex-col gap-6 py-6">
        <h3 className="ml-4 text-[17px] font-[700] text-gray-900">
          Avaliable Deals
        </h3>

        <div
          role="DEALS INFO"
          className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 py-1 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
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

          <div
            role="2nd Deal"
            className="relative h-[110px] w-[280px] flex-shrink-0 rounded-[14px] border border-gray-300 bg-white p-3 px-4 shadow-[0px_0px_4px_rgba(0,0,0,0.1)] before:absolute before:top-[50%] before:left-[-13px] before:z-auto before:h-[20px] before:w-[20px] before:rounded-[45%] before:border-r before:border-gray-300 before:bg-gray-100 before:shadow-[-1px_0px_1px_rgba(0,0,0,0.1)_inset] before:content-[''] after:absolute after:top-[50%] after:right-[-12px] after:z-auto after:h-[20px] after:w-[20px] after:rounded-[45%] after:border-l after:border-gray-300 after:bg-gray-100 after:shadow-[1px_0px_1px_rgba(0,0,0,0.1)_inset] after:content-['']"
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
      </div>

      {/* menu header */}
      <MenuHeader
        restaurant={restaurant}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        menuRef={menuRef}
        isClicked={isClicked}
      />
      {/* ///////////////// MENU */}
      <Menu
        restaurant={restaurant}
        setSelectedTab={setSelectedTab}
        menuRef={menuRef}
        isClicked={isClicked}
      />
    </main>
  );
}
