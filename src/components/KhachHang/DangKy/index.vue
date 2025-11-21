<template>
  <div class="register-page d-flex align-items-center justify-content-center py-5">
    <div class="register-card shadow-sm rounded-4 overflow-hidden">
      <div class="row g-0">
        <div class="col-md-5 d-none d-md-flex bg-cover align-items-center justify-content-center">
          <div class="overlay-text text-center px-3 text-white">
            <img src="/src/IMG/logo.png" width="120" alt="logo" class="mb-3" />
            <h4 class="mb-1">Chào mừng bạn</h4>
            <p class="mb-0">Tạo tài khoản để đặt vé và nhận ưu đãi</p>
          </div>
        </div>

        <div class="col-md-7 p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
             <div class="flex-grow-1 text-center">
              <h2 class="mb-0">Đăng Ký</h2>

            </div>
          </div>

          

          <div class="form-body">
            <form class="row g-3">
              <div class="col-12">
                <label class="form-label">Họ Và Tên</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-user"></i></span>
                  <input type="text" v-model="khach_hang_create.ho_ten" class="form-control form-control-lg" placeholder="Nhập vào họ và tên">
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">Email</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-envelope"></i></span>
                  <input type="email" v-model="khach_hang_create.email" class="form-control form-control-lg" placeholder="Nhập vào Email">
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">Số Điện Thoại</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-phone"></i></span>
                  <input type="text" v-model="khach_hang_create.so_dien_thoai" class="form-control form-control-lg" placeholder="Nhập vào Số Điện Thoại">
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">Giới Tính</label>
                <select v-model="khach_hang_create.gioi_tinh" class="form-select form-select-lg">
                  <option value="1">Nam</option>
                  <option value="0">Nữ</option>
                  <option value="2">Khác</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">Ngày Sinh</label>
                <input type="date" v-model="khach_hang_create.ngay_sinh" class="form-control form-control-lg">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">Mật Khẩu</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-lock"></i></span>
                  <input type="password" v-model="khach_hang_create.password" class="form-control form-control-lg" placeholder="Nhập vào Mật Khẩu">
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">Nhập Lại Mật Khẩu</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-lock-open"></i></span>
                  <input type="password" v-model="khach_hang_create.re_password" class="form-control form-control-lg" placeholder="Nhập lại Mật Khẩu">
                </div>
              </div>

              <div class="col-12">
                <div class="d-grid">
                  <button type="button" v-on:click="actionDangKy()" class="btn btn-primary btn-lg">
                    <i class="bx bx-user-plus me-2"></i> Đăng Kí
                  </button>
                </div>
              </div>

              <div class="col-12 text-center">
                <p class="mb-0">Bạn đã có tài khoản? <router-link to="/khach-hang/dang-nhap">Đăng Nhập</router-link></p>
              </div>
            </form>
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
            khach_hang_create: {}
        }
    },
    mounted() {

    },
    methods: {
        actionDangKy() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/dang-ky', this.khach_hang_create)
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.khach_hang_create = {};
                        this.$router.push('/khach-hang/dang-nhap');
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                        this.$router.push('/khach-hang/dang-nhap');
                    }
                })
                .catch((errors) => {
                    const listErrors = errors.response.data.errors;
                    Object.values(listErrors).forEach((value) => {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + value + '<span>';
                        this.$toast.error(thong_bao);
                    })
                });
        },


    },
}
</script>

<style scoped>

</style>