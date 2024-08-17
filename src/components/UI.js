// UI.js
import React from 'react';
import './styles.css';

const UI = () => {
  return (
    <div id="gameContainer">
      <h1>LET'S PLAY</h1>

      <div className="row">
        <p className="label">Points:</p>
        <input 
          type="number" 
          id="pointsInput" 
          className="input-field"  
          min="1" 
          max="100" 
          placeholder="Nhập số điểm" 
        />
        <p className="zero-field"></p>
      </div>

      <div className="row">
        <p className="label">Time:</p>
        <span id="timeDisplay" className="input-field">0.0s</span>
        <p className="zero-field"></p>
      </div>

      <button id="playBtn">Play</button>
      <div id="square">
        <div id="circlesContainer"></div>
      </div>
    </div>
  );
}

export default UI;
