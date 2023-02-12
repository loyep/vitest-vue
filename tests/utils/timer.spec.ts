import { describe, expect, it, vi, beforeAll } from 'vitest';
import { loopSleep, sleep } from './timer';

describe('mock timer', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it('a test for a simple setTimeout', async () => {
    const res = sleep(6000, 'this is a simple setTimeout test');
    vi.runAllTimers();
    // vi.advanceTimersByTime(6000);
    await expect(res).resolves.toBe('this is a simple setTimeout test');
  });

});

describe('examples for fakeTimers', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it('a test for a recursion setTimeout', async () => {
    const res = loopSleep(6000, 'this is a recursion setTimeout test');
    // 因为是递归调用，所以如果使用 runAllTimers，会一直执行，直到内存耗尽，
    // 因为每次定时器跑完，都会重新生成一个新的定时器
    // 因此只需要将当前处于pending状态的定时器执行完即可
    vi.runOnlyPendingTimers();
    // vi.runAllTimers();
    await expect(res).resolves.toBe('this is a recursion setTimeout test');
  });
});
