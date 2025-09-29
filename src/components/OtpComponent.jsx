import { useState, useRef } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OTPComponent() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const confirmationResultRef = useRef(null);

  const auth = getAuth();

  // --- Init Recaptcha (fixed param order for v9+)
  const initRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, // auth instance comes first
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
        }
      );
    }
    return window.recaptchaVerifier;
  };

  // --- Send OTP
  const sendOtp = async () => {
    if (!phone) return alert("Enter phone number with country code (e.g. +923001234567)");

    try {
      const appVerifier = initRecaptcha();
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      confirmationResultRef.current = confirmationResult;
      setCodeSent(true);
      alert("OTP sent to " + phone);
    } catch (err) {
      console.error("Send OTP Error:", err);
      alert("Failed to send OTP: " + err.message);
    }
  };

  // --- Verify OTP
  const verifyOtp = async () => {
    try {
      if (!confirmationResultRef.current) throw new Error("No OTP session.");
      await confirmationResultRef.current.confirm(otp);
      alert("Phone number verified successfully 🎉");
    } catch (err) {
      console.error("Verify OTP Error:", err);
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      {!codeSent ? (
        <>
          <input
            type="tel"
            placeholder="+923001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />
          <button
            onClick={sendOtp}
            className="bg-pink-600 text-white px-4 py-2 rounded"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border px-3 py-2 rounded w-64 text-center tracking-widest"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Required for reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
