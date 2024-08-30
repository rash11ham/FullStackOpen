import { useState } from "react"


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      {left}
      <button onClick={() => setLeft(left+1)}>left</button>
      {right}
      <button onClick={() => setRight(right+1)}>right</button>
    </div>
  )
}