<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import type { LoginDTO } from '@/api/auth/types';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/api';
import { useUserStore } from '@/store';

const userStore = useUserStore();

const formRef = ref<FormInstance>();

const formModel = reactive<LoginDTO>({
  username: '',
  password: '',
});

const router = useRouter();
async function handleSubmit() {
  try {
    await formRef.value?.validate();
    const res = await login(formModel);
    console.log(res, 'res');
    res.data.token && userStore.setToken(res.data.token);
    res.data.userInfo && userStore.setUserInfo(res.data.userInfo);
    router.replace('/');
  }
  catch (error) {
    console.error('请求错误:', error);
  }
}
</script>

<template>
  <div class="w-screen h-screen justify-center items-center flex bg-black">
    <div class="max-w-[500px] w-full p-5 rounded bg-white/60 backdrop-blur-md">
      <h1>登录</h1>
      <el-form ref="formRef" :model="formModel">
        <el-form-item label="用户名" name="username">
          <el-input v-model="formModel.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" name="password">
          <el-input v-model="formModel.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
