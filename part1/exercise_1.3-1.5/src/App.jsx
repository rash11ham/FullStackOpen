const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = () => { 
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Part parts={parts[0].name+" "+parts[0].exercises} />
      <Part parts={parts[1].name+" "+parts[1].exercises} />
      <Part parts={parts[2].name+" "+parts[2].exercises} />      
    </div>
  )
  
}

const Part = (props) => {
  return (
    <div>
      <p>{props.parts}</p>
    </div>
  )
}

const Total = (props) => { 
  return <p> Total of the exercises: {
    props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>  
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App