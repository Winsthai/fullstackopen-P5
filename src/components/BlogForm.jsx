import { useState } from 'react'

const BlogForm = ({ updateBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlogs = (event) => {
    event.preventDefault()

    const blogData = { title, author, url }
    updateBlogs(blogData)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new blog</h2>

      <form onSubmit={createBlogs}>
                title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='Type title here'
        />
        <br />

                author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='Type author here'
        />
        <br />

                url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='Type url here'
        />
        <br />
        <button type="submit" >create</button>
      </form>
    </>
  )
}

export default BlogForm