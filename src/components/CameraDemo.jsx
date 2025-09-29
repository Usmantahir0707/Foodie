import { useState, useEffect } from "react";
import { useCamera } from "../hooks/useCamera";

export default function CameraDemo() {
  const mode = "both"; 
  const {
    videoRef,
    currentMode,
    captureImage,
    startRecording,
    stopRecording,
    switchMode,
    isRecording,
    recordingTime,  // timer from hook
    error,
    startCamera,    
    stopCamera,     
  } = useCamera({ mode, initial: "image", facingMode: "user" });

  const [imageSrc, setImageSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);``

  const handleStartCamera = () => {
    startCamera();
    setCameraStarted(true);
  };

  const handleStopCamera = () => {
    stopCamera();
    setCameraStarted(false);
  };

  const handleCapture = () => {
    const dataUrl = captureImage();
    setImageSrc(dataUrl);
  };

  const handleStartRecording = () => startRecording();

  const handleStopRecording = async () => {
    const blob = await stopRecording();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setVideoSrc(url);
  };

  // Format timer as mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Camera Demo ({currentMode})</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!cameraStarted && (
        <button onClick={handleStartCamera}>Start Camera</button>
      )}

      {cameraStarted && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={currentMode === "video" ? false : true}
            style={{ width: "400px", border: "1px solid black" }}
          />

          <div style={{ marginTop: "10px" }}>
            <button onClick={handleStopCamera}>Stop Camera</button>

            {currentMode === "image" && (
              <button onClick={handleCapture}>Capture Image</button>
            )}

            {currentMode === "video" && (
              <>
                {!isRecording && <button onClick={handleStartRecording}>Start Recording</button>}
                {isRecording && (
                  <>
                    <button onClick={handleStopRecording}>Stop Recording</button>
                    <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                      {formatTime(recordingTime)}
                    </span>
                  </>
                )}
              </>
            )}

            {mode === "both" && switchMode && (
              <>
                <button onClick={() => switchMode("image")}>Switch to Image</button>
                <button onClick={() => switchMode("video")}>Switch to Video</button>
              </>
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            {imageSrc && (
              <div>
                <h4>Captured Image:</h4>
                <img src={imageSrc} alt="captured" style={{ width: "300px" }} />
              </div>
            )}

            {videoSrc && (
              <div>
                <h4>Recorded Video:</h4>
                <video src={videoSrc} controls style={{ width: "300px" }} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
