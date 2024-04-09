import { useEffect, useState } from 'react';
import './App.css';
import Die from "./components/Die/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)


  // METHOD 1 (MINE)

  // useEffect(() => {
  //   let count = 0;
  //   const firstValue = dice[0].value;
  //   for (let index = 0; index < 10; index++) {
  //     if (dice[index].isHeld === true && dice[index].value === firstValue) {
  //       count = count + 1;
  //     }
  //   }
  //   if (count === 10) {
  //     setTenzies(true)
  //   }
  // }, [dice])


  // METHOD 2 using .every()
  useEffect(() => {
    const allClicked = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const sameValues = dice.every(die => die.value === firstValue)
    if (allClicked && sameValues) {
      setTenzies(true)
    }
  }, [dice])

  function newRoll() {
    return {
      value: Math.floor((Math.random() * 6) + 1),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    let numArray = []
    for (let index = 0; index < 10; index++) {
      numArray.push(newRoll());
    }

    return numArray
  }

  function handleroll() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : newRoll()
      }))
    }
    else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  function holdDie(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } : die
    }))
  }

  const dices = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDie={() => holdDie(die.id)} />
  ))

  return (
    <div className='main'>
      <div className="container">
        {tenzies && <Confetti />}
        <div className="sub-container">
          <div className="headings">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className="grids">
            {dices}
          </div>
          <div className="results">
            <button onClick={handleroll}>{tenzies ? "New Game👊" : "Roll🎲"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
