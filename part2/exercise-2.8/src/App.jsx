import { useState } from "react"

const Display = ({ person }) => {
  return (
    <div>
      {person.name} 
      {/* exercise 2.8 */}
      {person.phone}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{id: 0, name: 'Arto Hellas'}])

  const [newName, setNewName] = useState('')
  //exercise 2.8
  const [newPhone, setNewPhone] = useState('')


  const addNewPerson = (event) => {
    //this will stop the web page default load 
    event.preventDefault()

    //exercise 2.7 code
    const nameExists = persons.some(person => person.name === newName)
    if(nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')  ``
      return;
    }

    const newElement = {
      id: persons.length + 1,
      name: newName,
      //exercise 2.8
      phone: newPhone
    }
  
    setPersons(persons.concat(newElement)) 
    setNewName('')
    //exercise 2.8
    setNewPhone('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //exercise 2.8
  const handlePhoneChange =(event) =>{
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <div>{newName}</div>
      <form onSubmit={addNewPerson}>
        <div>name: <input 
          type="text"
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        {/* exercise 2.8 */}
        <div>phone: <input 
            value={newPhone}
            onChange={handlePhoneChange}
          />
        </div>
        <div><button type="submit">add</button></div>
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
