import { mount } from '@vue/test-utils';
import { describe, test, expect, vi } from 'vitest';
// import { nextTick } from 'vue';
import LoginForm from '../components/login-form.vue';
import { login } from '../fetch';

// eslint-disable-next-line no-promise-executor-return
const asyncTimeout = (time: number) => new Promise((r) => setTimeout(r, time));
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('Login', () => {
  test('login fetch', () => {
    expect(() =>
      login({ password: 'admin', username: 'admin2' })
    ).rejects.toThrowError(/用户名或密码错误/);
  });

  test('mount', async () => {
    const wrapper = mount<InstanceType<typeof LoginForm>>(LoginForm, {
      props: {
        title: '测试登录',
      },
    });

    expect(wrapper.html()).toContain('测试登录');
  });

  test('form', async () => {
    const wrapper = mount<InstanceType<typeof LoginForm>>(LoginForm, {});
    // form异步加载，需要等待
    await asyncTimeout(1000);

    // 测试登录逻辑
    wrapper.vm.userInfo.username = 'admin';
    wrapper.vm.userInfo.password = 'admin2';
    await wrapper.find('button').trigger('click');

    // 等待登录请求
    await asyncTimeout(1000);
    // 等待登录mock
    expect(wrapper.html()).toContain('用户名或密码错误');
  });
});
