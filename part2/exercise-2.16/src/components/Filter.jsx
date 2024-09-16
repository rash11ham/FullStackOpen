const Filter = ({filterName, handleNameFilter}) => {
    /* exercise 2.10 */
    return (
        <div>Search by name: <input 
            value={filterName}
            onChange={handleNameFilter}
            />

        </div>
    )
}

export default Filter