import Search from "./Search";
import delivery from "../assets/delivery.png";
import { useLocation, useNavigate } from "react-router-dom";

import ResultFlex from "./ResultFlex";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state.query.toLowerCase();
  return (
    <main className="px-4 pb-14">
      <div className="flex justify-center pl-[200px]]">
        <div className="flex justify-center">
           <Search />
        </div>
       
      </div>
      
      <div
        role="signUp-promo"
        className="relative mt-6 h-[142px] rounded-[8px] bg-[#FFDDDD] p-3 px-4 text-[1.3rem] font-[600] text-[#2E3138]"
      >
        <h2>
          Free delivery on first <br /> order
        </h2>
        <button 
        onClick={()=> navigate('/login')}
        className="mt-2 flex items-center rounded-[10px] bg-[#e21b70] px-[16px] py-2 pb-1.5 text-[14px] font-[500] text-white
        active:bg-white active:text-[#e21b70]">
          Sign up
        </button>
        <img
          className="absolute top-2 right-4 w-[120px]"
          src={delivery}
          alt=""
        />
      </div>
      
        <ResultFlex query={query}/>
     
    </main>
  );
}
