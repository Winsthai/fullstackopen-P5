import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const [buttonText, setButtonText] = useState('View')

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(prevText => (prevText === 'View' ? 'Hide' : 'View'))
  }

  const updateLikes = () => {
    const newBlogData = {
      user: blog.user[0].id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateBlog(blog, newBlogData)
  }

  const deleteButton = () => {
    // Prompt confirmation window
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"?`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <span className='title'>
        {blog.title}
      </span>
      &nbsp;
      <span className='author'>
        {blog.author}
      </span>
      &nbsp;
      <button onClick={toggleVisibility} className='showDetails' >{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes: {blog.likes} <button onClick={updateLikes}>like</button> <br />
        {blog.user[0].name} <br />
        <button style={{ display: user.username === blog.user[0].username ? '' : 'none' }} onClick={deleteButton}>remove</button>
      </div>
    </div>
  )
}

export default Blog