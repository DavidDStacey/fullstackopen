import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleGood = () => {
    setAll(all + 1)
    setGood(good + 1)
  }

  const handleBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text='Good' />
      <Button onClick={handleNeutral} text='Neutral' />
      <Button onClick={handleBad} text='Bad' />
      <h1>Statistics</h1>
      <Stats good={good} neutral={neutral} bad={bad} all={all}/>
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Stats = ({ good, neutral, bad, all }) => {
  if (all === 0)
  return (
    <>
    No Feedback Given
    </>
  )
  return (
    <table>
      <tbody>
        <tr><StatLine text='Good' value={good} /></tr>
        <tr><StatLine text='Neutral' value={neutral} /></tr>
        <tr><StatLine text='Bad' value={bad} /></tr>
        <tr><StatLine text='All' value={all} /></tr>
        <tr><StatLine text='Average' value={<Average good={good} bad={bad} all={all}/>} /></tr>
        <tr><StatLine text='Positive' value={<Positive good={good} all={all} />} /></tr>
      </tbody>
    </table>
  )
}

const StatLine = ({ text, value}) => {
  return (
    <>
    <td>{text}</td> 
    <td>{value}</td>
    </>
  )
}

const Average = ({ good, bad, all }) => {
  let avg = (good - bad)/all
  return (
    <>
      {avg}
    </>
  )
}

const Positive = ({ good, all }) => {
  let pos = good/all*100
  return (
    <>
      {pos}%
    </>
  )
}

export default App
