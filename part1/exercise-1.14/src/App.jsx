 import { useState } from 'react'

 const Header = (props) => {
  return <h1>{props.contents}</h1>
 }

 const contents = {
  text1: 'Anecdote of the day',
  text2: 'Anecdote with most votes'
 }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    // this will generate a random number between zero and one
    // we multiplie it to length of our anecdote to get random number from zero to length of anecdote
    // Math.random will give as decimal number
    // Math.floor will to make it whole number
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const Vote = ({ vote }) => <p>has {vote} votes</p>

  const MostVotedAnec = ({ anecdote }) => <p>{anecdote}</p>

  const votingSystem = () => {
    //copies all the votes array to the copyVotes
    let copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  const {mostVoted, index} = votes.reduce(
    (mostVoted, curr, index) => {
      if(curr > mostVoted.mostVoted){
        return {mostVoted: curr, index}
      }
      return mostVoted
    },
    { mostVoted: Number.NEGATIVE_INFINITY, index: -1 }
  )

  return (
    <div>
      <Header contents={contents.text1} />
      <p>{anecdotes[selected]}</p>
      <Vote vote={votes[selected]}/>
      <button onClick={nextAnecdote}>next anecdote</button>
      <button onClick={votingSystem}>vote</button>

      <Header contents={contents.text2} />
      <MostVotedAnec anecdote={anecdotes[index]} />
      <Vote vote={mostVoted}/>
    </div>
  )
}
export default App
