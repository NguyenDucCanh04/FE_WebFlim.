import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import ChatBox from '../components/Chat/ChatBox.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

test('renders chatbox and sends message to API', async () => {
  render(ChatBox)

  const input = screen.getByPlaceholderText(/Hỏi tôi về phim/i)
  await fireEvent.update(input, 'Cho tôi biết phim Avatar')

  mock.onPost('/api/chat/respond').reply(200, {
    answer: 'Avatar là một phim...',
    retrieved: [ { id: 1, title: 'Avatar', url: '/chi-tiet-phim/1' } ]
  })

  const button = screen.getByText('Gửi')
  await fireEvent.click(button)

  await waitFor(() => expect(screen.getByText(/Avatar là một phim/)).toBeInTheDocument())
  expect(screen.getByText('Avatar')).toBeInTheDocument()
})
