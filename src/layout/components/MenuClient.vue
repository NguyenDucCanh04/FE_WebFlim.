<template>
    <div class="nav-container primary-menu">
        <div class="mobile-topbar-header">
            <div>
                <img src="/src/IMG/logo.png" class="logo-icon" alt="logo icon">
            </div>
            <div>
                <h4 class="logo-text">KING SHOP</h4>
            </div>
            <div class="toggle-icon ms-auto"><i class='bx bx-arrow-to-left'></i>
            </div>
        </div>
        <nav class="navbar navbar-expand-xl w-100">
            <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li class="nav-item">
                    <a class="nav-link" href="/">
                        <div class="parent-icon"><i class='bx bx-home-circle'></i>
                        </div>
                        <div class="menu-title">Home</div>
                    </a>
                </li>

                <!-- Thể loại: render each as separate nav-item -->
                <template v-for="(t, idx) in visibleTheLoai" :key="t.id || idx">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="`/the-loai/` + t.id">
                            <div class="parent-icon"><span v-html="t.icon_the_loai"></span></div>
                            <div class="menu-title">{{ t.ten_the_loai }}</div>
                        </router-link>
                    </li>
                </template>

                <!-- Existing danh muc items remain -->
                <template v-for="(value, index) in list_danh_muc" :key="index">
                    <li class="nav-item">
                        <router-link :to="`/danh-muc-san-pham/` + value.id + `-` + value.slug_danh_muc">
                            <a class="nav-link" :href="`/danh-muc-san-pham/` + value.id + `-` + value.slug_danh_muc">
                                <div class="parent-icon">
                                    <span v-html="value.icon_danh_muc"></span>
                                </div>
                                <div class="menu-title">{{ value.ten_danh_muc }}</div>
                            </a>
                        </router-link>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list_danh_muc: [],
            list_the_loai: [],
        }
    },
    mounted() {
        this.loadDataDanhMuc();
        this.loadDataTheLoai();
    },
    computed: {
        visibleTheLoai() {
            return (this.list_the_loai || []).filter(t => String(t.trang_thai) === '1');
        }
    },
    methods: {
        loadDataDanhMuc() {
            axios
                .get("http://127.0.0.1:8000/api/danh-muc/data-open")
                .then((res) => {
                    this.list_danh_muc = res.data && res.data.data ? res.data.data : [];
                })
                .catch(err => {
                    console.error('Không thể tải danh mục:', err);
                    this.list_danh_muc = [];
                });
        },
        loadDataTheLoai() {
            axios
                .get("http://127.0.0.1:8000/api/the-loai/data-open")
                .then((res) => {
                    this.list_the_loai = res.data && res.data.data ? res.data.data : [];
                })
                .catch(err => {
                    console.error('Không thể tải thể loại:', err);
                    this.list_the_loai = [];
                });
        },
    },
}
</script>
<style>

</style>