//part 5-b step 5
import { useState } from "react"

//part 5-b step 4 noteform as separate component
const NoteForm = ({ createNote }) => {
  //part 5-b step 6 {lifting state up: moving state to closest parrent}
    const [newNote, setNewNote] = useState('')
    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            import: true
        })
        setNewNote('')
    }
    
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={event => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm