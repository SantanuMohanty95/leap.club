import React, { useState, useEffect } from "react";
import "./App.css";
import MemoryGame from "./Components/MemoryGame";

export default function App() {
  const [options, setOptions] = useState(null);
  const [Score, setScore] = useState(0);

  useEffect(() => {
    const json = localStorage.getItem("memorygamescore");
    const savedScore = JSON.parse(json);
    if (savedScore) {
      setScore(savedScore);
    }
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Memory Game</h1>
        <div> Score: {Score}</div>
        <div>
          {options === null ? (
            <>
              <button onClick={() => setOptions(16)}>Play</button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  const prevOptions = options;
                  setOptions(null);
                  setScore("0");
                  setTimeout(() => {
                    setOptions(prevOptions);
                  }, 5);
                }}
              >
                Start Over
              </button>
              <button
                onClick={() => {
                  alert("Are you sure you want leave ?");
                  setOptions(null);
                }}
              >
                Main Menu
              </button>
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          Score={Score}
          setScore={setScore}
        />
      ) : (
        <h2>Let's test your memory !!</h2>
      )}
    </div>
  );
}
