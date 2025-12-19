import React, { useState } from "react";
import "./App.css"; 
import { useAudioRecorder } from "./hooks/useAudioRecorder"; 
import Header from "./components/Header";
import TranscriptBox from "./components/TranscriptBox";
import Controls from "./components/Controls";

function App() {
  const { 
    isRecording, 
    transcript,
    setTranscript, 
    error, 
    debugInfo,
    startRecording, 
    stopRecording, 
    clearTranscript 
  } = useAudioRecorder();

  // --- Notification States ---
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // New State for Save

  // --- COPY FUNCTION (No Alert) ---
  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    
    // Alert की जगह ये State यूज़ करें
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // --- SAVE FUNCTION (No Alert) ---
  const handleSave = () => {
    if (!transcript) return;

    // 1. File Download Logic
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Wispr_Note.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // 2. Feedback Show करें (Alert नहीं!)
    setIsSaved(true); // "Saved!" मैसेज दिखाएगा
    
    setTimeout(() => {
      setIsSaved(false); // मैसेज हटाएगा
      clearTranscript(); // टेक्स्ट बॉक्स खाली करेगा
    }, 2000);
  };

  return (
    <div className="main-container">
      <Header isRecording={isRecording} />

      <div style={{ fontSize: "10px", color: "#334155", marginBottom: "5px", fontFamily: "monospace" }}>
        STATUS: {debugInfo}
      </div>

      {error && <div className="error-banner">{error}</div>}

      <TranscriptBox 
        text={transcript} 
        onTextChange={setTranscript} 
        isRecording={isRecording}    
        isCopied={isCopied} 
        isSaved={isSaved} // <--- Save Status पास किया
      />

      <Controls 
        isRecording={isRecording}
        onRecord={startRecording}
        onStop={stopRecording}
        onCopy={handleCopy}
        onSave={handleSave}
        onClear={clearTranscript}
        hasText={transcript.length > 0}
        isCopied={isCopied} 
      />
    </div>
  );
}

export default App;