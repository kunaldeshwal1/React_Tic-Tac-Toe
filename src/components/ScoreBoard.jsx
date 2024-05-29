import React from 'react';

const ScoreBoard = ({ scores }) => {
  return (
    <div className="score-board">
      <div className="score">
        <span style={{ color: 'blue' }}>Blue: {scores.blue}</span>
      </div>
      <div className="score">
        <span style={{ color: 'red' }}>Red: {scores.red}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
