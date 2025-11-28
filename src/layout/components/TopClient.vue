<template>
    <header>
        <div class="topbar d-flex align-items-center">
            <nav class="navbar navbar-expand">
                <div class="topbar-logo-header d-flex align-items-center">
                    <img src="/src/IMG/logo.png" class="logo-icon" style="width: 70px;" alt="logo icon">
                    <h6 class="section-title">PHIM MỚI</h6>

                </div>
                <div class="mobile-toggle-menu"><i class='bx bx-menu'></i></div>
                <div class="search-bar flex-grow-1">
                    <div class="position-relative search-bar-box input-group w-100">
                        <input v-on:keyup.enter="timKiem()" v-model="noi_dung_tim" type="text"
                            class="form-control search-control border border-1 border-secondary radius-30"
                            placeholder="Search..."> <span
                            class="position-absolute top-50 search-show translate-middle-y"><i
                                class='bx bx-search'></i></span>
                        <span class="position-absolute top-50 search-close translate-middle-y"><i
                                class='bx bx-x' @click="clearInput()"></i></span>
                        <button v-on:click="timKiem()" class="btn btn-outline-secondary radius-30" type="button"
                            id="button-addon2">Tìm
                            Kiếm</button>
                    </div>
                </div>
                <template v-if="auth">
                    <div class="top-menu ms-3">
                        <ul class="navbar-nav align-items-center">
                            <li class="nav-item mobile-search-icon">
                                <a class="nav-link" href="#"> <i class='bx bx-search'></i>
                                </a>
                            </li>
                          
                        </ul>
                    </div>
                    <div class="user-box dropdown">
                        <a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://media.istockphoto.com/id/954281130/vector/man-user-icon-vector-person-symbol-profile-stroke-circle-avatar-sign-in-flat-color-glyph.jpg?s=612x612&w=is&k=20&c=fSipI8gmgThA5WlbLsOPja4KXR6F_l3OxJ-Ka61x5Oo=" class="user-img" alt="user avatar">
                            <div class="user-info ps-3">
                                <p class="user-name mb-0">{{ name_kh }}</p>
                                <p class="designattion mb-0">Khách Hàng</p>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <router-link to="/khach-hang/profile">
                                    <a class="dropdown-item" href="/khach-hang/profile">
                                        <i class="bx bx-user"></i><span>Profile</span>
                                    </a>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/khach-hang/don-hang">
                                    <a class="dropdown-item" href="/khach-hang/don-hang">
                                        <i class="fa-solid fa-box-archive"></i><span>Đơn Hàng</span>
                                    </a>
                                </router-link>
                            </li>
                            <li>
                                <div class="dropdown-divider mb-0"></div>
                            </li>
                            <li><a v-on:click="dangXuat()" class="dropdown-item"><i
                                        class='bx bx-log-out-circle'></i><span>Đăng
                                        Xuất</span></a>
                            </li>
                          
                        </ul>
                    </div>
                </template>
                <template v-else>
                    <div class="user-box dropdown">
                        <router-link to="/khach-hang/dang-nhap">
                            <button type="button"
                                class="btn btn-outline-dark px-5 radius-30 me-2 d-flex align-items-center"><i
                                    class="fa-regular fa-user me-2"></i>Đăng Nhập</button>
                        </router-link>
                        <router-link to="/khach-hang/dang-ky">
                            <button type="button" class="btn btn-dark px-5 radius-30 d-flex align-items-center"><i
                                    class="fa-solid fa-arrow-right-to-bracket me-2"></i>Đăng Ký</button>
                        </router-link>
                    </div>
                </template>
            </nav>
        </div>
    </header>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            noi_dung_tim: '',
            auth: false,
            name_kh: '',
        }
    },
    mounted() {
        // try reading multiple possible localStorage keys (some parts of app may use different keys)
        this.name_kh = localStorage.getItem('ten_kh') ;
        this.checkLogin();
        // listen for profile updates from Profile component
        this._onUserProfileUpdated = (e) => {
            try {
                const detail = e && e.detail ? e.detail : e;
                const name = (typeof detail === 'string') ? detail : (detail && (detail.name || detail.ten_kh || detail.ho_ten));
                if (name) {
                    this.name_kh = name;
                    try { localStorage.setItem('ten_kh', name); } catch (e) {}
                }
            } catch (err) { /* ignore */ }
        };
        window.addEventListener('user-profile-updated', this._onUserProfileUpdated);
    },
    beforeUnmount() {
        if (this._onUserProfileUpdated) window.removeEventListener('user-profile-updated', this._onUserProfileUpdated);
    },
    watch: {
        // when header input is cleared, restore home (no query)
        noi_dung_tim(val) {
            if (!val) {
                this.clearSearch();
            }
        }
    },
    methods: {
        clearInput() {
            this.noi_dung_tim = '';
            this.clearSearch();
        },
        clearSearch() {
            // navigate to home without query to reset TrangChu
            this.$router.push({ path: '/', query: {} }).catch(() => {});
            try {
                window.dispatchEvent(new CustomEvent('header-search', { detail: '' }));
            } catch (e) {
                var ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('header-search', true, true, '');
                window.dispatchEvent(ev);
            }
        },
        dangXuat() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/dang-xuat', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/khach-hang/dang-nhap')
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        dangXuatAll() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat-tat-ca', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/khach-hang/dang-nhap')
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        timKiem() {
            const q = (this.noi_dung_tim || '').trim();
            // navigate to home with query parameter `q` so TrangChu can read it
            this.$router.push({ path: '/', query: q ? { q } : {} })
                .catch(() => {});
            // also dispatch a window event so the home component updates instantly
            try {
                window.dispatchEvent(new CustomEvent('header-search', { detail: q }));
            } catch (e) {
                // ignore if CustomEvent unsupported
                var ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('header-search', true, true, q);
                window.dispatchEvent(ev);
            }
        },
        checkLogin() {
            axios
                .get('http://127.0.0.1:8000/api/kiem-tra-khachhang', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khach_hang")
                    }
                })
                .then((res) => {
                    if (res.data && res.data.status) {
                        this.auth = true;
                    }
                })
        },
    },
}
</script>
<style></style>
