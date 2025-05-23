<!-- 二维码登录组件 -->
<script lang="ts" setup>
const emit = defineEmits(['refresh']);

const qrCodeUrl = ref('https://example.com/generate-qr'); // 实际需动态生成
const countdown = ref(60);
const isExpired = ref(false);
let timer: number | null = null;

function startCountdown() {
  timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      isExpired.value = true;
      clearInterval(timer!);
    }
  }, 1000);
}

function handleRefresh() {
  isExpired.value = false;
  countdown.value = 60;
  emit('refresh');
  startCountdown();
}

onMounted(() => {
  startCountdown();
});

onBeforeUnmount(() => {
  if (timer)
    clearInterval(timer);
});
</script>

<template>
  <div class="qr-wrapper">
    <img v-show="!isExpired" :src="qrCodeUrl" alt="登录二维码" class="qr-img">
    <div v-show="isExpired" class="expired-overlay">
      <div class="expired-content">
        <p>二维码已过期</p>
        <button class="refresh-btn" @click="handleRefresh">
          刷新二维码
        </button>
      </div>
    </div>
    <div v-show="!isExpired" class="countdown">
      剩余时间：{{ countdown }}秒
    </div>
  </div>
</template>

<style scoped>
.qr-wrapper {
  position: relative;
  text-align: center;
}

.qr-img {
  width: 240px;
  height: 240px;
  margin-bottom: 24px;
}

.expired-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.expired-content {
  text-align: center;
}

.refresh-btn {
  margin-top: 16px;
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.countdown {
  color: #606266;
}
</style>
