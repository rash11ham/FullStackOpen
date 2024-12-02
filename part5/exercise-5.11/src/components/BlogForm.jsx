//exercise 5.5 step 1
import { useState } from 'react'
const BlogForm = ({ newBlogObject }) => {
    //exercise 5.5 step 4 move the state from app.jsx to here
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    //exercise 5.5 step 5 create a blog object and pass it as props
    const createBlog = (event) => {
        event.preventDefault()
        newBlogObject({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={createBlog}>
                <div>
                    Title: 
                    <input
                        value={title}
                        onChange={event => setTitle(event.target.value)}   
                    />
                </div>
                <div>
                    Author:
                    <input
                        value={author}
                        onChange={event => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    Url:
                    <input
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default BlogForm