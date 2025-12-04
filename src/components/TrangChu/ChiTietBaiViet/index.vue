<template>
  <div class="container py-5">

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-warning"></div>
      <p class="text-muted mt-3">Đang tải bài viết...</p>
    </div>

    <!-- KHÔNG TÌM THẤY -->
    <div v-else-if="!baiViet" class="text-center text-danger py-5">
      <h3>Bài viết không tồn tại.</h3>
    </div>

    <!-- HIỂN THỊ BÀI VIẾT -->
    <div v-else class="row justify-content-center fade-in">
      <div class="col-lg-10">

        <!-- ẢNH ĐẠI DIỆN -->
        <div class="featured-wrapper mb-4">
          <img :src="baiViet.anh_dai_dien"
               class="featured-img" />
        </div>

        <!-- TIÊU ĐỀ -->
        <h1 class="fw-bold text-warning mb-3 title-highlight">
          {{ baiViet.tieu_de }}
        </h1>

        <!-- NGÀY ĐĂNG -->
        <p class="text-info fw-semibold">
          <i class="fas fa-calendar-alt me-2"></i>
          Ngày đăng: {{ formatDate(baiViet.ngay_dang) }}
        </p>

        <hr class="divider" />

        <!-- NỘI DUNG -->
        <div class="noi-dung-bai-viet" v-html="formatContent(baiViet.noi_dung)"></div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      baiViet: null,
      loading: true,
    };
  },

  mounted() {
    this.loadBaiViet();
  },

  methods: {
    loadBaiViet() {
      const id = this.$route.params.id;

      axios.get(`http://127.0.0.1:8000/api/bai-viet/${id}`)
        .then(res => {
          if (res.data.status) {
            this.baiViet = res.data.data;
          }
        })
        .catch(() => {
          this.baiViet = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString("vi-VN");
    },

    // Tự động xuống dòng + giữ định dạng đẹp
    formatContent(content) {
      if (!content) return "";
      return content
        .replace(/\n\n/g, "<br/><br/>")  // tạo khoảng cách giữa các đoạn
        .replace(/\n/g, "<br/>");
    }
  }
};
</script>

<style scoped>

</style>
