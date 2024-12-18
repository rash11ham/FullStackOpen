import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
// part 5 step 5
import loginService from './services/login'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([]) 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  //part 5 step 1
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  //part 5 step 6
  const [user, setUser] = useState(null)



  //first approch

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setNotes(response.data)
  //     })
  // }, [])

  //second approch
  const hook = () => {
    noteService
      .getAll()
      .then(intialNotes => {
        setNotes(intialNotes)
      })
  }
  useEffect(hook, [])

  // part5 step 14 saving the token from browsers local storag to a state
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  //part 5-b step 7 modifications to addNote method to make it compatible to NoteForm component
  const addNote = (noteObject) => {
    //part 5-b step 11 now we hide the note form after creating a new note
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(addNewObject => {
        setNotes(notes.concat(addNewObject))
        setErrorMessage(
          "New note added successfully"
        )
        setTimeout(() => {
          setErrorMessage("")
        }, 5000)
      }).catch(error => {
        setErrorMessage(
          `Note: '${noteObject.content}' cannot be less than five characters`
        )
        setTimeout(() => {
          setErrorMessage("")
        }, 5000)
      })    
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n=>n.id===id)
    const changeNote = { ...note, important: !note.important}
    noteService
      .update(id, changeNote)
      .then(updatedNote => {
        setNotes(notes.map(n => n.id !== id ? n : updatedNote))
      })
      .catch(error => {
        setErrorMessage(
          "Note status is changed"
        )
        setTimeout(() => {
          setErrorMessage("")
        }, 5000)
        //setNotes(notes.filter(n => n.id !== id))
      })
  }


  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)


  const Notification = ({ message }) => {
    if (message === "") {
      return ""
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  //part 5 step 15 logout
  const handleLogout = () => {
    if (user) {
      setUser(null)
    }
    window.localStorage.removeItem('loggedNoteappUser')
    setErrorMessage('Logged out successfully')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
  }

  // part 5 step 2
  const handleLogin = async (event) => {
    event.preventDefault()
    // part 5 step 7
    try {
      const user = await loginService.login({
        username, password
      })
      // Part 5 step 13 storing token to the browsers local storage
      // If not if the page freshes the user logged in will be logged out
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      //Part 5 step 12
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
    console.log(`logged in with: `, username, password)
  }

//  part5 step3 
//  step 8 modification to the form
//  Login form will only be displayed when user is not logged in

  const loginForm = () => (
    //part 5-b step 3 modify loginForm method as a togglable 
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  //part 5-b step 8 add useRef hook (ref) and import it
  const noteFormRef = useRef()
  const noteForm = () => (
    //part 5-b step 4 modifiy notefomr method as togglable 
    //part 5-b step 8 add ref
    <Togglable buttonLabel="new note" ref={noteFormRef}> 
      {/* part 5-b step 7 modifications to addNote method to make it compatible to NoteForm component */}
      <NoteForm
        createNote={addNote}
      />
    </Togglable>
  )
    
  return (
    <div>
      <h1 data-testid='notes'>Notes</h1>
      <Notification message={errorMessage} />

      {/* part 5 step 9 */}
      {/* {user === null && loginForm}
          {user !== null && noteForm}  */}
      
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }
      {user === null ? "" :
        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      }
      
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
         {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportant={() => toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App

