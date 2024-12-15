import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

// test('renders title and author', async () => {
//   const blog = {
//       title: 'testing the title',
//       author: 'Author',
//       url: 'url'
//     }
//     const { container } = render(<Blog blog={blog} />)

//     const div = container.querySelector('.blog')
//     expect(div).toHaveTextContent(
//         'testing the title', 'Author'
//   )6hvxedv
 
// })


describe('expanded', () => {

  const clickButton = vi.fn()
  let container
  container = render(
    <div className='blog'>
      view hide
      <button onClick={clickButton}>view</button>
    </div>
  )
  test('renders its children', async () => {
      await screen.findAllByText('view hide')
    })
  test('expand to see url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent('hide')
  })
})
