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

      <!-- DANH SÁCH PHIM -->
      <div class="container mt-5 mb-5 pt-4">
        <div class="text-center">
          <h2 class="section-title">
            <i class="fas fa-play-circle me-2"></i> PHIM ĐANG CHIẾU
          </h2>
        </div>
        <div class="row g-4">
          <div v-for="phim in filteredPhim" :key="phim.id" class="col-6 col-sm-6 col-md-4 col-lg-3">
            <div class="card movie-card">
              <div class="card-img-wrapper">
                <img :src="phim.poster_url" class="poster" />
                <div class="movie-card-overlay">
                  <router-link :to="'/chi-tiet-phim/' + phim.id" class="btn btn-outline-warning btn-sm fw-bold">
                    <i class="fas fa-info-circle me-1"></i> XEM CHI TIẾT
                  </router-link>
                </div>
              </div>
              <div class="card-body bg-dark text-white d-flex flex-column">
                <h5 class="card-title text-warning text-truncate">{{ phim.ten_phim }}</h5>
                <p class="card-text text-light small">{{ phim.nam_san_xuat }} • {{ phim.quoc_gia }}</p>
                <router-link :to="'/dat-ve/' + phim.id" class="btn btn-warning w-100 fw-bold mt-auto">Đặt vé</router-link>
              </div>
            </div>
          </div>
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
      searchQuery: '',
      selectedYear: '',
      theLoaiList: [],
      showByGenreLimit: 8
    };
  },

  mounted() {
    this.loadPhim();
    this.loadTheLoai();
    // prefill search from query param if present (header search navigates with ?q=...)
    this.searchQuery = this.$route?.query?.q || '';
    this.selectedYear = this.$route?.query?.year || '';
    // listen for header search event dispatched by TopClient
    window.addEventListener('header-search', this.onHeaderSearch);
  },

  beforeUnmount() {
    window.removeEventListener('header-search', this.onHeaderSearch);
  },

  computed: {
    filteredPhim() {
      const q = this.normalizeText((this.searchQuery || '').trim());
      return this.danhSachPhim.filter(phim => {
        const name = this.normalizeText(phim.ten_phim || phim.title || '');
        const matchesName = !q || name.includes(q);
        const matchesYear = !this.selectedYear || String(phim.nam_san_xuat) === String(this.selectedYear);
        return matchesName && matchesYear;
      });
    },
    // genres visible (active)
  
  },

  watch: {
    // update search when route query changes
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
    loadPhim() {
      axios
        .get("http://127.0.0.1:8000/api/getDataPhim")   // 🔥 CHỈ CẦN ĐỔI API Ở ĐÂY
        .then((res) => {
          this.danhSachPhim = res.data.data; // đảm bảo backend trả về {data: [...]}
        })
        .catch(() => {
          console.log("Không thể load danh sách phim");
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
    }
  }
};
</script>
