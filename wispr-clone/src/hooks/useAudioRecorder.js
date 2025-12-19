import { useState, useRef } from "react";
// Path check kar lena, agar services folder mein hai to ye sahi hai
import { startStream } from "../services/deepgramService";

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(""); 
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("Idle");
  
  const stopStreamRef = useRef(null);

  const startRecording = async () => {
    setError(null);
    setDebugInfo("Requesting Mic...");
    try {
      const stopFn = await startStream(
        (newText) => {
          if (newText) setTranscript((prev) => prev + " " + newText);
        },
        (err) => { setError(err); setIsRecording(false); }
      );
      stopStreamRef.current = stopFn;
      setIsRecording(true);
      setDebugInfo("Recording...");
    } catch (err) {
      setError("Failed to start");
    }
  };

  const stopRecording = () => {
    if (stopStreamRef.current) {
      stopStreamRef.current();
      stopStreamRef.current = null;
    }
    setIsRecording(false);
    setDebugInfo("Stopped");
  };

  const clearTranscript = () => {
    setTranscript("");
    setDebugInfo("Cleared");
  };

  // --- YE RETURN WALA PART SABSE ZAROORI HAI ---
  return {
    isRecording,
    transcript,
    setTranscript, // <--- Ye line Edit feature ko chalu karegi
    error,
    debugInfo,
    startRecording,
    stopRecording,
    clearTranscript,
  };
};