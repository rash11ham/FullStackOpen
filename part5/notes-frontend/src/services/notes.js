import axios from 'axios'
const baseUrl = '/api/notes'

// part 5 step 10
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// part 5 step 11
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
// part5 step 12 export setToken
export default { getAll, create, update, setToken }