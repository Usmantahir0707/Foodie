import { useEffect, useRef, useState } from "react";
import lock from "../assets/lock2.png";
import green from "../assets/green.png";
import PhoneInput from "./PhoneInput";
import { useFirebase } from "../contexts/fireBaseContext";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword({ setChangePassword }) {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [change, setChange] = useState(false);
  const [method, setMethod] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [copy, setCopy] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [userData, setUserData] = useState({ phoneNumber: "" });
  const [error, setError] = useState({});
  const [summary, setSummary] = useState(false);
  const verifyBtnRef = useRef();
  const confirmationObjRef = useRef();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const uidRef = useRef(); 

  useEffect(() => {
    if (error.sending) {
      setTimeout(() => {
        setError((p) => {
          const { sending, ...rest } = p;
          return rest;
        });
      }, 3000);
    }
  
  }, [error]);

  const copied = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const handleChange = (e, i) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;

    setOtp((p) => {
      const newOtp = [...p];
      newOtp[i] = value;
      return newOtp;
    });

    if (value && i < 5) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }

    if (e.key === "Enter" && i > 4) {
      verifyBtnRef.current.click();
    }
  };

  const handleSendOtp = async () => {
    try {
      const obj = await firebase.sendOtp(userData.phoneNumber);
      if (obj?.verificationId) {
        confirmationObjRef.current = obj;
        setStep(3);
      }
    } catch (e) {
      setError((p) => ({ ...p, sending: e.message }));
    }
  };

  const handleVerifyOtp = async () => {
    const formattedOtp = otp.join("");
    try {
      const res = await firebase.verifyOtp(formattedOtp, confirmationObjRef);
      const user = res.user;
      const uid = user.uid
       uidRef.current = uid;

      const snap = await firebase.getData(`users/${uid}`);
      const data = snap.val();

      if (method === "current") {
        firebase.logoutUser();
        setPassword(data.password);
      }
      if (method === "new") {
        setChange(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const UpdateNewPassword = () => {
    const errorObj = {};
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;

    if (newPassword.length < 1) {
      errorObj.password = "Newpassword is required!";
    }
    if (newPassword.length > 1 && !pattern.test(newPassword)) {
      errorObj.password = "Include Upper, Lower and Number!";
    }
    if (newPassword.length > 1 && newPassword.length < 8) {
      errorObj.password = "Must be atleast 8 characters!";
    }

    setError((p) => ({ ...p, ...errorObj }));

    console.log(errorObj);
    if (Object.keys(errorObj).length !== 0) return;

    firebase
      .updateUserPassword(newPassword)
      .then((res) => {
        firebase.updateData(`users/${uidRef.current}`, {
          password: newPassword
        })
        firebase.logoutUser();
        setSummary(true);
        
      })
      .catch((err) => setError((p) => ({ ...p, try: err.message })));
  };

  return (
    <>
      <div>
        <div className="fixed inset-0 z-10 flex h-full w-full flex-col bg-gray-100 p-6">
          <div>
            <i
              onClick={() => window.location.reload()}
              className="fa-solid fa-arrow-left p-4 text-[20px]"
            ></i>
          </div>

          <div className="self-center">
            <div className="flex w-full justify-center">
              {imgLoading ? (
                <div className="mt-8 h-[130px] w-[150px] bg-gray-200"></div>
              ) : (
                ""
              )}
              <img
                onLoad={() => setImgLoading(false)}
                className="w-[60%]"
                src={lock}
                alt=""
              />
            </div>
            <h2 className="text-center text-[30px] font-[600] text-[#e21b70]">
              Password Recovery
            </h2>
            <p className="text-center text-[18px]">Step ({step}/3)</p>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h3 className="mt-10 self-center text-[26px] font-[400]">
                Choose recovery method
              </h3>
              <div className="mt-3 flex flex-col gap-1">
                <label className="text-[18px]">
                  <input
                    className="mr-2 accent-pink-500"
                    type="radio"
                    checked={method === "current"}
                    name="methodType"
                    value="current"
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  Recover my current password
                </label>
                <label className="text-[18px]">
                  <input
                    className="mr-2 accent-pink-500"
                    type="radio"
                    checked={method === "new"}
                    name="methodType"
                    value="new"
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  Update new password
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setStep(2)
                  }}
                  className={`mt-13 h-[64px] w-[170px] rounded-md text-[18px] text-white ${
                    !method ? "pointer-events-none bg-gray-500" : "bg-[#e21b70]"
                  } `}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="mt-7 flex flex-col items-center gap-6">
              <h2 className="self-center text-[26px] font-[400]">
                Enter your Number
              </h2>
              <div className="scale-[120%] shadow-[0px_0px_5px_rgba(0,0,0,0.2)]">
                <PhoneInput
                  userData={userData}
                  setUserData={setUserData}
                  setError={setError}
                />
              </div>

              {error.sending && <p className="text-red-600">{error.sending}</p>}

              <button
                onClick={(e)=>{
                  handleSendOtp()
                }}
                className={`mt-6 h-[64px] w-[170px] rounded-md text-[18px] text-white ${
                  userData.phoneNumber.length <
                  userData.numberLength + userData.codeLength
                    ? "pointer-events-none bg-gray-500"
                    : "bg-[#e21b70]"
                }`}
              >
                Send Otp
              </button>
              
            </div>
          )}

          {/* Step 3 */}
          {change ? (
            <div className="mt-7 flex flex-col items-center gap-8">
              <h2 className="text-[23px]">Set New Password</h2>

              {/* Summary on Completion */}
              {!summary ? (
                ""
              ) : (
                <div className="fixed inset-0 bg-gray-700/30 p-4 backdrop-blur-[3px]">
                  <div
                    onClick={() => window.location.reload()}
                    className="absolute top-2 right-2 p-2"
                  >
                    <i className="fa-solid fa-circle-xmark text-[34px] text-gray-700"></i>
                  </div>

                  <div className="mt-[50%] flex h-[300px] w-full flex-col items-center gap-7 rounded-2xl bg-gray-700 p-4 text-white">
                    <div className="flex flex-col items-center">
                      <div className="flex h-[40px] items-center gap-1">
                        <img
                          className="h-full object-contain"
                          src={green}
                          alt=""
                        />
                        <h2 className="text-[28px] font-bold">Success</h2>
                      </div>
                      <p className="mt-2 text-[14px]">
                        Your Password have been successully Updated.
                      </p>
                    </div>

                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(newPassword);
                        copied();
                      }}
                      className="flex h-[50px] w-[75%] items-center justify-between rounded-2xl bg-gray-600 px-5"
                    >
                      <p>{newPassword ? newPassword : "12345678"}</p>

                      <div className="px-1">
                        {copy ? "✅" : <i className="fa-solid fa-copy"></i>}
                      </div>
                    </div>

                    <button
                      onClick={() => window.location.reload()}
                      className="flex h-[50px] w-[100px] items-center justify-center rounded-md bg-green-600 p-2 text-[18px]"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              )}

              <div className="flex w-[210px] flex-col items-center gap-4">
                <input
                  className="h-[65px] w-full rounded-2xl bg-gray-300 px-8 py-2"
                  type="text"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setError((p) => {
                      const { password, ...rest } = p;
                      return rest;
                    });
                  }}
                />
                {error.password ? (
                  <p className="bg-amber-200 p-0 text-red-600">
                    {error.password}
                  </p>
                ) : (
                  ""
                )}
                {error.try ? (
                  <p className="bg-amber-200 p-0 text-red-600">{error.try}</p>
                ) : (
                  ""
                )}
              </div>

              <button
                onClick={UpdateNewPassword}
                className="mt-3 h-[57px] w-[155px] bg-[#e21b70] text-[18px] text-white active:scale-[98%]"
              >
                Update
              </button>
            </div>
          ) : (
            step === 3 &&
            (!password ? (
              <div className="mt-4 flex flex-col items-center">
                {/* heading */}
                <div className="flex flex-col items-center">
                  <h2 className="text-[26px] font-[400]">Confirm its you</h2>
                  <p>Enter 6 digit code sent to {userData.phoneNumber}</p>
                </div>

                {/* boxes */}
                <div className="mt-4 flex gap-3 p-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      type="tel"
                      value={digit}
                      onChange={(e) => handleChange(e, i)}
                      ref={(el) => (inputRefs.current[i] = el)}
                      className="h-[50px] w-[45px] rounded-2xl bg-gray-300 text-center text-[20px] shadow-[0px_0px_5px_rgba(0,0,0,0.5)]"
                    />
                  ))}
                </div>

                {/* button */}
                <button
                  onClick={handleVerifyOtp}
                  ref={verifyBtnRef}
                  className="mt-8 h-[64px] w-[170px] rounded-md bg-[#e21b70] text-[18px] text-white"
                >
                  Verify Otp
                </button>
              </div>
            ) : (
              <div className="mt-7 flex flex-col items-center gap-3 text-center text-[20px]">
                <p className="self-center">Your Current Password</p>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(password);
                    copied();
                  }}
                  className="flex h-[70px] w-[220px] items-center justify-center gap-2 rounded-md bg-gray-200 shadow active:scale-[98%]"
                >
                  <span>
                    {password}{" "}
                    {copy ? (
                      '✅'
                    ) : (
                      <i className="fa-solid fa-copy text-[16px] text-[#e21b70]"></i>
                    )}
                  </span>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
