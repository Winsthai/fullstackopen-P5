import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const [buttonText, setButtonText] = useState('View');

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(prevText => (prevText === 'View' ? 'Hide' : 'View'));
  }

  const updateLikes = async () => {
    const newBlogData = {
      user: blog.user[0].id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    updateBlog(blog, newBlogData)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility} >{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes: {blog.likes} <button onClick={updateLikes}>like</button> <br />
        {blog.user[0].name}
      </div>
    </div>
  )
}

export default Blog