import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([
    {
      move: "Go to game start",
      squares: Array(9).fill(null),
      xIsNext: true,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  //Declaring a Winner
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setWinner(winner);
    } else {
      setWinner(null);
    }
  }, [squares, history]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    const current = history[currentMove];

    if (current.squares[i] || winner) {
      return;
    }

    const newSquares = [...current.squares];

    newSquares[i] = current.xIsNext ? "X" : "O";

    const historyUntilCurrent = history.slice(0, currentMove + 1);

    const newMove = {
      move: `Go to move #${historyUntilCurrent.length}`,
      squares: newSquares,
      xIsNext: !current.xIsNext,
    };

    setHistory([...historyUntilCurrent, newMove]);

    setCurrentMove(historyUntilCurrent.length);

    setSquares(newSquares);

    setXIsNext(!current.xIsNext);
  };

  //   const handleClick = (i) => {
  //   const current = history[currentMove];

  //   if (current.squares[i]) {
  //     return;
  //   }

  //   const newSquares = [...current.squares];

  //   newSquares[i] =
  //     current.xIsNext ? "X" : "O";

  //   const historyUntilCurrent =
  //     history.slice(0, currentMove + 1);

  //   const newMove = {
  //     squares: newSquares,
  //     xIsNext: !current.xIsNext,
  //   };

  //   setHistory([
  //     ...historyUntilCurrent,
  //     newMove,
  //   ]);

  //   setCurrentMove(
  //     historyUntilCurrent.length
  //   );
  // };

  //Restart game
  const handleRestart = () => {
    setSquares(Array(9).fill(null));

    setXIsNext(true);

    setWinner(null);

    setCurrentMove(0);

    setHistory([
      {
        move: "Go to game start",
        squares: Array(9).fill(null),
        xIsNext: true,
      },
    ]);
  };
  const jumpTo = (moveIndex) => {
    const move = history[moveIndex];

    setCurrentMove(moveIndex);
    setSquares(move.squares);
    setXIsNext(move.xIsNext);
  };

  return (
    <>
      <div className="main">
        <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
        <div className="game">
          <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
          <Board squares={squares} handleClick={handleClick} />
          <span className="history">
            <h4>Game History</h4>
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  <button onClick={() => jumpTo(index)}>{item.move}</button>
                </li>
              ))}
            </ul>
          </span>
        </div>
        <button onClick={handleRestart} className="restart-btn">
          Restart
        </button>
      </div>
    </>
  );
}

export default Game;
