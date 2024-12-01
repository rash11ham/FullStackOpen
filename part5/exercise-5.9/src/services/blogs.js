import axios from 'axios'
const baseUrl = '/api/blogs'

//exercise 5.2 adding token for login functionality
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// exercise 5.3 post the new blog
const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = async (id,updateBlog) => {
  const request = await axios.put(`${baseUrl}/${id}`, updateBlog)
  return request.then(response=> response.data)
}

export default { getAll, create, update, setToken };