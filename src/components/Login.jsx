import Rectangle from "../assets/Rectangle 590.png";
import logo2 from "../assets/logo2.png";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Login() {
  const [register, setRegister] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-55 md:gap-45">
      <img className="w-screen md:w-170 md:h-90" src={Rectangle} alt="" />
      <img className="fixed top-[85px] md:top-[25px]" src={logo2} alt="" />
      <h4 className="fixed top-[195px] text-[21px] md:top-[125px] text-white">
        Deliver Favourite Food
      </h4>

      {register ? (
        <SignUp/>
      ) : (
        <SignIn/>
      )}

      <div className="flex flex-col items-center gap-1.5">
        <h6 className="text-[14px] font-bold">
          {register ? "Already" : "Don't"} have an account?
        </h6>
        <h3
          onClick={() => {
            setRegister((p) => !p);
          }}
          className="text-[20px] font-bold text-[#EC2578] cursor-pointer"
        >
          {register ? "Login" : "Register"}
        </h3>
      </div>
    </div>
  );
}
