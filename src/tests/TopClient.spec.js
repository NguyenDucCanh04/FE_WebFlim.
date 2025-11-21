import { render, screen } from '@testing-library/vue'
import TopClient from '../layout/components/TopClient.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

afterEach(() => mock.reset())

test('displays username from API or localStorage', async () => {
  mock.onGet('http://127.0.0.1:8000/api/kiem-tra-khachhang').reply(200, { status: true, data: { ten_kh: 'Nguyen' } })
  localStorage.setItem('ten_kh', 'LocalName')
  render(TopClient)
  const name = await screen.findByText(/Nguyen|LocalName/)
  expect(name).toBeInTheDocument()
})
