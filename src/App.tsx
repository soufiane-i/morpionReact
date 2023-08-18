import { useState } from "react";

import "./App.css";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <button key={move} onClick={() => jumpTo(move)}>
        {description}
      </button>
    );
  });

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function restart() {
    window.location.reload();
  }

  function openInfo() {
    const gameInfo = document.querySelector(".game-info");
    gameInfo?.classList.toggle("open");
  }

  return (
    <>
      <h1>TIC TAC TOE</h1>
      <div className="game">
        <div className="left">
          <div className="status">{status}</div>
          <button className="restart" onClick={() => restart()}>
            Restart
          </button>
        </div>
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="game-info">
          <button onClick={openInfo} className="game-info-btn">
            <img src="/clock-rotate-left-solid.svg" alt="" />
          </button>
          <div className="moves">{moves}</div>
        </div>
      </div>
    </>
  );
}

interface BoardInt {
  xIsNext: boolean;
  squares: any;
  onPlay: any;
}

function Board({ xIsNext, squares, onPlay }: BoardInt) {
  function handleClick(i: any) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = <p className="red">X</p>;
    } else {
      nextSquares[i] = <p className="green">O</p>;
    }
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function Square({ value, onSquareClick }: SquareValue) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

interface SquareValue {
  value: null | string;
  onSquareClick: any;
}

function calculateWinner(squares: any) {
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

    if (squares[a] != null && squares[b] != null && squares[c] != null) {
      console.log(squares[a].props.children);
      console.log(squares[b].props.children);
      console.log(squares[c].props.children);
      if (
        squares[a].props.children &&
        squares[a].props.children === squares[b].props.children &&
        squares[a].props.children === squares[c].props.children
      ) {
        console.log("ok");

        return squares[a].props.children;
      }
    }
  }
  return null;
}
