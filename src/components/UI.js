// UI.js
import React, { useEffect, useRef } from 'react';
import './styles.css';

const UI = () => {
  const pointsInputRef = useRef(null);
  const circlesContainerRef = useRef(null);

  useEffect(() => {
    const handlePlayButtonClick = () => {
      const points = parseInt(pointsInputRef.current.value, 10);
      const circlesContainer = circlesContainerRef.current;

      // Clear any existing circles
      circlesContainer.innerHTML = '';

      // Generate circles
      for (let i = 1; i <= points; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.textContent = i;
        circlesContainer.appendChild(circle);
      }
    };

    const playButton = document.getElementById('playBtn');
    playButton.addEventListener('click', handlePlayButtonClick);

    // Cleanup the event listener on component unmount
    return () => {
      playButton.removeEventListener('click', handlePlayButtonClick);
    };
  }, []);

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
          ref={pointsInputRef}
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
        <div id="circlesContainer" ref={circlesContainerRef}></div>
      </div>
    </div>
  );
}

export default UI;
