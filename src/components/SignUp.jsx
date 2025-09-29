import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import { useFirebase } from "../contexts/fireBaseContext";
import useValidator from "../hooks/useValidator";
import { useNavigate } from "react-router-dom";
import PhoneInput from "./PhoneInput";
import useLocal from "../hooks/useLocal";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    numberLength: "",
    codeLength: "",
    password: "",
  });
  const firebase = useFirebase();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validated = useValidator(userData, setError);

    if (!validated) return;

    const {name, phoneNumber, password} = userData;
    localStorage.setItem('foodie-user', JSON.stringify({name, phoneNumber, password}))
    navigate('/profile-completion');
  };

  return (
    <Modal heading={"Signup"}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`flex flex-col items-center gap-5`}
      >
        <div
          className={`relative ${error.name ? "mb-2" : "mb-0"} transition-[margin] duration-300`}
        >
          <Input
            startIcon={"user"}
            tail={"h-[50px] w-[253px]"}
            placeholder={"Name"}
            onChange={(e) => {
              setUserData((p) => ({ ...p, name: e.target.value }));
              setError((p) => {
                const { name, ...rest } = p;
                return rest;
              });
            }}
            value={userData.name}
          />
          {error.name ? (
            <p className="absolute bottom-[-20px] text-[13px] text-red-600">
              {error.name}
            </p>
          ) : (
            ""
          )}
        </div>

        <div
          className={`relative ${error.phoneNumber ? "mb-2" : "mb-0"} transition-[margin] duration-300`}
        >
          <PhoneInput
            userData={userData}
            setUserData={setUserData}
            setError={setError}
          />
          {error.phoneNumber ? (
            <p className="absolute bottom-[-20px] text-[13px] text-red-600">
              {error.phoneNumber}
            </p>
          ) : (
            ""
          )}
        </div>

        <div
          className={`relative ${error.password ? "mb-2" : "mb-0"} transition-[margin] duration-300`}
        >
          <Input
            startIcon={"lock"}
            tail={"h-[50px] w-[253px]"}
            placeholder={"New password"}
            endIcon={"eye"}
            onChange={(e) => {
              setUserData((p) => ({ ...p, password: e.target.value }));
              setError((p) => {
                const { password, ...rest } = p;
                return rest;
              });
            }}
            value={userData.password}
          />
          {error.password ? (
            <p className={`absolute bottom-[-20px] text-[13px] text-red-600`}>
              {error.password}
            </p>
          ) : (
            ""
          )}
        </div>

        <button
          className={`mt-2 h-[45px] w-[255px] bg-[#EC2578] text-white active:scale-[97%]`}
        >
          Create Account
        </button>
      </form>
    </Modal>
  );
}
