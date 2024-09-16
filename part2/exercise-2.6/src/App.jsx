import { useState } from "react"

const Display = ({ person }) => {
  return (
    <div>
      {person.name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{id: 0, name: 'Arto Hellas'}])

  const [newName, setNewName] = useState('')



  const addNewPerson = (event) => {
    //this will stop the web page default load 
    event.preventDefault()
    const newElement = {
      id: persons.length + 1,
      name: newName
    }
  
    setPersons(persons.concat(newElement))
    setNewName('')
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <div>{newName}</div>
      <form onSubmit={addNewPerson}>
        <input 
          type="text"
          value={newName}
          onChange={handleInputChange}
        />
        <button type='submit'>Add</button>
      </form>
      <h2>Numbers</h2>
      
      {persons.map(person => {
        return (
          <Display key={person.id} person={person} />
        )
      })}
    </div>
  )
}
export default App
