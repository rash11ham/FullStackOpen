import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//step 5 import login services
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // step 1 to add login feature
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // step 6 add user state
  const [user, setUser] = useState(null)

  //exercise 5.3 
  //const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //exercise 5.2 saving the login credentials stored in window.localStorage to the state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //make sure setToken is added in services/blogs
      blogService.setToken(user.token)
    }
  }, [])

  // step 2 to add login feature
  const handleLogin = async event => {
    event.preventDefault()
    console.log('user credentials: ', username, password)
    //step 7
    try {
      const user = await loginService.login({
        username, password
      })
      //exercise 5.2 step one
      //storing the login credentials to the local web storage
      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("someting went wrong ", exception)
    }
  }
  //step 3 & 8 move the form to a function
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
  )

  //exercise 5.2 
  const handleLogout = () => {
    if (user) {
      setUser(null)
    }
    window.localStorage.removeItem('loggedBlogsAppUser')
  }

  //exercise 5.3
  const handleBlogTitle = event => {
    setTitle(event.target.value)
  }

  const handleBlogAuthor = event => {
    setAuthor(event.target.value)
  }

  const handleBlogUrl = event => {
    setUrl(event.target.value)
  }
  
  const createBlog = event => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlogObject)
      .then(addNewBlog => {
        setBlogs(blogs.concat(addNewBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      }).catch(error => {
        console.log(error)
      })
  }
  //end of this step

  const blogsDisplay = () => {
    return <div>
      <h1>blogs</h1>
      <p>user logged in: <strong>{user.username}</strong> <button onClick={handleLogout}>logout</button></p>
      <br />
      {/* exercise 5.3 adding input from */}
      <form onSubmit={createBlog}>
        <div className='inputForm'>
          <label>Title: </label>
          <input
            value={title}
            onChange={handleBlogTitle}
          />
        </div>
        <div className='inputForm'>
          <label>Author: </label>
          <input
            value={author}
            onChange={handleBlogAuthor}
          />
        </div>
        <div className='inputForm'>
          <label>Url: </label>
          <input
            value={url}
            onChange={handleBlogUrl}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  }

  return (
    <div>
      {/* step 9  */}
      {user === null ?
        loginForm() :
        blogsDisplay()
      }
    </div>
  )
}

export default App