import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

// Same as above

// const Display = ({ counter }) => {
//   return (
//     <div>{counter}</div>
//   )
// }

const Button = ({onClick, text}) => {
  return <button onClick={onClick}>{text}</button>
}

//same as above
//
//const Button = (props) => {
//   return <button onClick={props.onClick}>{props.text}</button>
//}

// Same as above

// const Button = ({ onSmash, text }) => (
//   <button onClick={onSmash}>
//     {text}
//   </button>
// )



const App = () => {
  const [counter, setCounter] = useState(0);
  console.log('rendering with counter value', counter)

  const increaseCounter = () => {
    console.log('increasing, value before', counter)
    setCounter(counter+1);
  }
  const decreaseCounter = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter-1);
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0);
  }
  

  return (
    <div>
      <Display counter={counter} />
      <Button 
        onClick={increaseCounter} 
        text='plus'
      />
      <Button 
        onClick={decreaseCounter} 
        text='minus'
      />
      <Button 
        onClick={setToZero} 
        text='reset'
      />
    </div>
  )


}
export default App