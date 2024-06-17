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

// Get all blogs
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Update an existing blog
const updateBlog = async (id, newBlog) => { 
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

// Delete a blog
const deleteBlog = async (id) => {
  const headers = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, headers)
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }