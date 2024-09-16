import { useState, useEffect } from "react"
// import axios from "axios"
import servicePerson from "./services/persons"
import Display from "./components/Display"
import Filter from "./components/Filter"
import Form from "./components/Form"


const Notification = ({message}) => {
  if(message === ''){
    return ''
  }
  return (
    <div className="banner">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  //exercise 2.8
  const [newPhone, setNewPhone] = useState('')

  //exercise 2.9
  const [filterName, setFilterName] = useState('')
  const [foundName, setFoundName] = useState([])
  const [addMessage, setAddMessage] = useState('')


  //exercise 2.12 geting data from server
  const hook = () => {
    servicePerson
      .getAll()
      .then(showPersons => {
        setPersons(showPersons)
        setFoundName(showPersons)
      }).catch(error => {
        console.error("Error fetching data ", error)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addNewPerson = (event) => {
    //this will stop the web page default load 
    event.preventDefault()

    const newElement = {
      name: newName,
      //exercise 2.8
      phone: newPhone
    }
    //exercise 2.7 code
    const nameAndPhoneExists = persons.some(person => person.name === newName && person.phone === newPhone)
    const nameExists = persons.find(person => person.name === newName)
    if(nameAndPhoneExists) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      //exercise 2.9
      setNewPhone('')
      return;
    } else if(nameExists){
      const confirmChange = window
        .confirm(`${newName} is already added to phonebook,
          would you like to replace the old number to the new one?`)
      if(!confirmChange) {
        setNewName('')
        setNewPhone('')
        return
      }
      servicePerson
        .update(nameExists.id, newElement)
        .then(updatePerson => {
          setPersons(persons.map(p => p.id !== nameExists.id ? p : updatePerson))
          setFoundName(foundName.map(p => p.id !== nameExists.id ? p : updatePerson))
          banner(newElement.name, 'has been updated!')
          setNewName('')
          setNewPhone('')
        }).catch(error => alert('Error updating person', error))
    } else {
      servicePerson
      .creat(newElement)
      .then(creatPerson => {
        setPersons(persons.concat(creatPerson))
        //exercise 2.9 we need to update foundName array also since now our map method will only work with foundName
        setFoundName(foundName.concat(creatPerson)) 
        banner(newElement.name, 'added to the contact list')
        setNewName('')
        //exercise 2.8
        setNewPhone('')
      }).catch(error => alert('Error adding person', error))
    }  
    
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
  const handleNameFilter = (event) =>{
    console.log(event.target.value)
    setFilterName(event.target.value)
    const filteredName = persons.filter(person => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase()))

    setFoundName(filteredName)
  }

  // exercise 2.14 handleDelete added
  const deletePerson = (id,name) => {
    const confirmDelete = window.confirm(`Are you sure to delete ${name} ?`)
    if(!confirmDelete) return
    servicePerson
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setFoundName(foundName.filter(person => person.id !== id))
        banner(name, 'has been deleted from the list!')
      }).catch(error => alert('Error deleting person', error))
  }

  const banner = (name,message) => {
    setAddMessage(`${name} ${message}`)
    setTimeout(() => {
      setAddMessage('')
    }, 5000)
  }
  
  return (
    <div>
      <h1>PhoneBook</h1>
      
      <Notification message={addMessage} />
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
      <h2>Contacts</h2>
      {/* exercise 2.9 replaced the persons array to foundName Array */}
      {foundName.map(person => {
        return (
          <Display 
            key={person.id} 
            person={person}
            deleteContent={deletePerson}
          />
        )
      })}
    </div>
  )
}
export default App
