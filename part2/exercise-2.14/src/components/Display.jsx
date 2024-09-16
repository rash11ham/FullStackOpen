const Display = ({ person, deleteContent }) => {
    return (
      <div>
        {person.name} 
        {/* exercise 2.8 */}
        {person.phone}
        {/* exercise 2.14 */}
        <button onClick={() => deleteContent(person.id, person.name)}>delete</button>
      </div>
    )
  }

  export default Display