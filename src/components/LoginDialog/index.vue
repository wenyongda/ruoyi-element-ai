<!-- 优化高度稳定性的毛玻璃弹框组件 -->
<script lang="ts" setup>
import { ref } from 'vue';
import logoPng from '@/assets/images/logo.png';
import QrCodeLogin from './components/QrCodeLogin/index.vue';

const isQrMode = ref(false);
const isDialogVisible = ref(true);

function toggleLoginMode() {
  isQrMode.value = !isQrMode.value;
}

function refreshQr() {
  console.log('Refreshing QR code');
}
</script>

<template>
  <div v-show="isDialogVisible" class="mask">
    <div class="glass-dialog">
      <div class="left-section">
        <div class="logo">
          <img :src="logoPng" alt="通义" class="logo-img">
        </div>
        <div class="ad-banner">
          <h3>下载豆包电脑版</h3>
          <p>你的全能AI助手，助力每日工作学习</p>
          <button class="download-btn">
            下载电脑版
          </button>
        </div>
      </div>
      <div class="right-section">
        <div class="mode-toggle" @click="toggleLoginMode">
          {{ isQrMode ? "切换到账号登录" : "切换到扫码登录" }}
        </div>
        <div class="content-wrapper">
          <div v-if="!isQrMode" class="form-container">
            <div class="form-box">
              <slot name="form" />
            </div>
          </div>
          <div v-else class="qr-container">
            <QrCodeLogin @refresh="refreshQr" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-dialog {
  display: flex;
  width: 800px;
  height: 500px; /* 固定高度 */
  background-color: #ffffff;
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 90%;
  /* 移除max-height限制，保持固定高度 */
}

.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #f0f5ff, #e6f0ff);
  border-radius: 24px;
}

.right-section {
  flex: 1;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

/* 内容包装器：用于控制滚动 */
.content-wrapper {
  flex: 1;
  overflow-y: auto; /* 内容过多时滚动 */
  padding: 8px 0;
}

.mode-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: #606266;
  transition: color 0.3s;
}

.mode-toggle:hover {
  color: #409eff;
}

.form-container,
.qr-container {
  margin-top: 48px;
}

.form-box {
  border: 1px solid #e4e7ed;
  padding: 24px;
  border-radius: 24px;
}

/* 媒体查询：小于800px时隐藏左侧区域 */
@media (max-width: 800px) {
  .left-section {
    display: none;
  }

  .glass-dialog {
    padding: 16px; /* 减少内边距但保持高度 */
    height: 500px; /* 明确保持高度 */
  }

  .right-section {
    padding: 16px;
  }

  .mode-toggle {
    position: static; /* 恢复绝对定位避免遮挡内容 */
    text-align: right;
    margin-bottom: 12px;
  }

  .content-wrapper {
    /* 小屏幕调整滚动区域内边距 */
    padding: 4px 0;
  }
}
</style>
