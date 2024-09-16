const Form = ({
    addNewPerson, 
    newName, 
    handleNameChange, 
    newPhone,
    handlePhoneChange}) => {
    return (
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
    )
}

export default Form