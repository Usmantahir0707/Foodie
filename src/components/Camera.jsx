import { useCallback, useEffect, useRef } from "react"

export default function Camera({setCameraActive, setImageCaptured}) {
  const streamRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(()=>{
   startCamera();
  }, [])

  const startCamera = useCallback(async ()=>{
    try{
       const stream = await navigator.mediaDevices.getUserMedia({
        video: 'user',
        audio: false,
       });
       streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
    }
    catch(err){
      console.log(err)
    } 
  }, [])
  
  const stopCamera = useCallback(() => {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }
  if (videoRef.current) {
    videoRef.current.srcObject = null; // 👈 clear video element
  }
}, []);

 const captureImage = useCallback(()=>{
  if(!videoRef.current) return
  const canvas = document.createElement('canvas')
  canvas.height = videoRef.current.videoHeight;
  canvas.width = videoRef.current.videoWidth;
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoRef.current, 0, 0);

  const image = canvas.toDataURL('image/png');
  setImageCaptured(image)  
 }, [])
  
  return (
    <div className="relative flex flex-col">
      <div 
      onClick={()=>{
        stopCamera();
        setCameraActive(false)
        console.log('ds')
      }}
      className="bg-white/30 md:scale-[0.8] cursor-pointer z-10 backdrop-blur-md h-[40px] w-[40px] absolute p-0 
      flex items-center justify-center rounded-[50%] top-2 right-2">
        <i className="fa-solid fa-xmark text-[24px] text-[#e21b70]"></i>
      </div>
      <video autoPlay ref={videoRef} 
      className="rounded-md w-[320px] h-[234px]">
      </video>
      <div className="text-[#e21b70] flex justify-around">
        <div 
        onClick={()=>{
          captureImage();
          stopCamera();
          setCameraActive(false);
        }}
        className="p-3 cursor-pointer">
          <i className="fa-solid fa-camera text-[27px]"></i>
        </div>

        
      </div>
    </div>
  )
}
 