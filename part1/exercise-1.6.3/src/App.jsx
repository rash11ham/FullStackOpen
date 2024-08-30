import { useState } from "react"


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
      <button onClick={handleLeftClick}>left</button>
      {right}
      <button onClick={handleRightClick}>right</button>
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
}

export default App