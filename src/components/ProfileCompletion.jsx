import { useEffect, useState } from "react";
import useLocal from "../hooks/useLocal";
import logo from "../assets/logo.png";
import ProfileCompStep1 from "./ProfileCompStep1";
import ProfileCompStep2 from "./ProfileCompStep2";
import ProfileCompStep3 from "./ProfileCompStep3";

export default function ProfileCompletion() {
  
  const [userDetails, setUserDetails] = useLocal("foodie-user", {});
  const [step, setStep] = useState(1);
  const [userAddress, setUserAddress] = useState('');
  const [imageCaptured, setImageCaptured] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


  if (loading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-2">
        <img className="animate-bounce scale-[0.6]" src={logo} alt="" />
        <div className="loading h-[80px] w-[80px] rounded-[50%] border-t-3 border-[#e21b70]"></div>
      </div>
    );

  return (
    <div className="px-6 pt-5 text-center">
      {/* Step 1: Location */}
      {step === 1 && <ProfileCompStep1
      userDetails={userDetails}
      userAddress={userAddress}
      setUserAddress={setUserAddress}
      setStep={setStep}
      />}

      {/* Step 2: Profile Picture */}
      {step === 2 && <ProfileCompStep2
      imageCaptured={imageCaptured}
      setImageCaptured={setImageCaptured}
      setStep={setStep}
      />}

      {/* Step 3: Phone Verification */}
      {step === 3 && <ProfileCompStep3
      userDetails={userDetails}
      imageCaptured={imageCaptured}
      userAddress={userAddress}
      setStep={setStep}
      />}
    </div>
  );
}
