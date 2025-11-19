import Rectangle from "../assets/Rectangle 590.png";
import logo2 from "../assets/logo2.png";
import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import useResponsiveClamp from "../hooks/useResponsiveClamp";


export default function Login() {
  const [register, setRegister] = useState(false);

  const scale = useResponsiveClamp({
    view: "height",
    minView: 530,
    maxView: 900,
    minValue: 0.8,
    maxValue: 1,
    unit: "none",
    capped: 768,
  });

  const top = useResponsiveClamp({
    view: "height",
    minView: 540,
    maxView: 900,
    minValue: 20,
    maxValue: 65,
    capped: 768,
  });


  return (
    <div 
    className="flex flex-col items-center gap-[20vh] justify-center">
      <img className="w-screen md:h-90 md:w-190" src={Rectangle} alt="" />
      <div
        style={{
          ...(top !== null && { top: top }),
          ...(scale !== null && { transform: `scale(${scale})` }),
        }}
        className="fixed z-10 md:top-[20px]"
      >
        <img className="flex justify-self-center" src={logo2} alt="Logo" />

        <h4 className=" text-white md:top-[115px]">
          Deliver Favourite Food
        </h4>
      </div>

      {register ? <SignUp /> : <SignIn />}

      <div className="fixed bg-white p-1 bottom-[25px] flex flex-col items-center gap-1">
        <h6 className="text-[13px] font-bold">
          {register ? "Already" : "Don't"} have an account?
        </h6>
        <h3
          onClick={() => setRegister((p) => !p)}
          className="cursor-pointer text-[18px] font-bold text-[#EC2578]"
        >
          {register ? "Login" : "Register"}
        </h3>
      </div>
    </div>
  );
}
