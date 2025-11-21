import { render, screen } from '@testing-library/vue'
import MenuClient from '../layout/components/MenuClient.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

afterEach(() => mock.reset())

test('loads and displays categories', async () => {
  mock.onGet('http://127.0.0.1:8000/api/the-loai/data-open').reply(200, { data: [ { id: 10, ten_the_loai: 'Hành Động', trang_thai: '1' }, { id: 11, ten_the_loai: 'Hài', trang_thai: '0' } ] })
  mock.onGet('http://127.0.0.1:8000/api/danh-muc/data-open').reply(200, { data: [] })

  render(MenuClient)

  // await for rendering
  const item = await screen.findByText('Hành Động')
  expect(item).toBeInTheDocument()
  // ensure inactive not shown
  const hidden = screen.queryByText('Hài')
  expect(hidden).toBeNull()
})
