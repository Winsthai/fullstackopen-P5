import { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility} >{buttonText}</button>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        likes: {blog.likes} <button>like</button> <br/>
        {blog.user[0].name}
      </div>
    </div>
  )
}

export default Blog