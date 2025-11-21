import { createRouter, createWebHistory } from "vue-router"; 
import kiemTraKhachHang from "./kiemTraKhachHang";
import kiemTraAdmin from "./kiemTraAdmin";
const routes = [
    {
        path: '/',
        component: () => import('../components/TrangChu/index.vue'),
        meta: { layout: 'client' }
    },
    {
        path: '/khach-hang/dang-ky',
        component: () => import('../components/KhachHang/DangKy/index.vue'),
        meta: { layout: 'blank' }
    },
    {
        path: '/admin/dang-nhap',
        component: () => import('../components/Admin/DangNhap/index.vue'),
        meta: { layout: 'blank' }
    },

    {
        path: '/khach-hang/dang-nhap',
        component: () => import('../components/KhachHang/DangNhap/index.vue'),
        meta: { layout: 'blank' }
    },
     {
        path: '/admin/the-loai',
        component: () => import('../components/Admin/TheLoai/index.vue'),
        beforeEnter: kiemTraAdmin,
       
    },
    {
        path: '/khach-hang/profile',
        component: () => import('../components/KhachHang/Profile/index.vue'),
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang,
    },
     {
        path: '/chi-tiet-phim/:id',
        component: () => import('../components/TrangChu/ChiTietPhim/index.vue'),
        meta: { layout: 'client' },
        props: true
    },
    {
        path: '/dat-ve/:id',
        component: () => import('../components/KhachHang/DatVe/index.vue'),
        meta: { layout: 'client' },
        props: true,
        beforeEnter: kiemTraKhachHang
    }, 
    // Route to list films by category (used by MenuClient links like /the-loai/123)
    {
        path: '/the-loai/:id_the_loai',
        component: () => import('../components/TrangChu/TheLoaiPhim/index.vue'),
        meta: { layout: 'client' },
        props: true
    },
    {
        path: '/the-loai-phim/:id_the_loai-:id_phim',
        component: () => import('../components/TrangChu/TheLoaiPhim/index.vue'),
        meta: { layout: 'client' },
        props: true
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router