import React, { useState, useEffect } from 'react';
import Square from './Square';
import ScoreBoard from './ScoreBoard';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ blue: 0, red: 0 });

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('ticTacToeScores'));
    if (savedScores) {
      setScores(savedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
  }, [scores]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      const newScores = { ...scores };
      if (winner === 'X') {
        newScores.blue += 1;
      } else {
        newScores.red += 1;
      }
      setScores(newScores);
      setTimeout(() => resetBoard(), 1000);
    } else if (newSquares.every(square => square !== null)) {
      setTimeout(() => resetBoard(), 1000);
    }
  };

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  return (
    <div>
      <ScoreBoard scores={scores} />
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetBoard}>Reset Game</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
