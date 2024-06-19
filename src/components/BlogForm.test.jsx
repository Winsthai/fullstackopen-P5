import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm updateBlogs={ createBlog } />)

  const title = screen.getByPlaceholderText('Type title here')
  const author = screen.getByPlaceholderText('Type author here')
  const url = screen.getByPlaceholderText('Type url here')

  const submitButton = screen.getByText('create')

  /* Expected user entered info:
  title: Is It Time To Move Beyond Solidity?
  author: Joel Monegro
  url: https://www.placeholder.vc/blog

  Afterward, the form is submitted by clicking the create button
  */
  await user.type(title, 'Is It Time To Move Beyond Solidity?')
  await user.type(author, 'Joel Monegro')
  await user.type(url, 'https://www.placeholder.vc/blog')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Is It Time To Move Beyond Solidity?')
  expect(createBlog.mock.calls[0][0].author).toBe('Joel Monegro')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.placeholder.vc/blog')
})