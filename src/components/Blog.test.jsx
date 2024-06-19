/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('by default, renders only blog title and author', async () => {
  const blog = {
    title: 'Testing test',
    author: 'Steve Rogers',
    url: 'https://www.amazon.com/',
    user: [
      {
        username: 'hellas',
        name: 'Arto Hellas',
        id: '663d83da92bf241677eb83df'
      }
    ],
    likes: 42,
    id: '663d842d92bf241677eb83ea'
  }

  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.title')
  expect(title).toHaveTextContent('Testing test')

  const author = container.querySelector('.author')
  expect(author).toHaveTextContent('Steve Rogers')

  const url = screen.queryByText('https://www.amazon.com/')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes:')
  expect(likes).toBeNull()
})