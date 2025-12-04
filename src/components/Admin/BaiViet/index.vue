<template>
    <!-- ======================= MODAL THÊM BÀI VIẾT ======================= -->
    <div class="modal fade" id="themBaiViet" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Thêm bài viết</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tiêu Đề</label>
                        <input v-model="create_bv.tieu_de" type="text" class="form-control">
                    </div>

                    <div class="mb-2">
                        <label>Nội Dung</label>
                        <textarea v-model="create_bv.noi_dung" class="form-control" rows="4"></textarea>
                    </div>

                    <div class="mb-2">
                        <label>Ảnh Đại Diện (URL)</label>
                        <input v-model="create_bv.anh_dai_dien" type="text" class="form-control">
                    </div>

                    <div class="mb-2">
                        <label>Ngày Đăng</label>
                        <input v-model="create_bv.ngay_dang" type="date" class="form-control">
                    </div>

                    <div class="mb-2">
                        <label>Tác Giả</label>
                        <input v-model="create_bv.tac_gia" type="text" class="form-control">
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button class="btn btn-primary" @click="themBaiViet()" data-bs-dismiss="modal">Thêm mới</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ======================= MODAL SỬA BÀI VIẾT ======================= -->
    <div class="modal fade" id="suaBaiViet" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Sửa bài viết</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tiêu Đề</label>
                        <input v-model="edit_bv.tieu_de" type="text" class="form-control">
                    </div>

                    <div class="mb-2">
                        <label>Nội Dung</label>
                        <textarea v-model="edit_bv.noi_dung" class="form-control" rows="4"></textarea>
                    </div>

                    <div class="mb-2">
                        <label>Ảnh Đại Diện</label>
                        <input v-model="edit_bv.anh_dai_dien" type="text" class="form-control">
                    </div>

                    <div class="mb-2">
                        <label>Ngày Đăng</label>
                        <input v-model="edit_bv.ngay_dang" type="date" class="form-control">
                    </div>

                    <div class="mb-2">
                        <label>Tác Giả</label>
                        <input v-model="edit_bv.tac_gia" type="text" class="form-control">
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button class="btn btn-primary" @click="capNhatBaiViet()" data-bs-dismiss="modal">Cập nhật</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ======================= MODAL XÓA ======================= -->
    <div class="modal fade" id="xoaBaiViet" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Xóa Bài Viết</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    Bạn có chắc muốn xóa bài viết:
                    <b class="text-danger">{{ del_bv.tieu_de }}</b> ?
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button class="btn btn-danger" @click="xoaBaiViet()" data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ======================= MODAL NỘI DUNG CHI TIẾT ======================= -->
    <div class="modal fade" id="moTaChiTiet" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5>Nội dung bài viết</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body" style="white-space: pre-line; font-size: 16px;">
                    {{ mo_ta_chi_tiet }}
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ======================= DANH SÁCH BÀI VIẾT ======================= -->
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h5><b>Danh sách bài viết</b></h5>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#themBaiViet">Thêm mới</button>
        </div>

        <div class="card-body">

            <!-- TÌM KIẾM -->
            <div class="input-group mb-3">
                <input v-model="tim_kiem.noi_dung_tim"
                       @keyup.enter="timKiem()"
                       type="text"
                       class="form-control"
                       placeholder="Tìm kiếm bài viết...">
                <button class="btn btn-outline-secondary" @click="timKiem()">Tìm</button>
            </div>

            <!-- TABLE -->
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ảnh</th>
                        <th>Tiêu Đề</th>
                        <th>Tác Giả</th>
                        <th>Ngày Đăng</th>
                        <th>Nội Dung</th>
                        <th>Trạng Thái</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in list_baiviet" :key="index">
                        <td>{{ index + 1 }}</td>

                        <td>
                            <img :src="item.anh_dai_dien" style="width:70px;height:70px;object-fit:cover;">
                        </td>

                        <td class="text-wrap">{{ item.tieu_de }}</td>
                        <td>{{ item.tac_gia }}</td>
                        <td>{{ item.ngay_dang }}</td>

                        <td class="text-center">
                            <i class="fa-solid fa-newspaper fa-xl cursor-pointer"
                               @click="mo_ta_chi_tiet = item.noi_dung"
                               data-bs-toggle="modal"
                               data-bs-target="#moTaChiTiet"></i>
                        </td>

                        <td>
                            <button class="btn"
                                :class="item.trang_thai == 1 ? 'btn-success' : 'btn-danger'"
                                @click="chuyenTrangThai(item)">
                                {{ item.trang_thai == 1 ? 'Hiển Thị' : 'Tạm Tắt' }}
                            </button>
                        </td>

                        <td>
                            <button class="btn btn-primary me-2"
                                @click="Object.assign(edit_bv, item)"
                                data-bs-toggle="modal"
                                data-bs-target="#suaBaiViet">
                                Sửa
                            </button>

                            <button class="btn btn-danger"
                                @click="del_bv = item"
                                data-bs-toggle="modal"
                                data-bs-target="#xoaBaiViet">
                                Xóa
                            </button>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            list_baiviet: [],

            create_bv: {
                tieu_de: "",
                noi_dung: "",
                anh_dai_dien: "",
                ngay_dang: "",
                tac_gia: "",
            },

            edit_bv: {},

            del_bv: {
                tieu_de: ""
            },

            tim_kiem: {
                noi_dung_tim: ""
            },

            mo_ta_chi_tiet: "",
        };
    },

    mounted() {
        this.layDanhSach();
    },

    methods: {
        layDanhSach() {
            axios.get("http://127.0.0.1:8000/api/bai-viet")
                .then(res => {
                    this.list_baiviet = res.data.data;
                });
        },

        timKiem() {
            axios.get("http://127.0.0.1:8000/api/bai-viet/search", {
                params: this.tim_kiem
            })
                .then(res => {
                    this.list_baiviet = res.data.data;
                });
        },

        themBaiViet() {
            axios.post("http://127.0.0.1:8000/api/bai-viet/create", this.create_bv)
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDanhSach();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        },

        capNhatBaiViet() {
            axios.post("http://127.0.0.1:8000/api/bai-viet/update", this.edit_bv)
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDanhSach();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        },

        xoaBaiViet() {
            axios.post("http://127.0.0.1:8000/api/bai-viet/delete", this.del_bv)
                .then(res => {
                    if (res.data.status) {
                        this.$toast.success(res.data.message);
                        this.layDanhSach();
                    } else {
                        this.$toast.error(res.data.message);
                    }
                });
        },

        chuyenTrangThai(item) {
            axios.post("http://127.0.0.1:8000/api/bai-viet/trang-thai", { id: item.id })
                .then(res => {
                    this.$toast.success(res.data.message);
                    this.layDanhSach();
                });
        },
    },
};
</script>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
