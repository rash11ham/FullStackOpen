import { useState } from 'react'
const Blog = ({ blog, toggleLike }) => {
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
        <div>Author: {blog.author}</div> 
        <button onClick={() => setShow(!show)}>{show ? 'hide':'view'}</button>
      </div>
      {show && (
        <div>
          <div>url: {blog.url}</div>
          <div>likes: {blog.likes}
            <button onClick={toggleLike}>like</button>
          </div>
          <div>Added By: {blog.user.name}</div> 
          <button>remove</button>
        </div>
      )}
      
      
    </div>  
)}

export default Blog