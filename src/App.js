import './App.css';
import React from 'react';
import Confetti from 'react-confetti'


function App() {
  const [turn, setTurn] = React.useState("X")
  const [cells, setCells] = React.useState(Array(9).fill(""))
  const [winner, setWinner] = React.useState(); 

  const combos = {
    across: [[0,1,2],[3,4,5],[6,7,8]],
    down: [[0,3,6],[1,4,7],[2,5,8]],
    diagonal: [[0,4,8],[2,4,6]]
  }


  const handleClick = (num) => {
    if (winner) return ;
    if (cells[num] !== "") return; 
    let arr = [...cells];
    if (turn == "X"){
      arr[num] = "X";
      setTurn("O"); 
    }else{
      arr[num] = "O";
      setTurn("X");
    }
    checkWinner(arr); 
    checkDraw(arr)
    setCells(arr);
  }

  const checkWinner = (arr) => {
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (arr[pattern[0]] === "" || arr[pattern[1]] === "" || arr[pattern[2]] === "") {
        } else if (arr[pattern[0]] === arr[pattern[1]] && arr[pattern[1]] === arr[pattern[2]]) {
          console.log(
            "Winner!"
          )
          setWinner(arr[pattern[0]]);
          localStorage.setItem(arr[pattern[0]], localStorage.getItem(arr[pattern[0]])===null ? 1 : parseInt(localStorage.getItem(arr[pattern[0]]))+1)
          setTurn("X")
        }
      });
    }
  };
  const checkDraw = (arr) => {
    if (arr.filter(value => value === "").length === 0 && !winner) {
      localStorage.setItem("draw", localStorage.getItem("draw") === null ? 1 : localStorage.getItem("draw")+1)
    }
  }
  


  const Cell = ({num}) => {
    const cellValue = cells[num]
    //if cell is empty we give it class cell, otherwise class X or O
    const cellClassName = cellValue ? `cell cell-${cellValue}` : "cell"

    return (
      <div className={cellClassName} onClick={()=>handleClick(num)}>{cellValue}</div>
    )
}

  const handleReset = () => {
    setWinner()
    setCells(Array(9).fill(""))
  }

  return (
    <main>
      {winner && <Confetti
      width={window.screen.width}
      height={window.screen.height}
    />}
    <div className='container'>
      Wins 
      <br></br>
      X: {localStorage.getItem("X")} O: {localStorage.getItem("O")} Draw: {localStorage.getItem("draw")}
      <div className='board'>
        <div className='row'>
          <Cell num={0}></Cell>
          <Cell num={1}></Cell>
          <Cell num={2}></Cell>
        </div>
        <div className='row'>
          <Cell num={3}></Cell>
          <Cell num={4}></Cell>
          <Cell num={5}></Cell>
        </div>
        <div className='row'>
          <Cell num={6}></Cell>
          <Cell num={7}></Cell>
          <Cell num={8}></Cell>
        </div>
      </div>
      <button className='reset-button' onClick={handleReset}>Reset</button>
    </div>
    </main>
  );
  
}

export default App;
