import axios from 'axios'
const baseUrl = '/api/blogs'

//exercise 5.2 adding token for login functionality
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }