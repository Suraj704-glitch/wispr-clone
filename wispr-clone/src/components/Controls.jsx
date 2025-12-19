import React from "react";
import "../CSS/Controls.css";
// FaSave import kiya (Floppy Disk Icon)
import { FaMicrophone, FaStop, FaRegCopy, FaTrash, FaCheck, FaSave } from "react-icons/fa";

const Controls = ({ isRecording, onRecord, onStop, onCopy, onSave, onClear, hasText, isCopied }) => {
  return (
    <div className="controls">
      {/* Main Start/Stop Button */}
      {!isRecording ? (
        <button className="btn-main btn-record" onClick={onRecord}>
          <FaMicrophone /> Start
        </button>
      ) : (
        <button className="btn-main btn-stop" onClick={onStop}>
          <FaStop /> Stop
        </button>
      )}

      {/* Copy Button */}
      <button 
        className={`btn-icon ${isCopied ? "btn-copy-success" : ""}`}
        onClick={onCopy} 
        disabled={!hasText}
        title="Copy Text"
      >
        {isCopied ? <FaCheck /> : <FaRegCopy />}
      </button>

      {/* --- NEW SAVE BUTTON --- */}
      <button 
        className="btn-icon" 
        onClick={onSave} 
        disabled={!hasText}
        title="Save to Computer"
      >
        <FaSave />
      </button>

      {/* Delete Button */}
      <button 
        className="btn-icon" 
        onClick={onClear} 
        disabled={!hasText}
        title="Clear"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default Controls;