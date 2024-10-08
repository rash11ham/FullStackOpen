const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = () => { 
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      <Part part={part1} extercise={exercises1}/>
      <Part part={part2} extercise={exercises2}/>
      <Part part={part3} extercise={exercises3}/>      
    </div>
  )
  
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => { 
  return <p> Total of the exercises: {props.exercises1+props.exercises2+props.exercises3}</p>  
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App