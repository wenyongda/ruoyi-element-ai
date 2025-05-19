<!-- LoginBtn 登录按钮 -->
<script setup lang="ts">
function handleClickLogin() {
  console.log('handleClickLogin');
}
</script>

<template>
  <div
    class="login-btn bg-#191c1f c-#fff font-size-14px rounded-8px flex-center text-overflow p-10px pl-12px pr-12px min-w-49px h-16px cursor-pointer hover:bg-#232629"
    @click="handleClickLogin"
  >
    登录
  </div>
</template>

<style scoped lang="scss"></style>
