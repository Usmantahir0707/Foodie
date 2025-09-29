import Modal from "./Modal";
import Input from "./Input";
import vector from "../assets/vector.png";
import google from "../assets/google.png";

export default function SignIn() {
  return (
    <Modal heading={"Login"}>
      <Input startIcon={"user"} placeholder={"example@gmail.com"} />

      <div role="wrapper" className="relative flex w-[100%] justify-center">
        <Input startIcon={"lock"} placeholder={"password"} endIcon={"eye"} />
        <span className="absolute bottom-[-27px] left-2 text-[14px]">
          forgot password?
        </span>
      </div>

      <button className="mt-12 h-[45px] w-[255px] bg-[#EC2578] text-white active:scale-[97%]">
        Login
      </button>
      <span className="text-[#EC2578]">or</span>
      <div className="flex gap-2">
        <img
          className="rounded-2xl bg-blue-900 px-[12px] py-1"
          src={vector}
          alt=""
        />
        <img src={google} alt="" />
      </div>
    </Modal>
  );
}
