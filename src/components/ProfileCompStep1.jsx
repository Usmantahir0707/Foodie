import { useState, useEffect, useRef } from "react";
import locationIcon from "../assets/locationIcon.svg";
import { useGoogleMapApi } from "../hooks/useGoogleMapsApi";



export default function ProfileCompStep1({
  userDetails,
  userAddress,
  setUserAddress,
  setStep,
}) {
  const [locating, setLocating] = useState(false);

  // Refs
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Hook
  const {
    address,
    loading,
    error,
    fetchUserLocation,
    initAutocomplete,
    initMap,
    resetMap,
  } = useGoogleMapApi(mapContainerRef);

  // Initialize map after container is rendered
  useEffect(() => {
    if (locating && mapContainerRef.current) {
      initMap();
    }
  }, [locating, initMap]);

  // Initialize autocomplete when input exists
  useEffect(() => {
    if (locating && inputRef.current) {
      initAutocomplete(inputRef.current);
    }
  }, [locating, initAutocomplete]);

  return (
    <div className="flex flex-col items-center gap-10 md:gap-3 scale-[0.9]">
      {!locating && 
      <h2 className="text-[26px] font-[600]">
        Hey {userDetails.name}! Just a couple more steps to get started.
      </h2>
    }
      

      <div>
        <h4 className="text-[32px] font-[700] text-[#e21b70]">
          Set your location
        </h4>
        <p className="mt-1 text-gray-600">
          Choose where you’d like your orders delivered— update it anytime later.
        </p>
      </div>

      {!locating ? (
        <>
        {
          userAddress ? 
          <div className="h-[244px]">📍 {userAddress.fullAddress}</div>
          :
          <img className="w-[130px] py-10" src={locationIcon} alt="" />
        }
          
          <button
            onClick={() => setLocating(true)}
            className="flex w-[250px] items-center gap-3 border-3 border-dotted border-[#e21b70] p-3 text-[20px] md:scale-[0.8]"
          >
            <i className="fa-solid fa-square-plus text-[32px] text-[#e21b70] md:text-[32px]"></i>
            <span className="text-[#e21b70]">
              {!address ? "Add location" : "Change location"}
            </span>
          </button>
          <button
            onClick={() => setStep(2)}
            className="w-[250px] bg-[#e21b70] p-4 text-[20px] text-white active:scale-[98%] md:scale-[0.8] md:active:scale-[0.76]"
          >
            Next
          </button>
        </>
      ) : (
        <div className="w-full flex flex-col gap-4">
          {/* Input for Google Places */}
          <input
            ref={inputRef}
            className="bg-gray-200 h-[50px] px-2 rounded"
            type="text"
            placeholder="Search your location"
          />
          <button
              onClick={fetchUserLocation}
              className="w-[200px] h-[50px] bg-[#e21b70] text-white rounded"
            >
              Auto locate
            </button>
          {/* Map container */}
          <div ref={mapContainerRef} className={`w-full self-center max-w-[500px] h-[220px] rounded shadow ${loading && 'hidden'}`} />
          {loading && <div className="shimmer w-full self-center max-w-[500px] h-[220px] rounded shadow"></div>}
          {/* Status messages */}
          {loading && <p className="mt-2 text-gray-500">Fetching your location...</p>}
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {address ? 
            <p className="mt-2 h-[70px] text-gray-700">📍 {address.fullAddress}</p>
            :
             <div className="h-[70px]">Select new location !</div>
          }

          {/* Buttons */}
          <div className="flex gap-6 justify-center mt-2">
            
            <button
              onClick={() => {
                setUserAddress(address)
                setLocating(false)
                resetMap()
              }}
              className={`w-[150px] h-[50px]  text-white rounded
                ${address ? 'bg-[#e21b70]' : 'bg-gray-300 pointer-events-none'}`}
            >
              Save
            </button>
            <button
             onClick={()=> {
              setLocating(false)
              resetMap()
             }}
             className="w-[150px] h-[50px] bg-[#e21b70] text-white rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
