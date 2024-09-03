import { useState } from "react"



const Display = (props) => {
  return (
    <div >
    {props.text}
    {props.value}
  </div>
  ) 
}

const Button = (props) => {
  console.log(props)
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
    
}

const App = () => {
  const [good, countGood] = useState(0)
  const [bad, countBad] = useState(0)
  const [neutral, countNeutral] = useState(0)
  
  
  return (
    <div style={{ }}>
      <Display text='Give Feedback' />
      <Button handleClick={() => countGood(good+1)} text='Good' />
      <Button handleClick={() => countNeutral(neutral+1)} text='Neutral' />
      <Button handleClick={() => countBad(bad+1)} text='Bad' />
      <br />
      <br />
      <br />
      <Display text='statistics' />
      <br />
      <br />
      <Display text='good ' value={good} />
      <Display text='neutral ' value={neutral} />
      <Display text='bad ' value={bad} />
    </div>
  )
}

export default App