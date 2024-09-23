"use client";

import { useEffect, useState } from "react";
import Cell from "./components/cell";


const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");
  const [gameStarted, setGameStarted] = useState(false); // Game start state

  useEffect(() => {
    winningCombinations.forEach((combination) => {
      const circleWins = combination.every((cell) => cells[cell] === "circle");
      const crossWins = combination.every((cell) => cells[cell] === "cross");

      if (circleWins) {
        setWinningMessage(
          "circleText"
        );
      } else if (crossWins) {
        setWinningMessage(
          "Cross wins!"
        );
      }
    });
  }, [cells]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "" && !winningMessage)) {
      setWinningMessage("draw !");
    }
  }, [cells, winningMessage]);

  // Function to handle starting the game
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Function to handle resetting the game
  const handleResetGame = () => {
    setCells(["", "", "", "", "", "", "", "", ""]); // Reset all cells
    setGo("circle"); // Reset the turn
    setWinningMessage(""); // Clear the winning message
  };

  return (
    <>

      {/* Game start popup/modal */}
      {!gameStarted && (
        <div className="popup">
          <div className="popup-content">
            <h2>Welcome to Tic-Tac-Toe</h2>
            <button onClick={handleStartGame} className="start-btn">
              Start Game
            </button>
          </div>
        </div>
      )}

      {/* Main Game */}
      {gameStarted && (
        <main className="container">
          <h1>Tic Tac Toe</h1>
          <div className="gameboard">
            {cells.map((cell, index) => (
              <Cell
                id={index}
                go={go}
                setGo={setGo}
                key={index}
                cells={cells}
                setCells={setCells}
                cell={cell}
                winningMessage={winningMessage}
              />
            ))}
          </div>

          <div className="message">{winningMessage}</div>

          {/* Show whose turn it is if no one has won */}
          {!winningMessage && <div>{`It's now ${go}'s turn!`}</div>}

          {/* Reset Button - only show if the game has ended (win/draw) */}
          {winningMessage && (
            <button onClick={handleResetGame} className="reset-btn">
              Play Again
            </button>
          )}
        </main>
      )}
    </>
  );
}
