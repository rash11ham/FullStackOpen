

const Header = ({ course }) => {
    return <h1>{course}</h1>
}

const Contents = ({ parts }) => { 
    console.log(parts)
    
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </div>
    )
  }

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
) 
    


const Course = ({ course }) => {
    console.log(course)
    return (
        <div>
            <Header course={course.name} />
            <Contents parts={course.parts}/>
        </div>
        
    )
        
    
}

export default Course