import { useState } from "react"



const Button = (props) => {
  console.log(props)
  const {handleClick, text} = props
  return (
    <button onClick={handleClick}>{text}</button>
  )
    
}

const App = () => {
  const [value, setValue] = useState(0)
  
  return (
    <div>
      {value}
      <Button handleClick={() => setValue(1000)} text='thousand' />
      <Button handleClick={() => setValue(0)} text='reset' />
      <Button handleClick={() => setValue(value+1)} text='increment' />
    </div>
  )
}

export default App