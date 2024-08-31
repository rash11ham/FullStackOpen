import { useState } from "react"

const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
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
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'))
    //this is added to update total to amount of clicks
    //example if left and right click 6 times it will show total 6
    const updateLeft = left+1
    setLeft(updateLeft)
    setTotal(updateLeft+right)
  }

  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'))
    //this is added to update total to amount of clicks
    //example if left and right click 6 times it will show total 6
    const updateRight = right+1
    setRight(updateRight)
    setTotal(left+updateRight)
  }
    



  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      {right}
      <Button handleClick={handleRightClick} text='right' />
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </div>
  )
}

export default App