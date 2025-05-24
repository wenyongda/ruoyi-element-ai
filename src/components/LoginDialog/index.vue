<script lang="ts" setup>
import { ref, watch } from 'vue';
import logoPng from '@/assets/images/logo.png';
import SvgIcon from '@/components/SvgIcon/index.vue';
import AccountPassword from './components/FormLogin/AccountPassword.vue';
import QrCodeLogin from './components/QrCodeLogin/index.vue';

// 使用 defineModel 定义双向绑定的 visible（需 Vue 3.4+）
const visible = defineModel<boolean>('visible');
const showMask = ref(false); // 控制遮罩层显示的独立状态
const isQrMode = ref(false);

// 监听 visible 变化，控制遮罩层显示时机
watch(
  visible,
  (newVal) => {
    if (newVal) {
      // 恢复默认
      isQrMode.value = false;
      // 显示时立即展示遮罩
      showMask.value = true;
    }
  },
  { immediate: true },
);

// 切换登录模式
function toggleLoginMode() {
  isQrMode.value = !isQrMode.value;
}

// 点击遮罩层关闭对话框（触发过渡动画）
function handleMaskClick() {
  visible.value = false; // 触发离开动画
}

// 过渡动画结束回调
function onAfterLeave() {
  if (!visible.value) {
    showMask.value = false; // 动画结束后隐藏遮罩
  }
}
</script>

<template>
  <!-- 使用 Teleport 将内容传送至 body -->
  <Teleport to="body">
    <div v-show="showMask" class="mask" @click.self="handleMaskClick">
      <!-- 仅对弹框应用过渡动画 -->
      <Transition name="dialog-zoom" @after-leave="onAfterLeave">
        <div v-show="visible" class="glass-dialog">
          <div class="left-section">
            <div class="logo-wrap">
              <img :src="logoPng" class="logo-img">
              <span class="logo-text"> Element Plus X</span>
            </div>
            <div class="ad-banner">
              <SvgIcon name="p-bangong" class-name="animate-up-down" />
            </div>
          </div>
          <div class="right-section">
            <div class="mode-toggle" @click.stop="toggleLoginMode">
              <SvgIcon v-if="!isQrMode" name="erweimadenglu" />
              <SvgIcon v-else name="zhanghaodenglu" />
            </div>
            <div class="content-wrapper">
              <span class="content-title"> 登录后免费使用完整功能 </span>

              <div v-if="!isQrMode" class="form-box">
                <!-- 表单容器，父组件可以自定定义表单插槽 -->
                <slot name="form">
                  <!-- 父组件不用插槽则显示默认表单 默认账号密码登录 -->
                  <div class="form-container">
                    <el-divider content-position="center">
                      账号密码登录
                    </el-divider>
                    <AccountPassword />
                  </div>
                </slot>
              </div>
              <div v-else class="qr-container">
                <QrCodeLogin />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
/* 动画样式（仅作用于弹框） */
.dialog-zoom-enter-active,
.dialog-zoom-leave-active {
  transition: all 0.3s ease-in-out;
  transform-origin: center;
}

.dialog-zoom-enter-from,
.dialog-zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-zoom-enter-to,
.dialog-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* 遮罩层样式 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  opacity: 1;
  transition: opacity 0.3s;
}

.mask[hidden] {
  opacity: 0;
}

/* 对话框容器样式 */
.glass-dialog {
  display: flex;
  width: fit-content;
  height: var(--login-dialog-height);
  background-color: #ffffff;
  border-radius: var(--login-dialog-border-radius);
  overflow: hidden;
  padding: var(--login-dialog-padding);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 90%;
}

/* 以下样式与原代码一致，未修改 */
.left-section {
  width: calc(var(--login-dialog-width) / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--login-dialog-section-padding);
  background: linear-gradient(
    233deg,
    rgba(113, 161, 255, 0.6) 17.67%,
    rgba(154, 219, 255, 0.6) 70.4%
  );
}

.left-section .logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;
}

.left-section .logo-wrap .logo-img {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.1));
  background: var(--login-dialog-logo-background);
}

.left-section .logo-wrap .logo-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--login-dialog-logo-text-color);
}

.left-section .ad-banner {
  position: relative;
  width: 100%;
  height: 100%;
}

.left-section .ad-banner .svg-icon {
  position: absolute;
  width: 100%;
  height: 310px;
}

.right-section {
  width: calc(var(--login-dialog-width) / 2);
  position: relative;
  padding: var(--login-dialog-section-padding);
  display: flex;
  flex-direction: column;
}

.right-section .content-wrapper {
  flex: 1;
  overflow: hidden;
  padding: 8px 0;
}

.right-section .content-title {
  position: absolute;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 55px;
}

.right-section .mode-toggle {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  color: var(--login-dialog-mode-toggle-color);
  transition: color 0.3s;
  font-size: 24px;
}

.right-section .form-container,
.right-section .qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.right-section .form-box {
  justify-self: center;
  align-self: center;
  height: 100%;
  width: 260px;
  padding: var(--login-dialog-section-padding);
  border-radius: var(--login-dialog-border-radius);
}

@media (max-width: 800px) {
  .left-section {
    display: none !important;
  }

  .glass-dialog {
    padding: var(--login-dialog-padding);
    height: var(--login-dialog-height);
  }

  .right-section {
    padding: calc(var(--login-dialog-section-padding) - 8px);
  }

  .content-wrapper {
    padding: 4px 0;
  }
}

.animate-up-down {
  animation: upDown 5s linear 0ms infinite;
}

@keyframes upDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
