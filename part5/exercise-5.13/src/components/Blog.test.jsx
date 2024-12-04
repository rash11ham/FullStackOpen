import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
      title: 'testing the title',
      author: 'Author'
  }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(
        'testing the title', 'Author'
    )
//     render(<Blog blog={blog} />)
//   const element = screen.getByText('testing the title')
//   screen.debug(element)

//   expect(element).toBeDefined()
})