import React, { useEffect, useRef } from "react";
import "../CSS/TranscriptBox.css";
const TranscriptBox = ({ text, onTextChange, isRecording, isCopied, isSaved }) => {
  const bottomRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (isRecording) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [text, isRecording]);

  return (
    <div className="transcript-box">
      
      {/* --- NOTIFICATIONS AREA --- */}
      
      {/* 1. Copied Message */}
      {isCopied && <div className="copy-toast">✅ Copied!</div>}

      {/* 2. Saved Message (New) */}
      {isSaved && (
        <div className="copy-toast" style={{ backgroundColor: "#3b82f6" }}>
          💾 Saved & Cleared!
        </div>
      )}

      <textarea
        className="text-area-input"
        value={text}
        
        // Edit Logic
        onChange={(e) => {
           if (!isRecording) onTextChange(e.target.value);
        }}
        
        disabled={isRecording} 
        
        // Styling
        style={{
           opacity: 1, 
           cursor: isRecording ? 'default' : 'text'
        }}

        placeholder={isRecording ? "Listening..." : "Click here to edit text..."}
        spellCheck="false"
      />
      
      <div ref={bottomRef} />
    </div>
  );
};

export default TranscriptBox;