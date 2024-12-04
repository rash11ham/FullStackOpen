import { useState } from 'react'
const Blog = ({ blog, toggleLike, deleteBlog }) => {
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
      <div className='blog'>
        Title: {blog.title}
        Author: {blog.author}
        <button onClick={() => setShow(!show)}>{show ? 'hide':'view'}</button>
      </div>
      {show && (
        <div>
          <div>url: {blog.url}</div>
          <div>likes: {blog.likes}
            <button onClick={toggleLike}>like</button>
          </div>
          <div>Added By: {blog.user.name}</div> 
          <button onClick={deleteBlog}>remove</button>
        </div>
      )}
      
      
    </div>  
)}

export default Blog