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
        path: '/admin/bai-viet',
        component: () => import('../components/Admin/BaiViet/index.vue'),
        beforeEnter: kiemTraAdmin,

    },
    {
        path: '/khach-hang/profile',
        component: () => import('../components/KhachHang/Profile/index.vue'),
        meta: { layout: 'client' },
        beforeEnter: kiemTraKhachHang,
    },
     {
        path: '/admin/profile',
        component: () => import('../components/Admin/Profile/index.vue'), 
        beforeEnter: kiemTraAdmin,
    },
    {
        path: '/chi-tiet-phim/:id',
        component: () => import('../components/TrangChu/ChiTietPhim/index.vue'),
        meta: { layout: 'client' },
        props: true
    },
    {
        path: '/chi-tiet-bai-viet/:id',
        component: () => import('../components/TrangChu/ChiTietBaiViet/index.vue'),
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
    },
    {
        path: '/khach-hang/quen-mat-khau',
        component: () => import('../components/KhachHang/QuenMatKhau/index.vue'),
        meta: { layout: 'blank' }
    },
     {
        path: '/khach-hang/doi-mat-khau/:id_khach_hang',
        component: () => import('../components/KhachHang/LayLaiMatKhau/index.vue'),
        meta: { layout: 'blank' },
        props: true
    },
     {
        path: '/khach-hang/quen-mat-khau',
        component: () => import('../components/KhachHang/QuenMatKhau/index.vue'),
        meta: { layout: 'blank' }
    },
    {
        path: '/khach-hang/lay-lai-mat-khau',
        component: () => import('../components/KhachHang/LayLaiMatKhau/index.vue'),
        meta: { layout: 'blank' }
    },
      {
        path: '/admin/phim',
        component: () => import('../components/Admin/Phim/index.vue'),
        beforeEnter: kiemTraAdmin,
    },
    {
        path: '/admin/phan-quyen',
        component: () => import('../components/Admin/PhanQuyen/index.vue'),
        beforeEnter: kiemTraAdmin,
    },
    {
        path: '/admin/khach-hang',
        component: () => import('../components/Admin/KhachHang/index.vue'),
        beforeEnter: kiemTraAdmin,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router