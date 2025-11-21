<template>
  <div class="chatbox-wrapper">
    <div class="chatbox-header">
      <h5>Assistant</h5>
      <button class="btn btn-sm btn-link" @click="toggleOpen">{{ open ? 'Ẩn' : 'Chat' }}</button>
    </div>
    <div v-if="open" class="chatbox-body">
      <div class="messages" ref="messagesEl">
        <div v-for="(m, idx) in messages" :key="idx" class="message" :class="m.role">
          <div class="msg-content" v-html="m.content"></div>
          <div v-if="m.retrieved && m.retrieved.length" class="retrieved">
            <div v-for="r in m.retrieved" :key="r.id" class="retrieved-item">
              <a :href="r.url">{{ r.title || (r.metadata && r.metadata.title) || 'Tài liệu' }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="chatbox-input d-flex mt-2">
        <input v-model="query" @keyup.enter="send" class="form-control me-2" placeholder="Hỏi tôi về phim, thể loại...">
        <button class="btn btn-primary" @click="send" :disabled="loading">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      open: true,
      query: '',
      messages: [],
      loading: false,
    }
  },
  methods: {
    toggleOpen() { this.open = !this.open },
    scrollBottom() {
      this.$nextTick(() => {
        const el = this.$refs.messagesEl;
        if (el) el.scrollTop = el.scrollHeight;
      })
    },
    async send() {
      const q = (this.query || '').trim();
      if (!q) return;
      this.messages.push({ role: 'user', content: q });
      this.loading = true;
      this.query = '';
      try {
        const res = await axios.post('/api/chat/respond', { q });
        if (res && res.data) {
          this.messages.push({ role: 'assistant', content: res.data.answer || 'Không có trả lời', retrieved: res.data.retrieved || [] });
        } else {
          this.messages.push({ role: 'assistant', content: 'Lỗi server' });
        }
      } catch (err) {
        console.error(err);
        this.messages.push({ role: 'assistant', content: 'Lỗi khi gọi API' });
      } finally {
        this.loading = false;
        this.scrollBottom();
      }
    }
  }
}
</script>

<style scoped>
.chatbox-wrapper { position: fixed; right: 20px; bottom: 20px; width: 320px; z-index: 2000; }
.chatbox-header { background: #fff; padding: 8px 12px; border-radius: 8px 8px 0 0; display:flex; justify-content:space-between; align-items:center; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
.chatbox-body { background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 6px 20px rgba(0,0,0,0.12); padding:12px; max-height: 480px; display:flex; flex-direction:column; }
.messages { overflow:auto; height: 320px; }
.message { margin-bottom: 8px; }
.message.user .msg-content { background: #e9f5ff; padding:8px 10px; border-radius: 8px; display:inline-block; }
.message.assistant .msg-content { background: #f3f4f6; padding:8px 10px; border-radius: 8px; display:inline-block; }
.retrieved { margin-top:6px; font-size: 0.85rem; color: #555; }
.retrieved-item a { color: #0d6efd; }
</style>
