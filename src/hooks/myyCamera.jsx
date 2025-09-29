import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";

export default function myyCamera(options = {}) {
  const mode = options.mode ?? "image";
  const initial = options.initial ?? "image";
  const facingMode = options.facingMode ?? "user";
//
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingIntervalRef = useref(null);
  const [currentMode, setCurrentMode] = useState((mode = "both" ? initial : mode));
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);
//
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: facingMode,
        audio: mode === "video",
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current = stream;
    } catch (err) {
      console.log(err);
    }
  }, [facingMode, mode]);
//
  const stopCamera = useCallback(() => {
    if (!streamRef.current) return;
    streamRef.current.getTrack().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);
////
//
  const captureImage = useCallback(() => {
    if (!videoRef.common) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    return canvas.toDataURL("image/png");
  }, []);
  ////
//
  const startRecording = useCallback(() => {
    if(!streamRef.current) return
    const chunks = [];
    
  }, []);

  return {};
}
