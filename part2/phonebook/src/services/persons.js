import axios from 'axios'
const baseUrl = 'https://dsphonebook.herokuapp.com/api/persons'


const getAll = () => {
  console.log('Requesting: ' + baseUrl)
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
  
const create = newObject => {
  console.log('Requesting: ' + baseUrl, newObject)
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}
  
const deletePerson = id => {
  console.log('Delete: ' + `${baseUrl}/${id}`)
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


const update = (id, updatedObject) => {
  console.log('Requesting: ' + `${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}
  
  export default { getAll, create, deletePerson, update }