<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs nav-primary" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-user font-18 me-1"></i></div>
                                    <div class="tab-title">Profile</div>
                                </div>
                            </a>
                        </li>

                        <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon"><i class="fa-solid fa-lock font-18 me-1"></i></div>
                                    <div class="tab-title">Đổi mật khẩu</div>
                                </div>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content py-3">

                        <!-- PROFILE -->
                        <div class="tab-pane fade show active" id="primaryhome" role="tabpanel">
                            <div class="row">
                                <div class="col-lg-4 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img src="https://jbagy.me/wp-content/uploads/2025/03/hinh-anh-cute-avatar-vo-tri-3.jpg"
                                                    style="width: 140px; height: 140px;"
                                                    class="rounded-circle p-1 bg-primary">

                                                <div class="mt-3">
                                                    <h4>{{ profile.ho_ten }}</h4>
                                                    <p class="text-secondary mb-1">Khách Hàng</p>
                                                    <p class="text-muted font-size-sm">Đà Nẵng</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-8 d-flex">
                                    <div class="card flex-fill">
                                        <div class="card-body">

                                            <div class="row mb-3">
                                                <div class="col-lg-3"><h6 class="mb-0">Họ và Tên</h6></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="profile.ho_ten" type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-lg-3"><h6 class="mb-0">Ngày Sinh</h6></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="profile.ngay_sinh" type="date" class="form-control">
                                                </div>
                                            </div>

                                            <div class="row mb-3">
                                                <div class="col-lg-3"><h6 class="mb-0">Số Điện Thoại</h6></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <input v-model="profile.so_dien_thoai" type="text" class="form-control">
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-lg-3"></div>
                                                <div class="col-lg-9 text-secondary">
                                                    <button @click="updateProfile()" class="btn btn-primary px-4">Lưu</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- ĐỔI MẬT KHẨU -->
                        <div class="tab-pane fade" id="primarycontact" role="tabpanel">

                            <h4>Thay đổi mật khẩu</h4>
                            <p>Quản lý mật khẩu để bảo mật tài khoản</p>
                            <hr>

                            <div class="row mb-2">
                                <div class="col-lg-2"><label>Mật khẩu cũ</label></div>
                                <div class="col-lg-3">
                                    <input v-model="old_password" type="password"
                                        class="form-control" placeholder="Nhập mật khẩu cũ">
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-lg-2"><label>Mật khẩu mới</label></div>
                                <div class="col-lg-3">
                                    <input v-model="new_password" type="password"
                                        class="form-control" placeholder="Nhập mật khẩu mới">
                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="col-lg-2"><label>Nhập lại mật khẩu mới</label></div>
                                <div class="col-lg-3">
                                    <input v-model="confirm_password" type="password"
                                        class="form-control" placeholder="Nhập lại mật khẩu mới">
                                </div>
                            </div>

                            <button class="btn btn-primary" @click="changePassword()">Lưu</button>

                        </div>

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
            profile: {},

            // đổi mật khẩu
            old_password: "",
            new_password: "",
            confirm_password: "",
        };
    },

    mounted() {
        this.getDataProfile();
    },

    methods: {
        getDataProfile() {
            axios.get("http://127.0.0.1:8000/api/khach-hang/profile/data", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
            }).then(res => {
                this.profile = res.data.data;
            });
        },

        updateProfile() {
            axios.post("http://127.0.0.1:8000/api/khach-hang/profile/update", this.profile, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
            }).then(res => {
                let tb = `<b>Thông báo</b><span>${res.data.message}</span>`;
                res.data.status ? this.$toast.success(tb) : this.$toast.error(tb);
                if (res.data.status) this.getDataProfile();
            });
        },

        // ------------------- ĐỔI MẬT KHẨU PROFILE -------------------
        changePassword() {
            if (!this.old_password || !this.new_password || !this.confirm_password) {
                this.$toast.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (this.new_password !== this.confirm_password) {
                this.$toast.error("Mật khẩu xác nhận không trùng khớp!");
                return;
            }

            axios.post(
                "http://127.0.0.1:8000/api/khach-hang/doi-mat-khau/profile",
                {
                    old_password: this.old_password,
                    new_password: this.new_password,
                    confirm_password: this.confirm_password
                },
                {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token_khach_hang") }
                }
            )
            .then(res => {
                if (res.data.status) {
                    this.$toast.success(res.data.message);

                    this.old_password = "";
                    this.new_password = "";
                    this.confirm_password = "";
                } else {
                    this.$toast.error(res.data.message);
                }
            })
            .catch(() => {
                this.$toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            });
        }

    }
};
</script>

<style></style>
