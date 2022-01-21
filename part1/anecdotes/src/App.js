import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    const vote = [...votes]
    vote[selected] += 1
    setVotes(vote)
  }

  const mostVotes = () => {
    let max = 0
    let indexMax = 0
    votes.forEach((item, index) => {
      if (item > max) {
        max = item
        indexMax = index
      }
    })
    return indexMax
  }

  console.log('Current anecdote index: ', selected)
  console.log('Current anecdote vote: ', votes[selected])
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br></br>
      Votes: {votes[selected]}
      <br></br>
      <Button onClick={handleNext} text='Next Anecdote'/>
      <Button onClick={handleVote} text='Vote'/>
      <h1>Anecdote with most votes</h1>
      {votes[mostVotes()] === 0 ?
        <>Vote above!</>
        :
        <>{anecdotes[mostVotes()]} has {votes[mostVotes()]} votes</>
      }
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

export default App
