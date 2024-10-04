import { useState } from "react"
import Display from "./components/Display"
import Filter from "./components/Filter"
import Form from "./components/Form"




const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  //exercise 2.8
  const [newPhone, setNewPhone] = useState('')

  //exercise 2.9
  const [filterName, setFilterName] = useState('')
  const [foundName, setFoundName] = useState(persons)

  const addNewPerson = (event) => {
    //this will stop the web page default load 
    event.preventDefault()

    //exercise 2.7 code
    const nameExists = persons.some(person => person.name === newName && person.phone === newPhone)
    if(nameExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      //exercise 2.9
      setNewPhone('')
      return;
    }

    const newElement = {
      id: persons.length + 1,
      name: newName,
      //exercise 2.8
      phone: newPhone
    }
  
    
    setPersons(persons.concat(newElement))
    //exercise 2.9 we need to update foundName array also since now our map method will only work with foundName
    setFoundName(foundName.concat(newElement)) 
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

  //exercise 2.9
  const handleNameFilter =(event) =>{
    console.log(event.target.value)
    setFilterName(event.target.value)

    const filteredName = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase()))

    setFoundName(filteredName)
  }
  
  return (
    <div>
      <h2>PhoneBook</h2>
  
      <Filter 
        filterName={filterName} 
        handleNameFilter={handleNameFilter}
      />

      <h2>Add new contact</h2>
      <Form 
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addNewPerson={addNewPerson}
      />
      <h2>Numbers</h2>
      {/* exercise 2.9 replaced the persons array to foundName Array */}
      {foundName.map(person => {
        return (
          <Display key={person.id} person={person} />
        )
      })}
    </div>
  )
}
export default App