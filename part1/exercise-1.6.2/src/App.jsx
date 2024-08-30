import { useState } from "react"


const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClick = {
      left: clicks.left+1,
      right: clicks.right
    }
    setClicks(newClick)
  }

  //Both our handlers were the same we do modification on the right handler
  // we learn about {...clicks} it will create a new object that has copies-
  // - of all the properties 
  // with that we only need to add operations to property needs change
  // example bellow --

  const handleRightClick = () => 
    setClicks({...clicks, right: clicks.right+1})
    //{
    // const newClick = {
    //   ...clicks,
    //   right: clicks.right+1,
    //   //previous code was this we add ...clicks
    //   //left: clicks.left
    // }
    // setClicks(newClick)
  //}

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      {clicks.right}
      <button onClick={handleRightClick}>right</button>
    </div>
  )
}

export default App