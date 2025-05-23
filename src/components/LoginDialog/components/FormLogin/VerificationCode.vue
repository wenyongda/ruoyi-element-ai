<!-- 手机号验证码登录表单 -->
<script lang="ts" setup>
// 表单逻辑由用户自行实现
</script>

<template>
  <div class="custom-form">
    <!-- 此处放入用户自己的表单组件 -->
    <div class="form-group">
      <label>手机号</label>
      <input type="text" placeholder="请输入手机号">
    </div>
    <div class="form-group">
      <label>验证码</label>
      <input type="text" placeholder="请输入验证码">
      <button>获取验证码</button>
    </div>
    <button class="login-btn">
      登录
    </button>
  </div>
</template>

<style scoped>
.custom-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-btn {
  margin-top: 24px;
  padding: 12px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
