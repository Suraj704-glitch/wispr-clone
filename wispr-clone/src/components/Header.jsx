import React from "react";
import "../CSS/Header.css";
const Header = ({ isRecording }) => {
  return (
    <div className="header-container">
      <div className="header-title">
       
        <span style={{ color: "#22d3ee" }}>🌀</span> Wispr Flow  
        
      </div>
       <h4>Suraj</h4>
      <div className={`status-badge ${isRecording ? "status-recording" : "status-idle"}`}>
        {isRecording ? "● RECORDING" : "IDLE"}
      </div>
    </div>
  );
};

export default Header;