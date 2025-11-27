<template>
  <div class="phim-page">

    <!-- BACKGROUND MỜ -->
    <div class="background-blur"></div>

    <div class="content-container">

      <!-- BANNER -->
      <div class="row">
        <div class="col-lg-9">
          <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">

            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                class="active"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
            </div>

            <div class="carousel-inner rounded-5">
              <div class="carousel-item active" data-bs-interval="3000">
                <img src="/src/IMG/avatar.jpg" class="d-block w-100 rounded-5 banner-img" />
              </div>

              <div class="carousel-item" data-bs-interval="3000">
                <img src="/src/IMG/nen3.jpg" class="d-block w-100 rounded-5 banner-img" />
              </div>

              <div class="carousel-item" data-bs-interval="3000">
                <img src="/src/IMG/nen2.jpg" class="d-block w-100 rounded-5 banner-img" />
              </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon"></span>
            </button>

            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next">
              <span class="carousel-control-next-icon"></span>
            </button>

          </div>
        </div>

        <!-- QC -->
        <div class="col-lg-3">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ftACCEPNSr7uugBynHMupyU5ChtLs-9MNg&s"
            class="qc-img rounded-5 mb-3" />
          <img src="https://thanhnien.mediacdn.vn/uploaded/ngocthanh/2020_12_10/da-04_PBWC.jpg?width=500"
            class="qc-img rounded-5" />
        </div>

      </div>

      <!-- PHIM ĐANG CHIẾU (chỉ hiển thị khi không có tìm kiếm) -->
      <div v-if="!searchQuery.trim()" class="container mt-5 mb-5 pt-4">
        <div class="text-center mb-4">
          <h2 class="section-title">
            <i class="fas fa-play-circle me-2"></i> PHIM ĐANG CHIẾU
          </h2>
          <p class="text-muted">{{ phimDangChieu.length }} phim đang chiếu</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-white mt-3">Đang tải danh sách phim...</p>
        </div>

        <!-- No Movies -->
        <div v-else-if="phimDangChieu.length === 0" class="text-center py-5">
          <i class="fas fa-film fa-3x text-muted mb-3"></i>
          <h4 class="text-white">Hiện tại không có phim đang chiếu</h4>
          <p class="text-muted">Vui lòng quay lại sau</p>
        </div>

        <!-- Movies Grid -->
        <div v-else class="row g-4">
          <div v-for="phim in phimDangChieu" :key="phim.id" class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="card movie-card">
              <div class="card-img-wrapper">
                <img :src="phim.poster_url || '/src/IMG/default-movie.jpg'" class="poster" :alt="phim.ten_phim"
                  @error="$event.target.src = '/src/IMG/default-movie.jpg'" />
                <div class="movie-card-overlay">
                  <router-link :to="'/chi-tiet-phim/' + phim.id" class="btn btn-outline-warning btn-sm fw-bold">
                    <i class="fas fa-info-circle me-1"></i> XEM CHI TIẾT
                  </router-link>
                </div>
                <!-- Badge đang chiếu -->
                <div class="position-absolute top-0 start-0 m-2">
                  <span class="badge bg-success">
                    <i class="fas fa-play me-1"></i>Đang chiếu
                  </span>
                </div>
              </div>
              <div class="card-body bg-dark text-white d-flex flex-column">
                <h5 class="card-title text-warning text-truncate" :title="phim.ten_phim">
                  {{ phim.ten_phim }}
                </h5>
                <p class="card-text text-light small">
                  {{ phim.nam_san_xuat || 'N/A' }} • {{ phim.quoc_gia || 'N/A' }}
                  <br>
                  <span class="text-warning">{{ phim.thoi_luong || 'N/A' }} phút</span>
                </p>
                <router-link :to="'/dat-ve/' + phim.id" class="btn btn-warning w-100 fw-bold mt-auto">
                  <i class="fas fa-ticket-alt me-1"></i>Đặt vé ngay
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PHIM SẮP CHIẾU (chỉ hiển thị khi không có tìm kiếm) -->
      <div v-if="!searchQuery.trim()" class="container mt-5 mb-5 pt-4">
        <div class="text-center mb-4">
          <h2 class="section-title">
            <i class="fas fa-calendar-alt me-2"></i> PHIM SẮP CHIẾU
          </h2>
          <p class="text-muted">{{ phimSapChieu.length }} phim sắp khởi chiếu</p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-info" role="status"></div>
          <p class="text-white mt-3">Đang tải danh sách phim...</p>
        </div>

        <!-- No movies -->
        <div v-else-if="phimSapChieu.length === 0" class="text-center py-5">
          <i class="fas fa-calendar-times fa-3x text-muted mb-3"></i>
          <h4 class="text-white">Hiện tại không có phim sắp chiếu</h4>
          <p class="text-muted">Hãy theo dõi để cập nhật phim mới</p>
        </div>

        <!-- Movies Grid -->
        <div v-else class="row g-4">
          <div v-for="phim in phimSapChieu" :key="phim.id" class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="card movie-card">
              <div class="card-img-wrapper">

                <img :src="phim.poster_url || '/src/IMG/default-movie.jpg'" class="poster" :alt="phim.ten_phim"
                  @error="$event.target.src = '/src/IMG/default-movie.jpg'" />



                <!-- Badge -->
                <div class="position-absolute top-0 start-0 m-2">
                  <span class="badge bg-warning text-dark">
                    <i class="fas fa-clock me-1"></i>Sắp chiếu
                  </span>
                </div>

              </div>

              <div class="card-body bg-dark text-white d-flex flex-column">
                <h5 class="card-title text-warning text-truncate" :title="phim.ten_phim">
                  {{ phim.ten_phim }}
                </h5>

                <p class="card-text text-light small">
                  {{ phim.nam_san_xuat || 'N/A' }} • {{ phim.quoc_gia || 'N/A' }}
                  <br />
                  <span class="text-warning">{{ phim.thoi_luong || 'N/A' }} phút</span>
                  <br />
                  <small class="text-info">
                    <i class="fas fa-calendar me-1"></i>
                    Khởi chiếu: {{ formatDate(phim.ngay_khoi_chieu) }}
                  </small>
                </p>

                <button class="btn btn-secondary w-100 fw-bold mt-auto" disabled>
                  <i class="fas fa-clock me-1"></i>Sắp khởi chiếu
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- SEARCH RESULTS (chỉ hiển thị khi có tìm kiếm) -->
      <div v-if="searchQuery.trim()" class="container mt-5 mb-5 pt-4">
        <div class="text-center mb-4">
          <h2 class="section-title">
            <i class="fas fa-search me-2"></i> KẾT QUẢ TÌM KIẾM: "{{ searchQuery }}"
          </h2>
          <p class="text-muted">{{ filteredPhim.length }} phim tìm thấy</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="text-white mt-3">Đang tìm kiếm...</p>
        </div>

        <!-- No Results -->
        <div v-else-if="filteredPhim.length === 0" class="text-center py-5">
          <i class="fas fa-search-minus fa-3x text-muted mb-3"></i>
          <h4 class="text-white">Không tìm thấy phim nào</h4>
          <p class="text-muted">Hãy thử từ khóa khác</p>
          <button @click="clearSearch" class="btn btn-outline-warning mt-3">
            <i class="fas fa-times me-2"></i>Xóa tìm kiếm
          </button>
        </div>

        <!-- Search Results Grid -->
        <div v-else class="row g-4">
          <div v-for="phim in filteredPhim" :key="phim.id" class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="card movie-card">
              <div class="card-img-wrapper">
                <img :src="phim.poster_url || '/src/IMG/default-movie.jpg'" class="poster" :alt="phim.ten_phim"
                  @error="$event.target.src = '/src/IMG/default-movie.jpg'" />
                <div class="movie-card-overlay">

                  <!-- Chỉ có phim đang chiếu mới hiển thị nút Xem Chi Tiết -->
                  <router-link v-if="phim.trang_thai_chieu == 1" :to="'/chi-tiet-phim/' + phim.id"
                    class="btn btn-outline-warning btn-sm fw-bold">
                    <i class="fas fa-info-circle me-1"></i> XEM CHI TIẾT
                  </router-link>

                </div>

                <!-- Badge trạng thái -->
                <div class="position-absolute top-0 start-0 m-2">
                  <span v-if="phim.trang_thai_chieu == 1" class="badge bg-success">
                    <i class="fas fa-play me-1"></i>Đang chiếu
                  </span>
                  <span v-else class="badge bg-warning text-dark">
                    <i class="fas fa-clock me-1"></i>Sắp chiếu
                  </span>
                </div>
              </div>
              <div class="card-body bg-dark text-white d-flex flex-column">
                <h5 class="card-title text-warning text-truncate" :title="phim.ten_phim">
                  {{ phim.ten_phim }}
                </h5>
                <p class="card-text text-light small">
                  {{ phim.nam_san_xuat || 'N/A' }} • {{ phim.quoc_gia || 'N/A' }}
                  <br>
                  <span class="text-warning">{{ phim.thoi_luong || 'N/A' }} phút</span>
                </p>
                <router-link v-if="phim.trang_thai_chieu == 1" :to="'/dat-ve/' + phim.id"
                  class="btn btn-warning w-100 fw-bold mt-auto">
                  <i class="fas fa-ticket-alt me-1"></i>Đặt vé
                </router-link>
                <button v-else class="btn btn-secondary w-100 fw-bold mt-auto" disabled>
                  <i class="fas fa-clock me-1"></i>Sắp chiếu
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear Search Button -->
        <div class="text-center mt-4">
          <button @click="clearSearch" class="btn btn-outline-secondary">
            <i class="fas fa-times me-2"></i>Xóa tìm kiếm
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      danhSachPhim: [],
      loading: false,
      searchQuery: '',
      selectedYear: '',
      theLoaiList: [],
      showByGenreLimit: 50
    };
  },

  mounted() {
    this.loadPhim();
    this.loadTheLoai();

    // Prefill search từ URL query
    this.searchQuery = this.$route?.query?.q || '';
    this.selectedYear = this.$route?.query?.year || '';

    // Listen for header search event
    window.addEventListener('header-search', this.onHeaderSearch);
  },

  beforeUnmount() {
    window.removeEventListener('header-search', this.onHeaderSearch);
  },

  computed: {
    // Phim đang chiếu: trang_thai == 1 && trang_thai_chieu == 1
    phimDangChieu() {
      return this.danhSachPhim
        .filter(phim => phim.trang_thai == 1 && phim.trang_thai_chieu == 1)
        .slice(0, this.showByGenreLimit);
    },

    // Phim sắp chiếu: trang_thai == 1 && trang_thai_chieu == 0
    phimSapChieu() {
      return this.danhSachPhim
        .filter(phim => phim.trang_thai == 1 && phim.trang_thai_chieu == 0)
        .slice(0, this.showByGenreLimit);
    },

    // Filtered phim cho tìm kiếm
    filteredPhim() {
      if (!this.searchQuery.trim() && !this.selectedYear) {
        return [];
      }

      const q = this.normalizeText((this.searchQuery || '').trim());
      return this.danhSachPhim.filter(phim => {
        // Chỉ hiển thị phim có trang_thai == 1
        if (phim.trang_thai != 1) return false;

        const name = this.normalizeText(phim.ten_phim || '');
        const director = this.normalizeText(phim.dao_dien || '');
        const actor = this.normalizeText(phim.dien_vien || '');
        const genre = this.normalizeText(phim.the_loai || '');

        const matchesSearch = !q || name.includes(q) || director.includes(q) || actor.includes(q) || genre.includes(q);
        const matchesYear = !this.selectedYear || String(phim.nam_san_xuat) === String(this.selectedYear);

        return matchesSearch && matchesYear;
      });
    }
  },

  watch: {
    '$route.query.q'(val) {
      this.searchQuery = val || '';
    },
    '$route.query.year'(val) {
      this.selectedYear = val || '';
    }
  },

  methods: {
    onHeaderSearch(e) {
      const q = (e && e.detail) || e || '';
      this.searchQuery = q || '';
    },

    clearSearch() {
      this.searchQuery = '';
      this.selectedYear = '';
      // Update URL để xóa query params
      this.$router.replace({ query: {} });
    },

    loadPhim() {
      this.loading = true;

      axios
        .get("http://127.0.0.1:8000/api/getDataPhim")
        .then((res) => {
          console.log('API Response:', res.data);

          if (res.data && res.data.status && res.data.data) {
            this.danhSachPhim = res.data.data;
            console.log('Loaded movies:', this.danhSachPhim.length);
          } else if (res.data && Array.isArray(res.data)) {
            this.danhSachPhim = res.data;
          } else {
            this.danhSachPhim = [];
            console.error('Unexpected API response format');
          }
        })
        .catch((error) => {
          console.error("Không thể load danh sách phim:", error);
          this.danhSachPhim = [];
        })
        .finally(() => {
          this.loading = false;
        });
    },

    loadTheLoai() {
      axios.get('http://127.0.0.1:8000/api/the-loai')
        .then(res => {
          this.theLoaiList = res.data && res.data.data ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        })
        .catch(err => {
          console.error('Không thể load thể loại:', err);
          this.theLoaiList = [];
        });
    },

    normalizeText(text) {
      if (!text) return '';
      return text.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    },

    formatDate(dateString) {
      if (!dateString) return 'Chưa xác định';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
      } catch {
        return 'Chưa xác định';
      }
    }
  }
};
</script>

<style scoped></style>