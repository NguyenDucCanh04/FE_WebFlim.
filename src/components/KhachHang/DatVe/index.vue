<template>
  <div class="booking-page container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="mb-3">Đặt vé</h3>

            <div v-if="loading" class="text-center py-4">Đang tải...</div>

            <div v-else>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Phim</label>
                  <input class="form-control" :value="phim.ten_phim || '—'" disabled />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Suất chiếu</label>
                  <select v-model="booking.id_suat_chieu" class="form-select" @change="onShowtimeChange">
                    <option value="">-- Chọn suất chiếu --</option>
                    <option v-for="s in showtimes" :key="s.id" :value="s.id">
                      {{ s.ngay_gio }} — Giá: {{ s.gia || s.price || '0' }} VND
                    </option>
                  </select>
                </div>

                <div class="col-12">
                  <label class="form-label">Sơ đồ ghế</label>

                  <div class="seat-legend mb-2">
                    <span class="seat available"></span> Trống
                    <span class="seat selected ms-3"></span> Đang chọn
                    <span class="seat reserved ms-3"></span> Đã bán
                  </div>

                  <div class="seat-map p-3 bg-light rounded">
                    <div class="screen text-center mb-3">MÀN HÌNH</div>

                    <div v-if="seatRows.length === 0" class="text-muted text-center py-3">Chưa có sơ đồ ghế cho suất này</div>

                    <div v-else class="d-flex flex-column gap-2">
                      <div v-for="(row, rIdx) in seatRows" :key="rIdx" class="d-flex justify-content-center gap-2">
                        <button
                          v-for="seat in row"
                          :key="seat.id"
                          :class="['seat', seatClass(seat)]"
                          :disabled="seat.reserved"
                          @click="toggleSeat(seat)"
                          type="button"
                          title="{{ seatLabel(seat) }}"
                        >
                          {{ seatLabel(seat) }}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Số ghế đã chọn</label>
                  <input class="form-control" :value="selectedSeats.length" disabled />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Tổng tiền (VND)</label>
                  <input class="form-control" :value="formattedTotal" disabled />
                </div>

                <div class="col-12">
                  <label class="form-label">Ngày đặt</label>
                  <input type="datetime-local" v-model="booking.ngay_dat" class="form-control" />
                </div>

                <div class="col-12 mt-3 d-flex gap-2">
                  <button class="btn btn-primary" :disabled="submitting || !canSubmit" @click="submitBooking">
                    {{ submitting ? 'Đang gửi...' : 'Xác nhận đặt vé' }}
                  </button>
                  <router-link to="/" class="btn btn-outline-secondary">Hủy</router-link>
                </div>

                <div v-if="error" class="mt-3 text-danger">{{ error }}</div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      phim: {},
      showtimes: [],
      loading: true,
      submitting: false,
      error: null,
      // seats selection
      seatRows: [], // array of rows, each row is array of seat objects {id, row, col, label, reserved}
      selectedSeats: [],
      booking: {
        id_khach_hang: '',
        id_suat_chieu: '',
        tong_tien: 0,
        trang_thai: 'pending',
        ngay_dat: ''
      }
    };
  },

  mounted() {
    const phimId = this.$route.params.id;
    const storedIdKh = localStorage.getItem('id_khach_hang');
    if (storedIdKh) this.booking.id_khach_hang = storedIdKh;
    this.booking.ngay_dat = new Date().toISOString().slice(0,16);
    this.loadPhim(phimId);
    this.loadShowtimes(phimId);
  },

  computed: {
    selectedShowtime() {
      return this.showtimes.find(s => String(s.id) === String(this.booking.id_suat_chieu)) || null;
    },
    total() {
      const price = (this.selectedShowtime && (this.selectedShowtime.gia || this.selectedShowtime.price)) || 0;
      return Number(price) * Number(this.selectedSeats.length || 0);
    },
    formattedTotal() {
      return new Intl.NumberFormat('vi-VN').format(this.total);
    },
    canSubmit() {
      return this.booking.id_suat_chieu && this.selectedSeats.length > 0 && this.booking.id_khach_hang;
    }
  },

  methods: {
    loadPhim(id) {
      axios.get(`http://127.0.0.1:8000/api/phim/${id}`)
        .then(res => { this.phim = res.data.data || {}; })
        .catch(() => {})
        .finally(() => { this.loading = false; });
    },

    loadShowtimes(phimId) {
      const tryUrls = [
        `http://127.0.0.1:8000/api/suat-chieu?phim_id=${phimId}`,
        `http://127.0.0.1:8000/api/getSuatChieu?phim_id=${phimId}`,
        `http://127.0.0.1:8000/api/phim/${phimId}/suat-chieu`
      ];

      const tryNext = (idx) => {
        if (idx >= tryUrls.length) return;
        axios.get(tryUrls[idx])
          .then(res => {
            const data = res.data && (res.data.data || res.data);
            if (Array.isArray(data)) {
              this.showtimes = data;
            } else {
              this.showtimes = [];
            }
          })
          .catch(() => { tryNext(idx + 1); });
      };

      tryNext(0);
    },

    onShowtimeChange() {
      // build seat layout for selected showtime
      this.selectedSeats = [];
      this.buildSeatLayout();
    },

    buildSeatLayout() {
      // If backend provides seating plan (rows,cols,reserved), use it.
      const s = this.selectedShowtime;
      if (!s) { this.seatRows = []; return; }

      // example expected fields from backend: s.seat_map = { rows: 8, cols: 12, reserved: ['A1','A2'] }
      const map = s.seat_map || s.seating || null;
      if (map && map.rows && map.cols) {
        const reserved = Array.isArray(map.reserved) ? map.reserved : [];
        const rows = map.rows;
        const cols = map.cols;
        const rowsArr = [];
        for (let r = 0; r < rows; r++) {
          const rowLabel = String.fromCharCode(65 + r);
          const rowSeats = [];
          for (let c = 1; c <= cols; c++) {
            const label = `${rowLabel}${c}`;
            rowSeats.push({ id: `${s.id}-${label}`, row: rowLabel, col: c, label, reserved: reserved.includes(label) });
          }
          rowsArr.push(rowSeats);
        }
        this.seatRows = rowsArr;
        return;
      }

      // fallback: generate a simple layout: 8 rows x 10 cols, random reserved
      const rows = 8; const cols = 10;
      const rowsArr = [];
      const reservedList = (s.reserved_seats || []).map(String);
      for (let r = 0; r < rows; r++) {
        const rowLabel = String.fromCharCode(65 + r);
        const rowSeats = [];
        for (let c = 1; c <= cols; c++) {
          const label = `${rowLabel}${c}`;
          const reserved = reservedList.includes(label);
          rowSeats.push({ id: `${s.id}-${label}`, row: rowLabel, col: c, label, reserved });
        }
        rowsArr.push(rowSeats);
      }
      this.seatRows = rowsArr;
    },

    seatLabel(seat) { return seat.label; },

    seatClass(seat) {
      if (seat.reserved) return 'reserved';
      return this.selectedSeats.includes(seat.id) ? 'selected' : 'available';
    },

    toggleSeat(seat) {
      if (seat.reserved) return;
      const idx = this.selectedSeats.indexOf(seat.id);
      if (idx === -1) this.selectedSeats.push(seat.id);
      else this.selectedSeats.splice(idx,1);
    },

    submitBooking() {
      if (!this.canSubmit) {
        this.error = 'Vui lòng chọn suất chiếu, ghế và đăng nhập.';
        return;
      }

      this.submitting = true; this.error = null;
      const payload = {
        id_khach_hang: this.booking.id_khach_hang,
        id_suat_chieu: this.booking.id_suat_chieu,
        tong_tien: this.total,
        trang_thai: this.booking.trang_thai,
        ngay_dat: this.booking.ngay_dat,
        selected_seats: this.selectedSeats
      };

      axios.post('http://127.0.0.1:8000/api/dat-ve', payload)
        .then(res => {
          if (res.data && res.data.status) {
            const msg = `<b>Thành công</b><div style="margin-top:6px">${res.data.message || 'Đặt vé thành công'}</div>`;
            this.$toast.success(msg);
            this.$router.push('/');
          } else {
            const msg = `<b>Lỗi</b><div style="margin-top:6px">${res.data.message || 'Không thể đặt vé'}</div>`;
            this.$toast.error(msg);
          }
        })
        .catch(err => {
          const msg = err.response?.data?.message || 'Lỗi kết nối tới server';
          this.$toast.error(msg);
        })
        .finally(() => { this.submitting = false; });
    }
  }
};
</script>

<style scoped>

</style>
