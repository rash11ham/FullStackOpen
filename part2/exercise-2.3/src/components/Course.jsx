

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

const Total = ({ parts }) => <h4>Total of {parts.reduce((sum,part) => sum + part.exercises,0)} exercises</h4>
    


const Course = ({ course }) => {
    console.log(course)
    return (
        <div>
            <Header course={course.name} />
            <Contents parts={course.parts} />
            <Total parts={course.parts} />
        </div>
        
    )
        
    
}

export default Course