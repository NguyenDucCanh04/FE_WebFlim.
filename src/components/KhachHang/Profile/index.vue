<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <img :src="avatarSrc" class="rounded-circle mb-3" alt="avatar" width="120" height="120" />
            <h5 class="card-title">{{ profile.ho_ten || 'Khách hàng' }}</h5>
            <p class="text-muted">{{ profile.email }}</p>
            <div class="d-grid gap-2">
              <button class="btn btn-primary" @click="onEditProfile">Chỉnh sửa</button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <ul class="nav nav-tabs mb-3" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link" :class="{active: activeTab==='profile'}" @click="activeTab='profile'">Profile</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" :class="{active: activeTab==='addresses'}" @click="activeTab='addresses'">Địa chỉ nhận hàng</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" :class="{active: activeTab==='password'}" @click="activeTab='password'">Đổi mật khẩu</button>
              </li>
            </ul>

            <div v-if="activeTab==='profile'">
              <form @submit.prevent="updateProfile">
                <div class="mb-3">
                  <label class="form-label">Họ và tên</label>
                  <input v-model="form.ho_ten" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input v-model="form.email" type="email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Số điện thoại</label>
                  <input v-model="form.so_dien_thoai" type="text" class="form-control" />
                </div>

                <div class="d-flex gap-2">
                  <button class="btn btn-success" type="submit" :disabled="saving">Lưu thay đổi</button>
                  <button class="btn btn-outline-secondary" type="button" @click="resetForm" :disabled="saving">Hủy</button>
                </div>
              </form>
            </div>

            <div v-else-if="activeTab==='addresses'">
              <p class="text-muted">Quản lý địa chỉ nhận hàng (chức năng có thể bổ sung sau).</p>
              <ul class="list-group">
                <li v-for="(a, idx) in addresses" :key="idx" class="list-group-item d-flex justify-content-between align-items-start">
                  <div>
                    <div class="fw-bold">{{ a.ten }}</div>
                    <div class="small">{{ a.dia_chi }}</div>
                  </div>
                  <div>
                    <button class="btn btn-sm btn-danger" @click="deleteAddress(idx)">Xóa</button>
                  </div>
                </li>
                <li v-if="addresses.length===0" class="list-group-item text-center text-muted">Chưa có địa chỉ</li>
              </ul>
            </div>

            <div v-else-if="activeTab==='password'">
              <form @submit.prevent="changePassword">
                <div class="mb-3">
                  <label class="form-label">Mật khẩu hiện tại</label>
                  <input v-model="passwords.current" type="password" class="form-control" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Mật khẩu mới</label>
                  <input v-model="passwords.new" type="password" class="form-control" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Xác nhận mật khẩu mới</label>
                  <input v-model="passwords.confirm" type="password" class="form-control" />
                </div>
                <button class="btn btn-primary">Đổi mật khẩu</button>
              </form>
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
  name: 'ProfilePage',
  data() {
    return {
      profile: {},
      form: {
        ho_ten: '',
        email: '',
        so_dien_thoai: '',
      },
      addresses: [],
      activeTab: 'profile',
      saving: false,
      passwords: {
        current: '',
        new: '',
        confirm: '',
      },
    };
  },
  computed: {
    avatarSrc() {
      // placeholder avatar - replace with real avatar field if available
      return '/src/IMG/avatar.jpg';
    },
  },
  mounted() {
    this.getDataProfile();
    window.addEventListener('user-profile-updated', this.getDataProfile);
  },
  beforeUnmount() {
    window.removeEventListener('user-profile-updated', this.getDataProfile);
  },
  methods: {
    async getDataProfile() {
      try {
        const token = localStorage.getItem('token_khach_hang');
        const res = await axios.get('http://127.0.0.1:8000/api/khach-hang/profile/data', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res && res.data && res.data.data) {
          this.profile = res.data.data;
          this.form.ho_ten = this.profile.ho_ten || this.profile.ho_va_ten || '';
          this.form.email = this.profile.email || '';
          this.form.so_dien_thoai = this.profile.so_dien_thoai || '';
          // populate addresses if exists
          this.addresses = this.profile.dia_chi || [];
          // keep header name in sync in case load happens after login
          if (this.form.ho_ten) {
            localStorage.setItem('ten_kh', this.form.ho_ten);
            window.dispatchEvent(new Event('user-profile-updated'));
          }
        }
      } catch (err) {
        // silent fail - user may be unauthenticated
        console.error('getDataProfile error', err?.response || err);
      }
    },

    resetForm() {
      this.form.ho_ten = this.profile.ho_ten || this.profile.ho_va_ten || '';
      this.form.email = this.profile.email || '';
      this.form.so_dien_thoai = this.profile.so_dien_thoai || '';
    },

    async updateProfile() {
      // basic client-side validation
      if (!this.form.ho_ten || !this.form.email) {
        this.showToast('error', 'Vui lòng điền tên và email');
        return;
      }

      this.saving = true;
      try {
        const token = localStorage.getItem('token_khach_hang');
        const res = await axios.post('http://127.0.0.1:8000/api/khach-hang/profile/update', {
          ho_ten: this.form.ho_ten,
          email: this.form.email,
          so_dien_thoai: this.form.so_dien_thoai,
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res && res.data && res.data.status) {
          this.showToast('success', res.data.message || 'Cập nhật thành công');

          // update local state with returned data if present
          if (res.data.data) {
            this.profile = res.data.data;
            this.form.ho_ten = this.profile.ho_ten || this.profile.ho_va_ten || this.form.ho_ten;
            // sync header name
            localStorage.setItem('ten_kh', this.form.ho_ten);
            // notify header and other parts
            window.dispatchEvent(new Event('user-profile-updated'));
          }
        } else {
          this.showToast('error', res.data?.message || 'Cập nhật thất bại');
        }
      } catch (err) {
        console.error('updateProfile error', err?.response || err);
        const message = err?.response?.data?.message || 'Lỗi khi cập nhật';
        this.showToast('error', message);
      } finally {
        this.saving = false;
      }
    },

    deleteAddress(idx) {
      this.addresses.splice(idx, 1);
      this.showToast('success', 'Đã xóa địa chỉ');
    },

    async changePassword() {
      if (!this.passwords.new || this.passwords.new !== this.passwords.confirm) {
        this.showToast('error', 'Mật khẩu xác nhận không khớp');
        return;
      }
      // For now, call an API if backend supports change-password endpoint
      this.showToast('success', 'Yêu cầu đổi mật khẩu đã được gửi (chức năng chưa bật)');
    },

    onEditProfile() {
      this.activeTab = 'profile';
    },

    showToast(type, message) {
      // prefer this.$toaster if plugin registered
      if (this.$toaster && typeof this.$toaster.show === 'function') {
        if (type === 'success') this.$toaster.show(message, { type: 'success' });
        else this.$toaster.show(message, { type: 'danger' });
        return;
      }

      // global fallback: if window.toastr exists
      if (window.toastr) {
        if (type === 'success') window.toastr.success(message);
        else window.toastr.error(message);
        return;
      }

      // last fallback: native alert
      alert(message);
    },
  },
};
</script>

<style scoped>
img.rounded-circle {
  object-fit: cover;
}
</style>