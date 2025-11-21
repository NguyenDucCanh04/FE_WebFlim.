<template>
    <div class="modal fade" id="capnhatDM" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật Thể Loại</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Thể Loại</label>
                        <input v-model="edit_the_loai.ten_the_loai" type="text" class="form-control mt-2">
                    </div>

                    <div class="mb-2">
                        <label>Mô tả</label>
                        <input v-model="edit_the_loai.mo_ta" type="text" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Tình trạng</label>
                        <select v-model="edit_the_loai.trang_thai" class="form-control mt-2">
                            <option value="0">Tạm Tắt</option>
                            <option value="1">Hiển Thị</option>
                        </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capnhatTheLoai()" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Cập
                        nhật</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-5">
            <div class="card">
                <div class="card-header">
                    <h6><b>THÊM MỚI Thể Loại</b></h6>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <label>Tên Thể Loại</label>
                        <input v-model="create_the_loai.ten_the_loai" type="text" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Mô tả</label>
                        <input v-model="create_the_loai.mo_ta" type="text" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Tình trạng</label>
                        <select v-model="create_the_loai.trang_thai" class="form-control mt-2">
                            <option value="0">Tạm Tắt</option>
                            <option value="1">Hiển Thị</option>
                        </select>
                    </div>

                </div>
                <div class="card-footer text-end">
                    <!-- always allow adding, with default trang_thai = 1 -->
                    <button v-on:click="themMoiTheLoai()" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>
        <div class="col-lg-7">
            <div class="card">
                <div class="card-header">
                    <h6><b>DANH SÁCH Thể Loại</b></h6>
                </div>
                <div class="card-body table-responsive">
                    <table class="table table-bordered table-hover ">
                        <thead>
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Tên Thể Loại</th>
                                <th class="text-center">Mô Tả</th>
                                <th class="text-center">Trạng thái</th>
                                <th class="text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(value, index) in list_the_loai" :key="value.id || index">
                                <tr>
                                    <th class="align-middle">{{ index + 1 }}</th>
                                    <td class="align-middle">{{ value.ten_the_loai }}</td>
                                    <td class="align-middle">{{ value.mo_ta }}</td>
                                    <td class="align-middle text-center">
                                        <div class="d-flex justify-content-center align-items-center gap-2">
                                            <button v-on:click="changeTrangThai(value)" v-if="value.trang_thai == 1"
                                                class="btn btn-success btn-sm">Hiển thị</button>
                                            <button v-on:click="changeTrangThai(value)" v-else class="btn btn-danger btn-sm">Tạm tắt</button>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center">
                                        <div class="d-flex justify-content-center align-items-center gap-2">
                                            <button v-on:click="openEdit(value)"
                                                class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                                data-bs-target="#capnhatDM">Cập nhật</button>
                                            <button v-on:click="del_the_loai = value" class="btn btn-danger btn-sm"
                                                data-bs-toggle="modal" data-bs-target="#delModal">Xóa</button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                            <tr v-if="list_the_loai.length === 0">
                                <td colspan="5" class="text-center text-muted">Không có thể loại nào. Vui lòng kiểm tra token hoặc backend.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Thể Loại</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            Bạn có chắc muốn xóa <b class="text-danger">{{ del_the_loai.ten_the_loai }}</b> này
                            không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="xoaTheLoai()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Xác
                            nhận</button>
                    </div>
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
            list_the_loai: [],
            search: '',
            create_the_loai: {
                "ten_the_loai": "",
                "mo_ta": "",
                "trang_thai": "1"

            },
            del_the_loai: {
                "ten_the_loai": "Khóa 18"
            },
            edit_the_loai: {
                "ten_the_loai": "",
                "mo_ta": "",
                "trang_thai": "1",
                "id": null
            },
        }
    },
    mounted() {
        // debug token and auto-load
        const token = localStorage.getItem("token_nhan_vien");
        console.log('[TheLoai] mounted, token_nhan_vien=', token);
        this.layDataTheLoai();
    },
    methods: {

        openEdit(value) {
            // clone to avoid two-way binding before user saves
            this.edit_the_loai = JSON.parse(JSON.stringify(value));
            if (!this.edit_the_loai.trang_thai && this.edit_the_loai.trang_thai !== 0) this.edit_the_loai.trang_thai = '1';
            if (!this.edit_the_loai.id && this.edit_the_loai.id !== 0) this.edit_the_loai.id = value.id || null;
        },

        layDataTheLoai() {
            const token = localStorage.getItem("token_nhan_vien");
            if (!token) {
                console.warn('[TheLoai] token_nhan_vien missing');
                this.list_the_loai = [];
                this.$toast && this.$toast.error('Bạn chưa đăng nhập nhân viên hoặc token thiếu.');
                return;
            }
            axios
                .get("http://127.0.0.1:8000/api/the-loai", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    console.log('[TheLoai] layDataTheLoai response:', res);
                    this.list_the_loai = res.data && res.data.data ? res.data.data : [];
                })
                .catch(err => {
                    console.error('[TheLoai] error loading:', err);
                    this.list_the_loai = [];
                    const msg = err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Không thể tải danh sách thể loại.';
                    this.$toast && this.$toast.error(msg);
                })
        },
        themMoiTheLoai() {
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai", this.create_the_loai, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataTheLoai();
                        // reset create form
                        this.create_the_loai = { ten_the_loai: '', mo_ta: '', trang_thai: '1' };
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        capnhatTheLoai() {
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai-update", this.edit_the_loai, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataTheLoai();
                        // reset edit form
                        this.edit_the_loai = { ten_the_loai: '', mo_ta: '', trang_thai: '1', id: null };
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        xoaTheLoai() {
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai/delete", this.del_the_loai, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataTheLoai();
                        // reset del target
                        this.del_the_loai = { ten_the_loai: '' };
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },


        changeTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/admin/the-loai/doi-trang-thai", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataTheLoai();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
    },
}
</script>
<style></style>