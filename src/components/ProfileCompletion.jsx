import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import useLocal from "../hooks/useLocal";
import Camera from "./Camera";
import logo from "../assets/logo.png";
import locationIcon from "../assets/locationIcon.svg";

// --- Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvpA4aCrX9jKA-L3IsO1FwAUFl0l8qdek",
  authDomain: "foodie-deliver.firebaseapp.com",
  databaseURL: "https://foodie-deliver-default-rtdb.firebaseio.com",
  projectId: "foodie-deliver",
  storageBucket: "foodie-deliver.firebasestorage.app",
  messagingSenderId: "772952462160",
  appId: "1:772952462160:web:4d7ec6d737ca2a92061255",
};

// --- Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ProfileCompletion() {
  const [userDetails, setUserDetails] = useLocal("foodie-user", {});
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [codeSent, setCodeSent] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(null);
  const [loading, setLoading] = useState(true);
  const inputRefs = useRef([]);
  const recaptchaVerifierRef = useRef(null);
  const confirmationResultRef = useRef(null);

  // --- Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- OTP input handlers
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  // --- Initialize invisible ReCAPTCHA
  const initRecaptcha = () => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        "recaptcha-container",
        { size: "invisible" },
        auth
      );
      recaptchaVerifierRef.current.render();
    }
    return recaptchaVerifierRef.current;
  };

  // --- Send OTP
  const sendOtpHandler = async () => {
    try {
      const appVerifier = initRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        userDetails.phoneNumber,
        appVerifier
      );
      confirmationResultRef.current = confirmationResult;
      setCodeSent(true);
      alert("OTP sent! Check your Firebase test number.");
    } catch (err) {
      console.error("Send OTP Error:", err);
      alert(
        "Failed to send OTP. Make sure the number is a Firebase test number and your domain is authorized."
      );
    }
  };

  // --- Verify OTP
  const verifyOtpHandler = async () => {
    try {
      const code = otp.join("");
      if (!confirmationResultRef.current) throw new Error("No OTP session.");
      await confirmationResultRef.current.confirm(code);
      alert("Phone verified successfully!");
      setStep((p) => p + 1);
    } catch (err) {
      console.error("OTP Verification Error:", err);
      alert("Invalid OTP. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-2">
        <img className="animate-bounce" src={logo} alt="" />
        <div className="loading h-[80px] w-[80px] rounded-[50%] border-t-3 border-[#e21b70]"></div>
      </div>
    );

  return (
    <div className="px-6 pt-5 text-center">
      {/* Step 1: Location */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-14 md:gap-3">
          <h2 className="text-[26px] font-[600]">
            Hey {userDetails.name}! Just a couple more steps to get started.
          </h2>
          <div>
            <h4 className="text-[32px] font-[700] text-[#e21b70]">
              Set your location
            </h4>
            <p className="mt-1 text-gray-600">
              Choose where you’d like your orders delivered— update it anytime
              later.
            </p>
          </div>
          <img className="w-[130px] py-10" src={locationIcon} alt="" />
          <button className="flex w-[250px] items-center gap-3 border-3 border-dotted border-[#e21b70] p-3 text-[20px] md:scale-[0.8]">
            <i className="fa-solid fa-square-plus text-[32px] text-[#e21b70] md:text-[32px]"></i>
            <span className="text-[#e21b70]">Add location</span>
          </button>
          <button
            onClick={() => setStep(2)}
            className="w-[250px] bg-[#e21b70] p-4 text-[20px] text-white active:scale-[98%] md:scale-[0.8] md:active:scale-[0.76]"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Profile Picture */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-[60px] pt-[62px] md:pt-[20px]">
          <button
            className="absolute top-6 left-4 px-3 text-[26px] text-[#e21b70]"
            onClick={() => setStep(1)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <div>
            <h2 className="text-[32px] font-[700] text-[#e21b70]">
              Upload your profile picture
            </h2>
            <p className="mt-1 text-gray-600">
              Your profile picture helps others recognize you and can be changed anytime.
            </p>
          </div>

          <div className="flex flex-col items-center gap-[78px] md:scale-[0.9] md:gap-[30px]">
            <div
              className={`relative h-[290px] w-[320px] rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.2)] ${
                cameraActive ? "bg-white p-0" : "bg-white p-4"
              }`}
            >
              {cameraActive ? (
                <Camera
                  setCameraActive={setCameraActive}
                  setImageCaptured={setImageCaptured}
                />
              ) : imageCaptured ? (
                <div className="h-[90%] flex-1">
                  <div className="flex h-[90%] w-full items-center justify-center overflow-hidden">
                    <img
                      className="max-h-full max-w-full object-contain"
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
                      onClick={() => setImageCaptured(null)}
                      className="flex cursor-pointer items-center gap-1 p-3 text-[18px] text-[#e21b70]"
                    >
                      <i className="fa-solid fa-trash"></i>
                      <p>Remove</p>
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
            <button
              onClick={() => setStep(3)}
              className="w-[250px] bg-[#e21b70] p-4 text-[20px] text-white active:scale-[0.98] md:scale-[0.8] md:active:scale-[0.76]"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Phone Verification */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-[80px] pt-[60px]">
          <button
            className="absolute top-6 left-4 px-3 text-[26px] text-[#e21b70]"
            onClick={() => setStep(2)}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>

          <div className="text-center">
            <h2 className="text-[32px] font-[700] text-[#e21b70]">
              Phone number verification
            </h2>
            <p className="mt-1 text-gray-600">
              {codeSent
                ? `Enter the 6-digit code sent to ${userDetails.phoneNumber}`
                : `Send OTP to ${userDetails.phoneNumber}`}
            </p>
          </div>

          {codeSent ? (
            <>
              <div className="flex gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    maxLength={1}
                    ref={(el) => (inputRefs.current[i] = el)}
                    value={digit}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="h-[45px] w-[45px] rounded-lg border-2 border-gray-300 text-center text-[24px] outline-none focus:border-[#e21b70]"
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={verifyOtpHandler}
                  className="w-[250px] bg-[#e21b70] p-4 text-[20px] text-white active:scale-[98%]"
                >
                  Verify
                </button>
                <button
                  onClick={sendOtpHandler}
                  className="text-[16px] text-[#e21b70] underline"
                >
                  Resend Code
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={sendOtpHandler}
                className="w-[250px] bg-[#e21b70] p-4 text-[20px] text-white active:scale-[0.98]"
              >
                Send OTP
              </button>
            </div>
          )}

          {/* ReCAPTCHA container */}
          <div id="recaptcha-container"></div>
        </div>
      )}
    </div>
  );
}
