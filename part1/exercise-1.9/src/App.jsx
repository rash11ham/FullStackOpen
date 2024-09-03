

import { useState } from "react"



const StatisticLine = (props) => {
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

const Statistics = (props) => {
  

  
  if(props.total === 0) {
      return (
        <div>
          No feedback given
        </div>
      ) 
  } 
  return (
    <div>          
      <StatisticLine text='good ' value={props.good} />
      <StatisticLine text='neutral ' value={props.neutral} />
      <StatisticLine text='bad ' value={props.bad} />
      <StatisticLine text='All ' value={props.total} />
      <StatisticLine text='Average ' value={(props.good+props.bad+props.neutral)/3} />
      <StatisticLine text='Positive ' value={(props.good*100)/(props.good+props.bad+props.neutral)+'%'}/>
    </div>
  )
  
}


const App = () => {
  const [good, countGood] = useState(0)
  const [bad, countBad] = useState(0)
  const [neutral, countNeutral] = useState(0)
  const [total, setTotal] = useState(0)
 

  const goodClicked = () => {
    const updateGood = good + 1
    countGood(updateGood)
    setTotal(bad + neutral + updateGood)
  }

  const badClicked = () => {
    const updateBad = bad + 1
    countBad(updateBad)
    setTotal(updateBad + neutral + good)
  }

  const neutralClicked = () => {
    const updateNeutral = neutral + 1
    countNeutral(updateNeutral)
    setTotal(bad + updateNeutral + good)
  }
  return (
    <div>
      <Display text='Give Feedback' />
      <Button handleClick={goodClicked} text='Good' />
      <Button handleClick={neutralClicked} text='Neutral' />
      <Button handleClick={badClicked} text='Bad' />
      <br />
      <br />
      <br />
      <StatisticLine text='statistics' />
          <br />
          <br />
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />
      
    </div>
  )
}

export default App