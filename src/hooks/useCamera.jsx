
import { useRef, useState, useCallback } from "react";

export function useCamera(options = {}) {
  const mode = options.mode ?? "image";        
  const initial = options.initial ?? "image";   
  const facingMode = options.facingMode ?? "user"; 

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const [currentMode, setCurrentMode] = useState(mode === "both" ? initial : mode);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);

 
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: currentMode === "video",
      });
      console.log(stream)
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setError(err);
    }
  }, [currentMode, facingMode]);

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Capture Image
  const captureImage = useCallback(() => {
    if (!videoRef.current) return null;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    return canvas.toDataURL("image/png");
  }, []);

  // Start Video Recording
  const startRecording = useCallback(() => {
    if (!streamRef.current) return;

    const chunks = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm;codecs=vp9",
    });

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorderRef.current._chunks = chunks;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    // Start timer
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  }, []);

  // Stop Video Recording
  const stopRecording = useCallback(() => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) return;

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(mediaRecorderRef.current._chunks, { type: "video/webm" });
        setIsRecording(false);
        clearInterval(recordingIntervalRef.current);
        setRecordingTime(0);
        resolve(blob);
      };

      mediaRecorderRef.current.stop();
    });
  }, []);

  // Switch Mode (only if mode="both")
  const switchMode = useCallback(
    async (newMode) => {
      if (mode !== "both") return;
      if (newMode !== "image" && newMode !== "video") return;

      stopRecording();
      stopCamera();
      setCurrentMode(newMode);

      // Wait a tick for state to update before restarting
      await new Promise((r) => setTimeout(r, 50));
      startCamera();
    },
    [mode, stopCamera, startCamera]
  );

  return {
    videoRef,
    error,
    currentMode,
    isRecording,
    recordingTime,
    captureImage: mode === "video" ? undefined : captureImage,
    startRecording: mode === "image" ? undefined : startRecording,
    stopRecording: mode === "image" ? undefined : stopRecording,
    switchMode: mode === "both" ? switchMode : undefined,
    startCamera,
    stopCamera,
  };
}
