import axios from 'axios'


const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const creat = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}
// exercise 2.14
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

export default {getAll, creat, remove, update}