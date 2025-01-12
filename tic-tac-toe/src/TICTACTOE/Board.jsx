import React from "react";
import Square from "./Square";
import { useState } from "react";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXturn, setIsXturn] = useState(true);

  const checkwinner = () => {
    const winnerlogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerlogic) {
      const [a, b, c] = logic;
      if (state[a] != null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const checkTie = () => {
    return state.every((square) => square !== null) && !checkwinner();
  };

  const handlereset = () => {
    setState(Array(9).fill(null));
    setIsXturn(true);
  };

  const isWinner = checkwinner();
  const isTie = checkTie();

  const handelClick = (index) => {
    if (state[index] != null || isWinner || isTie) {
      return;
    }
    const copystate = [...state];
    copystate[index] = isXturn ? "X" : "O";
    setState(copystate);
    setIsXturn(!isXturn);
  };

  return (
    <div className="boardcontainer">
      {isWinner ? (
        <>
          {isWinner} won the game <br />
          <button onClick={handlereset}>Play again</button>
        </>
      ) : isTie ? (
        <>
          It's a tie! <br />
          <button onClick={handlereset}>Play again</button>
        </>
      ) : (
        <>
          <h4>Player {isXturn ? "X" : "O"} Turn</h4>
          <div className="board-row">
            <Square onClick={() => handelClick(0)} value={state[0]} />
            <Square onClick={() => handelClick(1)} value={state[1]} />
            <Square onClick={() => handelClick(2)} value={state[2]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handelClick(3)} value={state[3]} />
            <Square onClick={() => handelClick(4)} value={state[4]} />
            <Square onClick={() => handelClick(5)} value={state[5]} />
          </div>
          <div className="board-row">
            <Square onClick={() => handelClick(6)} value={state[6]} />
            <Square onClick={() => handelClick(7)} value={state[7]} />
            <Square onClick={() => handelClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
};

export default Board;
