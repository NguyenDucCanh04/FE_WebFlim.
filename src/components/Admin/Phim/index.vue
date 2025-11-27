<template>
    <div class="modal fade" id="themPhim" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm mới phim</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Tên Phim</label>
                                <input v-model="create_phim.ten_phim" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Đạo Diễn</label>
                                <input v-model="create_phim.dao_dien" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Diễn Viên</label>
                                <input v-model="create_phim.dien_vien" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Thời Lượng (phút)</label>
                                <input v-model="create_phim.thoi_luong" type="number" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Năm Sản Xuất</label>
                                <input v-model="create_phim.nam_san_xuat" type="number" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Quốc Gia</label>
                                <input v-model="create_phim.quoc_gia" type="text" class="form-control mt-2">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>URL Phim</label>
                                <input v-model="create_phim.movie_url" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>URL Trailer</label>
                                <input v-model="create_phim.trailer_url" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>URL Poster</label>
                                <input v-model="create_phim.poster_url" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Ngày Tạo</label>
                                <input v-model="create_phim.ngay_tao" type="date" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Ngày Khởi Chiếu</label>
                                <input v-model="create_phim.ngay_khoi_chieu" type="date" class="form-control mt-2">
                                <div class="mb-2">
                                    <label>Trạng Thái Chiếu</label>
                                    <select v-model="create_phim.trang_thai_chieu" class="form-control mt-2">
                                        <option :value="0">Sắp Chiếu</option>
                                        <option :value="1">Đang Chiếu</option>
                                    </select>

                                </div>
                                <div class="mb-2">
                                    <label>Mô Tả</label>
                                    <textarea v-model="create_phim.mo_ta" class="form-control mt-2" cols="30"
                                        rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="themMoiPhim()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Thêm mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="suaPhim" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa thông tin phim</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>Tên Phim</label>
                                <input v-model="edit_phim.ten_phim" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Đạo Diễn</label>
                                <input v-model="edit_phim.dao_dien" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Diễn Viên</label>
                                <input v-model="edit_phim.dien_vien" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Thời Lượng (phút)</label>
                                <input v-model="edit_phim.thoi_luong" type="number" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Năm Sản Xuất</label>
                                <input v-model="edit_phim.nam_san_xuat" type="number" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Quốc Gia</label>
                                <input v-model="edit_phim.quoc_gia" type="text" class="form-control mt-2">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2">
                                <label>URL Phim</label>
                                <input v-model="edit_phim.movie_url" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>URL Trailer</label>
                                <input v-model="edit_phim.trailer_url" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>URL Poster</label>
                                <input v-model="edit_phim.poster_url" type="text" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Ngày Tạo</label>
                                <input v-model="edit_phim.ngay_tao" type="date" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Ngày Khởi Chiếu</label>
                                <input v-model="edit_phim.ngay_khoi_chieu" type="date" class="form-control mt-2">
                            </div>
                            <div class="mb-2">
                                <label>Trạng Thái Chiếu</label>
                                <select v-model="edit_phim.trang_thai_chieu" class="form-control mt-2">
                                    <option :value="0">Sắp Chiếu</option>
                                    <option :value="1">Đang Chiếu</option>
                                </select>

                            </div>
                            <div class="mb-2">
                                <label>Mô Tả</label>
                                <textarea v-model="edit_phim.mo_ta" class="form-control mt-2" cols="30"
                                    rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="suaPhim()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                        nhật</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="delPhim" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Xóa Phim</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Bạn có chắc muốn xóa phim <b class="text-danger">{{ del_phim.ten_phim }}</b> này không?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaPhim()" type="button" class="btn btn-danger"
                        data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="moTaChiTiet" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Mô Tả Chi Tiết Phim</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {{ mo_ta_chi_tiet_phim }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header ">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6><b>DANH SÁCH PHIM</b></h6>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themPhim">Thêm mới
                            phim</button>
                    </div>
                    <div class="input-group mt-3 w-100">
                        <input v-on:keyup.enter="timKiem()" v-model="tim_kiem.noi_dung_tim" type="text"
                            class="form-control search-control border border-2 border-secondary"
                            placeholder="Tìm kiếm phim...">
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left: 15px;"><i
                                class="bx bx-search"></i></span>
                        <button v-on:click="timKiem()" class="btn btn-outline-secondary" type="button"
                            id="button-addon2">Tìm Kiếm</button>
                    </div>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Poster</th>
                                <th class="text-center">Tên Phim</th>
                                <th class="text-center">Đạo Diễn</th>
                                <th class="text-center">Diễn Viên</th>
                                <th class="text-center">Thời Lượng</th>
                                <th class="text-center">Năm SX</th>
                                <th class="text-center">Quốc Gia</th>
                                <th class="text-center">Mô Tả</th>
                                <th class="text-center">Trạng Thái</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_phim" :key="index">
                                <tr>
                                    <th class="align-middle">{{ index + 1 }}</th>
                                    <th class="align-middle text-center">
                                        <img style="max-height: 100px; width: 70px; object-fit: cover;"
                                            v-bind:src="value.poster_url" class="img-fluid rounded" alt="Poster">
                                    </th>
                                    <td class="align-middle text-wrap">{{ value.ten_phim }}</td>
                                    <td class="align-middle text-wrap">{{ value.dao_dien }}</td>
                                    <td class="align-middle text-wrap">{{ value.dien_vien }}</td>
                                    <td class="align-middle text-center">{{ value.thoi_luong }} phút</td>
                                    <td class="align-middle text-center">{{ value.nam_san_xuat }}</td>
                                    <td class="align-middle">{{ value.quoc_gia }}</td>
                                    <td class="align-middle text-center">
                                        <i v-on:click="mo_ta_chi_tiet_phim = value.mo_ta"
                                            class="fa-solid fa-newspaper fa-2xl cursor-pointer" data-bs-toggle="modal"
                                            data-bs-target="#moTaChiTiet"></i>
                                    </td>
                                    <td class="align-middle text-wrap">
                                        <button v-on:click="chuyenTrangThai(value)" v-if="value.trang_thai == 1"
                                            class="btn btn-success text-nowrap mb-2">Hoạt Động</button>
                                        <button v-on:click="chuyenTrangThai(value)" v-else
                                            class="btn btn-danger text-nowrap mb-2">Tạm Ngừng</button>

                                        <button v-on:click="chuyenTrangThaiChieu(value)"
                                            v-if="value.trang_thai_chieu == 1"
                                            class="btn btn-primary text-nowrap mb-2">Đang Chiếu</button>
                                        <button v-on:click="chuyenTrangThaiChieu(value)" v-else
                                            class="btn btn-warning text-nowrap mb-2">Sắp Chiếu</button>

                                    </td>
                                    <td class="align-middle">
                                        <button v-on:click="Object.assign(edit_phim, value)"
                                            class="btn btn-primary me-2 mb-2" data-bs-toggle="modal"
                                            data-bs-target="#suaPhim">Cập nhật</button>
                                        <button v-on:click="del_phim = value" class="btn btn-danger mb-2"
                                            data-bs-toggle="modal" data-bs-target="#delPhim">Xóa</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            list_phim: [],
            create_phim: {
                "ten_phim": "",
                "mo_ta": "",
                "dao_dien": "",
                "dien_vien": "",
                "thoi_luong": "",
                "nam_san_xuat": "",
                "quoc_gia": "",
                "movie_url": "",
                "trailer_url": "",
                "poster_url": "",
                "ngay_tao": "",
                "trang_thai_chieu": 1,
                "ngay_khoi_chieu": ""

            },
            del_phim: {
                "ten_phim": "phim"
            },
            edit_phim: {
                "ten_phim": "",
                "mo_ta": "",
                "dao_dien": "",
                "dien_vien": "",
                "thoi_luong": "",
                "nam_san_xuat": "",
                "quoc_gia": "",
                "movie_url": "",
                "trailer_url": "",
                "poster_url": "",
                "ngay_tao": "",
                "trang_thai_chieu": "",
                "ngay_khoi_chieu": ""
            },
            mo_ta_chi_tiet_phim: '',
            tim_kiem: {},
        }
    },
    mounted() {
        this.layDataPhim();
    },
    methods: {
        timKiem() {
            axios
                .post("http://127.0.0.1:8000/api/phim/search", this.tim_kiem, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status == false) {
                        toaster.error(res.data.message)
                    }
                    this.list_phim = res.data.data;
                });
        },
        chuyenTrangThai(phim) {
            axios.post(
                "http://127.0.0.1:8000/api/admin/phim/chuyen-trang-thai",
                { id: phim.id },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_nhan_vien")
                    }
                }
            )
                .then((res) => {
                    if (res.data.status) {
                        const thong_bao =
                            '<b>Thông báo</b><span style="margin-top: 5px">' +
                            res.data.message +
                            "<span>";
                        this.$toast.success(thong_bao);
                        this.layDataPhim();
                    } else {
                        const thong_bao =
                            '<b>Thông báo</b><span style="margin-top: 5px">' +
                            res.data.message +
                            "<span>";
                        this.$toast.error(thong_bao);
                    }
                });
        },

        chuyenTrangThaiChieu(phim) {
            axios.post(
                "http://127.0.0.1:8000/api/admin/phim/chuyen-trang-thai-chieu",
                { id: phim.id },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_nhan_vien")
                    }
                }
            )
                .then((res) => {
                    const thong_bao =
                        '<b>Thông báo</b><span style="margin-top: 5px">' +
                        res.data.message +
                        "<span>";

                    if (res.data.status) {
                        this.$toast.success(thong_bao);
                        this.layDataPhim();
                    } else {
                        this.$toast.error(thong_bao);
                    }
                });
        },

        layDataPhim() {
            axios
                .get("http://127.0.0.1:8000/api/getDataPhim", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_phim = res.data.data;
                })
        },
        themMoiPhim() {
            const token = localStorage.getItem("token_nhan_vien");
            console.log('Token:', token); // Debug token
            
            axios
                .post("http://127.0.0.1:8000/api/admin/phim/create", this.create_phim, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then((res) => {
                    console.log('Response:', res.data); // Debug response
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataPhim();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error.response?.data); // Debug error
                    if (error.response?.status === 403) {
                        this.$toast.error('Bạn không có quyền thực hiện chức năng này!');
                    } else if (error.response?.status === 401) {
                        this.$toast.error('Bạn chưa đăng nhập!');
                    } else {
                        this.$toast.error('Có lỗi xảy ra!');
                    }
                });
        },
        suaPhim() {
            axios
                .post("http://127.0.0.1:8000/api/admin/phim/update", this.edit_phim, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataPhim();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        xoaPhim() {
            axios
                .post("http://127.0.0.1:8000/api/admin/phim/delete", this.del_phim, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataPhim();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
    },
}
</script>
<style>
.cursor-pointer {
    cursor: pointer;
}
</style>