import React, { useEffect, useState } from 'react'
import Die from './die'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
    }
  })

  function allNewDice(){
    const newDice = []
    for(let i = 0; i < 10; i++){
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => 
    <Die 
      key = {die.id}
      value = {die.value}
      isHeld = {die.isHeld}
      holdDice = {() => holdDice(die.id)}
    />
  )

  function rollDice(){
    if (!tenzies){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : {...die, id: nanoid(), value:Math.floor(Math.random() * 6) + 1}
      }))
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='game-box'>
        <div className='play-space'>
          <div className='game-details'>
            <h1 className='name'>Tenzies</h1>
            <p className='instructions'>
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
            </p>
          </div>
          <div className='game-dice'>
            {diceElements}
          </div>
          <div className='game-button'>
            <button className='btn-roll' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
