/* eslint-disable linebreak-style */
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

test('by default, renders only blog title and author', () => {
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

test('blog\'s URL and number of likes are shown when the button to show details is clicked', async () => {
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = container.querySelector('.showDetails')
  await user.click(button)

  const url = screen.getByText('https://www.amazon.com/', { exact: false })
  expect(url).toHaveTextContent('https://www.amazon.com/')

  const likes = screen.getByText('likes:', { exact: false })
  expect(likes).toHaveTextContent('likes: 42')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler}/>)

  const user = userEvent.setup()
  const button = container.querySelector('.showDetails')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})