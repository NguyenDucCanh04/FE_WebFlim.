<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row align-items-center">
              <div class="col-lg-3 col-xl-3">
                <div class="theloai-header">
                  <h4 class="mb-0 d-flex align-items-baseline gap-2">
                    <i class="bx bx-film fs-5 text-primary" aria-hidden="true"></i>
                    <span class="theloai-title text-nowrap">Danh Sách Phim - {{ theLoai?.ten_the_loai || theLoai?.ten ||
                      'Không xác định' }}</span>
                    <span class="badge bg-light text-muted small ms-2">{{ totalCount }} phim</span>
                  </h4>

                </div>
              </div>
              <div class="col-lg-9 col-xl-9">
                <div class="float-lg-end">
                  <div class="row row-cols-lg-2 row-cols-xl-auto g-2">
                    <div class="col">
                      <div class="position-relative">
                        <input :value="search_tag" @input="onSearchInput" type="text" class="form-control ps-5"
                          placeholder="Tìm phim...">
                        <span class="position-absolute top-50 product-show translate-middle-y"><i
                            class="bx bx-search"></i></span>
                      </div>
                    </div>
                    <div class="col">
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-white">Sắp Xếp</button>
                        <div class="btn-group" role="group">
                          <button id="btnGroupDropSort" type="button"
                            class="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class='bx bx-chevron-down'></i>
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="btnGroupDropSort">
                            <li><a v-on:click.prevent="setSort(1)" class="dropdown-item" href="#">Tên A - Z</a></li>
                            <li><a v-on:click.prevent="setSort(2)" class="dropdown-item" href="#">Tên Z - A</a></li>
                            <li><a v-on:click.prevent="setSort(3)" class="dropdown-item" href="#">Năm tăng dần</a></li>
                            <li><a v-on:click.prevent="setSort(4)" class="dropdown-item" href="#">Năm giảm dần</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="btn-group" role="group">
                        <button type="button" class="btn btn-white">Năm</button>
                        <div class="btn-group" role="group">
                          <button id="btnGroupYear" type="button"
                            class="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <i class="bx bx-slider"></i>
                          </button>
                          <ul class="dropdown-menu dropdown-menu-xxl-end" style="width: 320px;"
                            aria-labelledby="btnGroupYear">
                            <li>
                              <div class="dropdown-header p-3">
                                <div class="row">
                                  <div class="col-5"><input v-model.number="begin" class="form-control"
                                      placeholder="Năm từ" type="number"></div>
                                  <div class="col-2 d-flex align-items-center justify-content-center">-</div>
                                  <div class="col-5"><input v-model.number="end" class="form-control"
                                      placeholder="Năm đến" type="number"></div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mt-3">
      <template v-for="(value, index) in sxandgido" :key="value.id || value.uid || index">
        <div class="col d-flex">
          <router-link :to="`/chi-tiet-phim/${value.id || value.uid || value._id}`"
            class="movie-card-link w-100 text-decoration-none">
            <article class="card movie-card m-0">
              <div class="movie-poster-wrap position-relative">
                <img :src="value.poster_url || value.hinh_anh || value.poster" alt="Poster" class="movie-poster" />
                <div v-if="value.is_moi == 1" class="badge-new position-absolute top-0 start-0 m-2">Mới</div>
                <div class="movie-overlay d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-start">
                    <h6 class="movie-title mb-1">{{ value.ten_phim || value.title || value.ten_san_pham }}</h6>
                    <div class="movie-year small ms-2 text-light">{{ value.nam_san_xuat || value.nam || '' }}</div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-auto">
                    <div class="movie-meta small text-light">{{ value.the_loai ? value.the_loai : '' }}</div>
                    <div class="rating text-warning small">
                      <template v-for="i in Math.max(0, Math.min(5, value.sao_danh_gia || 0))" :key="i"><i
                          class="bx bxs-star"></i></template>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </router-link>
        </div>
      </template>

      <div v-if="!isLoading && sxandgido.length === 0" class="col-12 text-center text-muted py-5">Không có phim cho thể
        loại
        này.</div>
    </div>

    <!-- Pagination -->
    <nav v-if="pagination && pagination.last_page > 1" aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li :class="['page-item', { disabled: pagination.current_page === 1 }]">
          <a class="page-link" href="#" @click.prevent="goToPage(pagination.current_page - 1)">Previous</a>
        </li>

        <li v-for="p in pagesToShow" :key="p" :class="['page-item', { active: p === pagination.current_page }]">
          <a class="page-link" href="#" @click.prevent="goToPage(p)">{{ p }}</a>
        </li>

        <li :class="['page-item', { disabled: pagination.current_page === pagination.last_page }]">
          <a class="page-link" href="#" @click.prevent="goToPage(pagination.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['id_the_loai', 'id_phim'],
  data() {
    return {
      id_the_loai: this.$route.params.id_the_loai || this.id_the_loai,
      list_phim: [],
      theLoai: null,
      sort: 1, // UI code: 1: name A-Z,2: name Z-A,3: year asc,4: year desc
      // map to API sort strings
      perPage: 12,
      search_tag: '',
      begin: 1900,
      end: new Date().getFullYear(),
      isLoading: true,
      pagination: null,
      page: 1,
      searchTimeout: null
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.id_the_loai = to.params.id_the_loai;
    this.page = 1;
    this.layThongTinPhimTuTheLoai();
    next();
  },
  mounted() {
    this.layThongTinPhimTuTheLoai();
  },
  watch: {
    sort() {
      this.page = 1;
      this.layThongTinPhimTuTheLoai();
    }
  },
  methods: {
    getSortParam() {
      if (this.sort === 1) return 'name_asc';
      if (this.sort === 2) return 'name_desc';
      if (this.sort === 3) return 'year_asc';
      if (this.sort === 4) return 'year_desc';
      return null;
    },
    setSort(v) { this.sort = v; },
    onSearchInput(e) {
      const val = e.target.value || '';
      this.search_tag = val;
      // debounce
      if (this.searchTimeout) clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.page = 1;
        this.layThongTinPhimTuTheLoai();
      }, 450);
    },
    layThongTinPhimTuTheLoai() {
      const id = this.id_the_loai;
      if (!id) return;
      this.isLoading = true;
      const params = {
        per_page: this.perPage,
        q: this.search_tag || undefined,
        sort: this.getSortParam() || undefined,
        page: this.page
      };

      axios.get(`http://127.0.0.1:8000/api/layThongTinPhimTuTheLoai/${id}`, { params })
        .then(res => {
          if (res && res.data) {
            this.list_phim = res.data.data || [];
            this.pagination = res.data.pagination || null;
            this.theLoai = res.data.the_loai || this.theLoai;
          }
        })
        .catch(err => {
          console.error('Không thể tải phim theo thể loại:', err);
          this.list_phim = [];
          this.pagination = null;
        })
        .finally(() => { this.isLoading = false; });
    },
    matchFilmToTheLoai(f, id) {
      if (!f) return false;
      const idStr = String(id);
      if (String(f.the_loai_id) === idStr) return true;
      if (String(f.the_loai) === idStr) return true;
      if (f.the_loai && typeof f.the_loai === 'object' && String(f.the_loai.id) === idStr) return true;
      if (Array.isArray(f.the_loai_ids) && f.the_loai_ids.map(x => String(x)).includes(idStr)) return true;
      if (Array.isArray(f.the_loai) && f.the_loai.map(x => String(x.id || x)).includes(idStr)) return true;
      if (Array.isArray(f.categories) && f.categories.map(x => String(x.id || x)).includes(idStr)) return true;
      return false;
    },
    goToPage(p) {
      if (!this.pagination) return;
      if (p < 1 || p > this.pagination.last_page) return;
      this.page = p;
      this.layThongTinPhimTuTheLoai();
    }
  },
  computed: {
    sxandgido() {
      return this.list_phim
        .filter(v => {
          const title = (v.ten_phim || v.title || v.ten_san_pham || '').toString().toLowerCase();
          const matchesSearch = this.search_tag === '' || title.includes(this.search_tag.toLowerCase());
          const year = Number(v.nam_san_xuat || v.nam || 0);
          const matchesYear = (!this.begin && !this.end) || (year >= this.begin && year <= this.end);
          return matchesSearch && matchesYear;
        })
        .sort((a, b) => {
          if (this.sort === 1) return (a.ten_phim || a.title || '').localeCompare(b.ten_phim || b.title || '');
          if (this.sort === 2) return (b.ten_phim || b.title || '').localeCompare(a.ten_phim || a.title || '');
          if (this.sort === 3) return (Number(a.nam_san_xuat || a.nam || 0) - Number(b.nam_san_xuat || b.nam || 0));
          if (this.sort === 4) return (Number(b.nam_san_xuat || b.nam || 0) - Number(a.nam_san_xuat || a.nam || 0));
          return 0;
        });
    },
    pagesToShow() {
      if (!this.pagination) return [];
      const total = this.pagination.last_page || 1;
      const current = this.pagination.current_page || 1;
      const pages = [];
      const start = Math.max(1, current - 2);
      const end = Math.min(total, current + 2);
      for (let i = start; i <= end; i++) pages.push(i);
      return pages;
    },
    totalCount() {
      if (this.pagination && typeof this.pagination.total === 'number') return this.pagination.total;
      return (this.list_phim && this.list_phim.length) || 0;
    }
  }
}
</script>

<style scoped></style>