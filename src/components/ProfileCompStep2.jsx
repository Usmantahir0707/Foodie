import { useState } from "react";
import Camera from "./Camera";



export default function ProfileCompStep2({imageCaptured, setImageCaptured, setStep}) {
 const [cameraActive, setCameraActive] = useState(false); 

  return (
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
              Your profile picture helps others recognize you and can be changed
              anytime.
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
  )
}
