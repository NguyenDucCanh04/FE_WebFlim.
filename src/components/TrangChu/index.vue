<template>
  <div class="phim-page">

    <!-- BACKGROUND MỜ -->
    <div class="background-blur"></div>

    <div class="content-container">

      <!-- ======================= BANNER ========================== -->
      <div v-if="!searchQuery.trim()" class="row">
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

        <div class="col-lg-3">
          <img class="qc-img rounded-5 mb-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ftACCEPNSr7uugBynHMupyU5ChtLs-9MNg&s" />

          <img class="qc-img rounded-5"
            src="https://thanhnien.mediacdn.vn/uploaded/ngocthanh/2020_12_10/da-04_PBWC.jpg?width=500" />
        </div>
      </div>

      <!-- ====================== SỰ KIỆN - BÀI VIẾT ====================== -->
      <section v-if="!searchQuery.trim()" class="container mt-5 mb-5 pt-4">
        <div class="text-center mb-4">
          <h2 class="section-title"><i class="fas fa-bullhorn me-2"></i> SỰ KIỆN - KHUYẾN MÃI</h2>
          <p class="text-muted">{{ danhSachBaiViet.length }} bài viết mới nhất</p>
        </div>

        <div class="row">
          <!-- Bài viết nổi bật -->
          <div class="col-lg-8" v-if="danhSachBaiViet.length">
            <div class="card shadow-sm bv-featured">
              <router-link :to="'/chi-tiet-bai-viet/' + danhSachBaiViet[0].id">
                <img :src="danhSachBaiViet[0].anh_dai_dien" class="featured-img clickable" />
              </router-link>

              <div class="p-4">
                <router-link :to="'/chi-tiet-bai-viet/' + danhSachBaiViet[0].id" class="text-decoration-none">
                  <h3 class="text-white fw-bold featured-title text-truncate-2">
                    {{ danhSachBaiViet[0].tieu_de }}
                  </h3>
                </router-link>

                <small class="text-warning">
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ formatDate(danhSachBaiViet[0].ngay_dang) }}
                </small>

                <p class="text-light mt-3 text-truncate-4">
                  {{ danhSachBaiViet[0].noi_dung }}
                </p>

                <router-link :to="'/chi-tiet-bai-viet/' + danhSachBaiViet[0].id" class="btn btn-warning fw-bold">
                  XEM CHI TIẾT
                </router-link>
              </div>
            </div>
          </div>

          <!-- Danh sách bài viết bên phải -->
          <div class="col-lg-4">
            <div v-for="(bv, i) in danhSachBaiViet.slice(1, 7)" :key="i" class="side-post d-flex mb-3">
              <router-link :to="'/chi-tiet-bai-viet/' + bv.id">
                <img :src="bv.anh_dai_dien" class="side-thumb clickable" />
              </router-link>

              <div class="ms-3">
                <router-link :to="'/chi-tiet-bai-viet/' + bv.id" class="text-decoration-none">
                  <h6 class="text-white text-truncate-2 side-title">{{ bv.tieu_de }}</h6>
                </router-link>
                <small class="text-info">
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ formatDate(bv.ngay_dang) }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================= KẾT QUẢ TÌM KIẾM ======================= -->
      <section v-if="searchQuery.trim()" class="container mt-5 mb-5 pt-4">

        <div class="text-center mb-4">
          <h2 class="section-title">
            <i class="fas fa-search me-2"></i> KẾT QUẢ TÌM KIẾM: "{{ searchQuery }}"
          </h2>
          <p class="text-muted">{{ phimTimKiem.length }} phim tìm thấy</p>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-warning"></div>
          <p class="text-white mt-3">Đang tải...</p>
        </div>

        <div v-else-if="phimTimKiem.length === 0" class="text-center text-light py-5">
          <i class="fas fa-search-minus fa-3x text-muted mb-3"></i>
          <h4 class="text-white">Không tìm thấy phim nào</h4>
        </div>

        <div v-else class="row g-4">
          <div v-for="phim in phimTimKiem" :key="phim.id" class="col-6 col-sm-6 col-md-4 col-lg-3">

            <div class="card movie-card">

              <div class="card-img-wrapper">
                <img :src="phim.poster_url || '/src/IMG/default-movie.jpg'"
                  class="poster"
                  @error="$event.target.src = '/src/IMG/default-movie.jpg'" />

                <!-- Xem chi tiết: chỉ phim đang chiếu -->
                <div class="movie-card-overlay" v-if="phim.trang_thai_chieu == 1">
                  <router-link :to="'/chi-tiet-phim/' + phim.id" class="btn btn-outline-warning btn-sm fw-bold">
                    XEM CHI TIẾT
                  </router-link>
                </div>

                <!-- Badge -->
                <div class="position-absolute top-0 start-0 m-2">
                  <span class="badge"
                    :class="phim.trang_thai_chieu == 1 ? 'bg-success' : 'bg-warning text-dark'">
                    {{ phim.trang_thai_chieu == 1 ? 'Đang chiếu' : 'Sắp chiếu' }}
                  </span>
                </div>
              </div>

              <div class="card-body bg-dark text-white">
                <h5 class="card-title text-warning text-truncate">{{ phim.ten_phim }}</h5>

                <p class="card-text text-light small">
                  {{ phim.nam_san_xuat }} • {{ phim.quoc_gia }} <br>
                  {{ phim.thoi_luong }} phút
                </p>

                <!-- Đặt vé: chỉ phim đang chiếu -->
                <router-link v-if="phim.trang_thai_chieu == 1" :to="'/dat-ve/' + phim.id"
                  class="btn btn-warning w-100 fw-bold">
                  Đặt vé ngay
                </router-link>

                <button v-else class="btn btn-secondary w-100 fw-bold" disabled>Sắp chiếu</button>
              </div>

            </div>

          </div>
        </div>

      </section>

      <!-- ===================== PHIM ĐANG CHIẾU ===================== -->
      <section v-if="!searchQuery.trim()" class="container mt-5 mb-5 pt-4">
        <div class="text-center mb-4">
          <h2 class="section-title"><i class="fas fa-play-circle me-2"></i> PHIM ĐANG CHIẾU</h2>
          <p class="text-muted">{{ phimDangChieu.length }} phim đang chiếu</p>
        </div>

        <div v-if="phimDangChieu.length === 0" class="text-center text-light py-5">
          Không có phim đang chiếu
        </div>

        <div class="row g-4">
          <div v-for="phim in phimDangChieu" :key="phim.id"
            class="col-6 col-sm-6 col-md-4 col-lg-3">

            <div class="card movie-card">

              <div class="card-img-wrapper">
                <img :src="phim.poster_url" class="poster" />

                <div class="movie-card-overlay">
                  <router-link :to="'/chi-tiet-phim/' + phim.id"
                    class="btn btn-outline-warning btn-sm fw-bold">
                    XEM CHI TIẾT
                  </router-link>
                </div>

                <div class="position-absolute top-0 start-0 m-2">
                  <span class="badge bg-success">Đang chiếu</span>
                </div>
              </div>

              <div class="card-body bg-dark text-white">
                <h5 class="text-warning text-truncate">{{ phim.ten_phim }}</h5>
                <p class="text-light small">
                  {{ phim.nam_san_xuat }} • {{ phim.quoc_gia }}
                  <br />{{ phim.thoi_luong }} phút
                </p>

                <router-link :to="'/dat-ve/' + phim.id" class="btn btn-warning w-100 fw-bold">
                  Đặt vé ngay
                </router-link>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- ====================== PHIM SẮP CHIẾU ===================== -->
      <section v-if="!searchQuery.trim()" class="container mt-5 mb-5 pt-4">
        <div class="text-center mb-4">
          <h2 class="section-title"><i class="fas fa-clock me-2"></i> PHIM SẮP CHIẾU</h2>
          <p class="text-muted">{{ phimSapChieu.length }} phim sắp khởi chiếu</p>
        </div>

        <div class="row g-4">
          <div v-for="phim in phimSapChieu" :key="phim.id"
            class="col-6 col-sm-6 col-md-4 col-lg-3">

            <div class="card movie-card">

              <div class="card-img-wrapper">
                <img :src="phim.poster_url" class="poster" />

                <div class="position-absolute top-0 start-0 m-2">
                  <span class="badge bg-warning text-dark">Sắp chiếu</span>
                </div>
              </div>

              <div class="card-body bg-dark text-white">
                <h5 class="text-warning text-truncate">{{ phim.ten_phim }}</h5>
                <p class="text-light small">
                  {{ phim.nam_san_xuat }} • {{ phim.quoc_gia }} <br />
                  {{ phim.thoi_luong }} phút <br />
                  <small class="text-info">
                    Khởi chiếu: {{ formatDate(phim.ngay_khoi_chieu) }}
                  </small>
                </p>

                <button class="btn btn-secondary w-100 fw-bold" disabled>Sắp khởi chiếu</button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      danhSachPhim: [],
      danhSachBaiViet: [],
      loading: false,
      searchQuery: "",
    };
  },

  mounted() {
    this.loadPhim();
    this.loadBaiViet();

    window.addEventListener("header-search", (e) => {
      this.searchQuery = e.detail;
    });
  },

  computed: {
    phimDangChieu() {
      return this.danhSachPhim.filter(p => p.trang_thai == 1 && p.trang_thai_chieu == 1);
    },

    phimSapChieu() {
      return this.danhSachPhim.filter(p => p.trang_thai == 1 && p.trang_thai_chieu == 0);
    },

    phimTimKiem() {
      if (!this.searchQuery.trim()) return [];

      const q = this.searchQuery.toLowerCase();

      return this.danhSachPhim.filter(p =>
        p.trang_thai == 1 &&
        p.ten_phim.toLowerCase().includes(q)
      );
    }
  },

  methods: {
    loadPhim() {
      this.loading = true;
      axios.get("http://127.0.0.1:8000/api/getDataPhim")
        .then(res => this.danhSachPhim = res.data.data || [])
        .finally(() => this.loading = false);
    },

    loadBaiViet() {
      axios.get("http://127.0.0.1:8000/api/bai-viet-moi")
        .then(res => this.danhSachBaiViet = res.data.data || []);
    },

    formatDate(d) {
      return new Date(d).toLocaleDateString("vi-VN");
    }
  }
};
</script>

<style scoped></style>
