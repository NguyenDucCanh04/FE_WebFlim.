<template>
  <div class="movie-detail-container">

    <!-- BACKGROUND BLUR -->
    <div class="background-blur" :style="{ backgroundImage: 'url(' + (phim.poster_url || '/src/IMG/logo.png') + ')' }">
    </div>

    <div class="content-wrapper container py-5">

      <!-- Nếu chưa load xong -->
      <div v-if="loading" class="loading-text">Đang tải dữ liệu...</div>

      <!-- Nội dung phim -->
      <div v-else class="row gx-4 gy-4 align-items-start">

        <!-- Poster + actions -->
        <div class="col-lg-4">
          <div class="card poster-card shadow-lg">
            <img :src="phim.poster_url" alt="poster" class="poster-img img-fluid rounded-3" />

            <div class="card-body p-3">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <div class="rating-circle">
                    <span>{{ phim.diem_danh_gia || phim.rating || '—' }}</span>
                  </div>
                </div>
                <div class="text-end">
                  <small class="text-muted">Thời lượng</small>
                  <div class="fw-bold">{{ phim.thoi_luong || '-' }} phút</div>
                </div>
              </div>

              <div class="d-grid gap-2">
                <button class="btn btn-warning btn-lg fw-bold" v-if="phim.trailer_url" @click="openTrailer">
                  <i class="fas fa-play me-2"></i> Xem Trailer
                </button>

                <router-link :to="'/dat-ve/' + phim.id" class="btn btn-primary btn-lg fw-bold">
                  <i class="fas fa-ticket-alt me-2"></i> Đặt Vé
                </router-link>
              </div>

            </div>
          </div>


        </div>

        <!-- Thông Tin -->
        <div class="col-lg-8 text-white">
          <h2 class="movie-title mb-2">{{ phim.ten_phim || 'Tên phim' }}</h2>

          <div class="meta-row mb-3 d-flex flex-wrap gap-3 align-items-center text-muted">
            <div class="badge bg-dark text-light px-3 py-2">{{ phim.nam_san_xuat || '-' }}</div>
            <div>{{ phim.dao_dien || '-' }}</div>
            <div class="text-truncate" style="max-width:380px">{{ phim.dien_vien || '-' }}</div>
          </div>

          <p class="lead text-light description">{{ phim.mo_ta || 'Chưa có mô tả.' }}</p>

          <div class="row gx-3">
            <div class="col-md-6">
              <ul class="info-list list-unstyled">
                <li><strong>Đạo diễn:</strong> {{ phim.dao_dien || '-' }}</li>
                <li><strong>Diễn viên:</strong> {{ phim.dien_vien || '-' }}</li>
                <li><strong>Thời lượng:</strong> {{ phim.thoi_luong || '-' }} phút</li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="info-list list-unstyled">
                <li><strong>Sản xuất:</strong> {{ phim.nam_san_xuat || '-' }}</li>
                <li><strong>Quốc gia:</strong> {{ phim.quoc_gia || '-' }}</li>
                <li><strong>Ngôn ngữ:</strong> {{ phim.ngon_ngu || 'Tiếng Việt' }}</li>
              </ul>
            </div>
          </div>



        </div>

      </div>
    </div>

    <!-- Trailer Modal (play inline) -->
    <div v-if="showTrailer" class="trailer-modal" @click.self="closeTrailer">
      <div class="trailer-content">
        <button class="close-btn" @click="closeTrailer" aria-label="Đóng">×</button>

        <template v-if="isVideoFile(trailerSrc)">
          <video :src="trailerSrc" controls autoplay class="w-100 h-100 rounded-2"></video>
        </template>
        <template v-else>
          <iframe :src="embedTrailerUrl()" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen
            class="w-100 h-100 rounded-2"></iframe>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      phim: {},
      loading: true,
      // trailer UI
      showTrailer: false,
      trailerSrc: null
    };
  },

  mounted() {
    this.loadChiTietPhim();
  },

  methods: {
    loadChiTietPhim() {
      const id = this.$route.params.id;

      axios
        .get(`http://127.0.0.1:8000/api/phim/${id}`)
        .then((res) => {
          this.phim = res.data.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    openTrailer() {
      // play trailer inline instead of opening a new tab
      this.trailerSrc = this.phim.trailer_url;
      this.showTrailer = true;
    },

    closeTrailer() {
      this.showTrailer = false;
      // stop video by clearing src (helps stop playback)
      this.trailerSrc = null;
    },

    isVideoFile(url) {
      if (!url) return false;
      return /\.(mp4|webm|ogg)(\?|$)/i.test(url);
    },

    // convert common video URLs (YouTube, Vimeo) to embeddable src
    embedTrailerUrl() {
      const url = this.trailerSrc || '';
      if (!url) return '';

      // YouTube watch links -> embed
      const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
      if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
      }

      // Vimeo
      const vmMatch = url.match(/vimeo\.com\/(\d+)/);
      if (vmMatch) {
        return `https://player.vimeo.com/video/${vmMatch[1]}?autoplay=1`;
      }

      // fallback: return the original url (may or may not be embeddable)
      return url;
    }
  },
};
</script>

<style scoped></style>
