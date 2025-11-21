<template>
  <div class="login-page d-flex align-items-center justify-content-center py-5">
    <div class="login-card shadow-sm rounded-4 overflow-hidden">
      <div class="row g-0">
        <div class="col-md-5 d-none d-md-flex bg-cover align-items-center justify-content-center">
          <div class="overlay-text text-center px-3 text-white">
            <img src="/src/IMG/logo.png" width="120" alt="logo" class="mb-3" />
            <h4 class="mb-1">WedFilm</h4>
            <p class="mb-0">Đặt vé nhanh — Trải nghiệm rạp tại nhà</p>
          </div>
        </div>

        <div class="col-md-7 p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="flex-grow-1 text-center">
              <h2 class="mb-0">Đăng Nhập</h2>
              
            </div>
           
          </div>

          <div class="social-login mb-3">
            <button class="btn btn-outline-danger w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
              <i class="bx bxl-google"></i> Đăng nhập bằng Google
            </button>
            <button class="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
              <i class="bx bxl-facebook-square"></i> Đăng nhập bằng Facebook
            </button>
          </div>

          <div class="login-separater text-center my-3">
            <small class="text-muted px-2 bg-white">hoặc</small>
            <hr />
          </div>

          <div class="form-body">
            <form class="row g-3">
              <div class="col-12">
                <label class="form-label">Email</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-envelope"></i></span>
                  <input type="email" v-model="khach_hang.email" class="form-control form-control-lg" placeholder="Nhập vào Email">
                </div>
              </div>

              <div class="col-12">
                <label class="form-label">Mật Khẩu</label>
                <div class="input-group input-group-lg">
                  <span class="input-group-text"><i class="bx bx-lock"></i></span>
                  <input type="password" v-model="khach_hang.password" class="form-control form-control-lg" placeholder="Nhập vào Mật Khẩu">
                </div>
              </div>

              <div class="col-12 d-flex justify-content-between align-items-center">
                <div>
                  <input class="form-check-input me-2" type="checkbox" id="remember" />
                  <label class="form-check-label" for="remember">Ghi nhớ</label>
                </div>
                <div>
                  <router-link to="/khach-hang/quen-mat-khau" class="small">Quên mật khẩu?</router-link>
                </div>
              </div>

              <div class="col-12">
                <div class="d-grid">
                  <button type="button" @click="actionDangNhap" class="btn btn-primary btn-lg">
                    <i class="bx bx-user me-2"></i> Đăng Nhập
                  </button>
                </div>
              </div>

              <div class="col-12 text-center">
                <p class="mb-0">Bạn chưa có tài khoản? <router-link to="/khach-hang/dang-ky">Đăng Ký</router-link></p>
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
            khach_hang: {
                email: "",
                password: ""
            }

        }
    },

    methods: {
        actionDangNhap() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/dang-nhap', this.khach_hang)
                .then((res) => {
                    if (res.data.status) {
                        let thong_bao = `<b>Thông báo</b><span style="margin-top: 5px">${res.data.message}</span>`;
                        this.$toast.success(thong_bao);

                        // reset form
                        this.khach_hang = {};

                        // lưu token
                        localStorage.setItem('token_khach_hang', res.data.token);
                        localStorage.setItem('ten_kh', res.data.ten_kh);
                        this.$router.push('/');
                    } else {
                        let thong_bao = `<b>Thông báo</b><span style="margin-top: 5px">${res.data.message}</span>`;
                        this.$toast.error(thong_bao);
                    }
                })
                .catch((errors) => {
                    if (errors.response?.data?.errors) {
                        Object.values(errors.response.data.errors).forEach((value) => {
                            let thong_bao = `<b>Thông báo</b><span style="margin-top: 5px">${value}</span>`;
                            this.$toast.error(thong_bao);
                        });
                    }
                });
        }
    }
}
</script>

<style scoped>

</style>
