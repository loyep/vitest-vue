<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ props.title || '登录' }}</div>
    <div class="login-form-sub-title">登录</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="() => {}"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '用户名不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.username" placeholder="用户名：admin" />
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          placeholder="密码：admin"
          allow-clear
        >
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-link>忘记密码</a-link>
        </div>
        <a-button
          id="login-btn"
          class="login-btn"
          type="primary"
          long
          :loading="loading"
          @click="handleSubmit"
        >
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import {
    Message,
    Input as AInput,
    Button as AButton,
    Form as AForm,
    Space as ASpace,
    Link as ALink,
  } from '@arco-design/web-vue';
  import type { LoginData } from '@/api/user';
  import { login } from '../fetch';

  const AFormItem = AForm.Item;
  const AInputPassword = AInput.Password;

  const props = defineProps<{
    title?: string;
  }>();

  const loading = ref(false);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };
  const loginForm = ref<InstanceType<typeof AForm>>();

  const errorMessage = ref('');

  const userInfo = ref({
    username: '',
    password: '',
  });

  const handleSubmit = async () => {
    const errors = await loginForm.value?.validate();
    const values = userInfo.value;
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await login(values as LoginData);
        Message.success('登录成功');
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
