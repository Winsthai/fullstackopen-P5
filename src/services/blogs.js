import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Set the token based on the logged in user
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Create a new blog
const createBlog = async blog => {
  const headers = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, createBlog, setToken }