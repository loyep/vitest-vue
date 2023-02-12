import { expect, describe, it, vi, beforeAll } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Button from './button.vue';

describe('测试DOM查询', () => {
  beforeAll(() => {
    // 移除 jest 的 log 输出
    (global as any).console = {
      log: vi.fn(),
      debug: console.debug,
      trace: console.trace,
    };
  });
  it('button mount', () => {
    const wrapper = shallowMount(Button, {
      props: {
        value: '登录测试',
      },
      //   attachTo: document.body,
    });

    expect(wrapper.text()).toContain('登录测试');
    expect(wrapper.find('button').text()).toContain('登录测试');
    // expect(wrapper.get('a').element.textContent).toBe('登录测试');
    // expect(document.body.textContent).toContain('登录测试');
  });

  it('button 隐藏文案', async () => {
    const wrapper = shallowMount(Button, {
      props: {
        value: '登录测试',
        showText: true,
      },
    });

    expect(wrapper.find('span').text()).toBe('隐藏文案');
    expect(wrapper.find('span').isVisible()).toBe(true);
  });

  it('button 事件触发', async () => {
    const wrapper = shallowMount(Button, {
      props: {
        value: '登录测试',
        showText: false,
      },
    });
    // 采用 await 的原因是，trigger 是异步的，可能会引发页面的刷新逻辑
    await wrapper.find('button').trigger('click');

    // 也可以采用下面的方法
    // wrapper.find('button').trigger('click');
    // await wrapper.vm.$nextTick();

    expect(wrapper.find('.count').text()).toBe('1');
  });

  it('Mock Console', async () => {
    const wrapper = shallowMount(Button, {
      props: {
        value: '登录测试',
        showText: false,
      },
    });
    // 采用 await 的原因是，trigger 是异步的，可能会引发页面的刷新逻辑
    await wrapper.find('button').trigger('click');

    // 也可以采用下面的方法
    // wrapper.find('button').trigger('click');
    // await wrapper.vm.$nextTick();

    expect(wrapper.find('.count').text()).toBe('1');
    expect(global.console.log).toHaveBeenCalledWith('count', 1);
  });
});
