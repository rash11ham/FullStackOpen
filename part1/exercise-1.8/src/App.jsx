

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

const Statistics = (props) => {
  const [good, countGood] = useState(0)
  const [bad, countBad] = useState(0)
  const [neutral, countNeutral] = useState(0)
  const [total, setTotal] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const goodClicked = () => {
    setAllClicks(allClicks.concat('1'))
    const updateGood = good + 1
    countGood(updateGood)
    setTotal(bad + neutral + updateGood)
  }

  const badClicked = () => {
    setAllClicks(allClicks.concat('-1'))
    const updateBad = bad + 1
    countBad(updateBad)
    setTotal(updateBad + neutral + good)
  }

  const neutralClicked = () => {
    setAllClicks(allClicks.concat('0'))
    const updateNeutral = neutral + 1
    countNeutral(updateNeutral)
    setTotal(bad + updateNeutral + good)
  }
  
  if(props.total === 0) {
      return (
        <div>
          No feedback given
        </div>
      ) 
  } else {
    return (
      <div>
        <Display text='Give Feedback' />
        <Button handleClick={goodClicked} text='Good' />
        <Button handleClick={neutralClicked} text='Neutral' />
        <Button handleClick={badClicked} text='Bad' />
        <br />
        <br />
        <br />
        
        <Display text='statistics' />
        <br />
        <br />
        <Display text='good ' value={good} />
        <Display text='neutral ' value={neutral} />
        <Display text='bad ' value={bad} />
        <Display text='All ' value={total} />
        <Display text='Average ' value={(good+bad+neutral)/3} />
        <Display text='Positive ' value={(good*100)/(good+bad+neutral)+'%'}/>
      </div>
    )
  }
  
}


const App = () => {
  
  
  return (
    <div>
      <Statistics />
      
    </div>
  )
}

export default App