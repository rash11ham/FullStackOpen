import { useState } from 'react'
const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const hideStyle = {
    paddingTop: 10,
    padding: 2,
    border: 'solid',
    borderWidth: 1,
    margin: 5
  }

  return (
    <div style={hideStyle}>
      <div>
        Title: {blog.title}
        <button onClick={() => setShow(!show)}>{show ? 'hide':'view'}</button>
      </div>
      {show && (
        <div>
          <div>url: {blog.url}</div>
          <div>likes: {blog.likes} <button>like</button></div>
          <div>Author: {blog.author}</div>        
        </div>
      )}
      
      
    </div>  
)}

export default Blog