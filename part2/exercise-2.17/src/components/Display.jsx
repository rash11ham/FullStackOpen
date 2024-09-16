const Display = ({ person, deleteContent }) => {
    return (
      <div className="person">
        {person.name} 
        {/* exercise 2.8 */}
        {person.phone}
        {/* exercise 2.14 */}
        <button className='btn' onClick={() => deleteContent(person.id, person.name)}>delete</button>
      </div>
    )
  }

  export default Display