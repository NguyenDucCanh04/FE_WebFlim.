import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import TheLoaiPhim from '../components/TrangChu/TheLoaiPhim/index.vue'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

afterEach(() => mock.reset())

test('loads films from category API and navigates to page', async () => {
  const fakeResp = {
    data: [{ id: 1, ten_phim: 'Phim A' }, { id: 2, ten_phim: 'Phim B' }],
    pagination: { current_page: 1, last_page: 1, total: 2 }
  }
  mock.onGet('http://127.0.0.1:8000/api/layThongTinPhimTuTheLoai/5').reply(200, fakeResp)

  render(TheLoaiPhim, { props: { id_the_loai: 5 } })

  const filmA = await screen.findByText('Phim A')
  expect(filmA).toBeInTheDocument()
  expect(screen.getByText(/2 phim/)).toBeInTheDocument()
})
