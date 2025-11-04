import { useState, useRef } from "react";
import { EmailAuthProvider, linkWithCredential } from "firebase/auth";
import dataURLtoFile from "../utility/dataURLtoFile";
import { useFirebase } from "../contexts/fireBaseContext";
import useFirebaseStorage from "../hooks/useFirebaseStorage";
import { useNavigate } from "react-router-dom";
import plane from '../assets/plane.jpg'
import hand from '../assets/hand.jpg'

export default function ProfileCompStep3({ userDetails, imageCaptured, userAddress, setStep }) {
  const [codeSent, setCodeSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { uploadFile, loading: uploadloading, error } = useFirebaseStorage();
  const firebase = useFirebase();
    const confirmationObjRef = useRef(null);
    const navigate = useNavigate()
const inputRefs = useRef([]);



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


  const handleSendOtp = async () => {
    setOtpLoading(true);
    try {
      const obj = await firebase.sendOtp(userDetails.phoneNumber);
      if (obj?.verificationId) {
        confirmationObjRef.current = obj;
        setCodeSent(true);
      }
    } catch (err) {
      console.error("Failed to send OTP:", err);
    } finally {
      setOtpLoading(false);
    }
  };


  const handleVerifyOtp = async () => {
    try {
      setOtpLoading(true);
      const otpFormatted = otp.join("");
      const res = await firebase.verifyOtp(otpFormatted, confirmationObjRef);
      const user = res.user;
      const uid = user.uid;

      if (!uid) throw new Error("No UID returned from OTP verification");

      //  Link email/password (inside main try)
      const email = `${user.phoneNumber.replace(/\D/g, "")}@example.com`;
      const password = userDetails.password;
      try {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(user, credential);
        console.log("Linked phone user with email:", email);
      } catch (err) {
        if (err.code === "auth/provider-already-linked") {
          console.log("Already linked with email provider");
        } else {
          console.error("Error linking email:", err);
        }
      }

      if (imageCaptured) {
        const imgFormatted =
          imageCaptured instanceof File
            ? imageCaptured
            : dataURLtoFile(imageCaptured, "profile.png");

        const url = await uploadFile(imgFormatted, `users/${uid}/profile.png`);

        await firebase.putData(`users/${uid}`, {
          name: userDetails.name || '',
          phoneNumber: userDetails.phoneNumber || '',
          password: userDetails.password || '',
          address: userAddress.fullAddress || '',
          profilePic: url || '',
        });
      } else {
        await firebase.putData(`users/${uid}`, {
          name: userDetails.name || '',
          phoneNumber: userDetails.phoneNumber || '',
          password: userDetails.password || '',
          address: userAddress.fullAddress || '',
          profilePic: "",
        });
      }

      console.log("User data saved successfully");
      navigate("/home", { state: { firstLogin: true } });
      setOtpLoading(false);
    } catch (err) {
      console.error("Error in OTP verification or data upload:", err);
      setOtpLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[80px] lg:gap-[60px] pt-[10px] scale-[0.88]">
      <button
        className="absolute top-[-20px] left-[-20px] px-3 text-[26px] text-[#e21b70]"
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

      <div className="h-[120px] w-[220px]">
        {
          codeSent ? 
          <img className="w-[90%] object-contain translate-y-[-30px]" src={hand} alt="" />
          : 
          <img className="w-full object-contain" src={plane} alt="" />
        }
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
              onClick={handleVerifyOtp}
              className={`w-[250px] bg-[#e21b70] p-4 scale-[0.9] text-[20px] text-white active:scale-[88%] ${otpLoading ? "pointer-events-none bg-gray-600" : "bg-[#e21b70]"}`}
            >
              {!otpLoading ? (
                "Verify"
              ) : (
                <>
                  Verify ...{" "}
                  <i className="fa-solid fa-spinner loadingSlow scale-[1.1]"></i>
                </>
              )}
            </button>
            <button
              onClick={handleSendOtp}
              className="text-[16px] text-[#e21b70] underline"
            >
              Resend Code
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button
          
            onClick={handleSendOtp}
            className={`w-[250px] p-4 text-[20px] text-white lg:scale-[0.9] lg:active:scale-[0.88] active:scale-[0.98] ${otpLoading ? "pointer-events-none bg-gray-600" : "bg-[#e21b70]"}`}
          >
            {!otpLoading ? (
              "Send Otp"
            ) : (
              <>
                Send Otp ... <i className="fa-solid fa-spinner loadingSlow"></i>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
