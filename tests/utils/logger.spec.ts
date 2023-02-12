import { describe, expect, it, vi } from 'vitest';
import { MockLogger } from './logger';

describe('mock logger', () => {
  it('should log', () => {
    const logger = new MockLogger('test');
    const spy = vi.spyOn(logger, 'log');
    logger.log('hello');
    expect(spy).toHaveBeenCalledWith('hello');
  });

  it('should log with prefix', () => {
    const logger = new MockLogger();
    expect(logger.name).toBe('MockLogger');
  });
});
