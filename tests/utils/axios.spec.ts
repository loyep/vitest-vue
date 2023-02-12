import { describe, expect, it, vi, beforeAll, afterAll } from 'vitest';
import axios from 'axios';

let mockDataResult: any;

describe('mock axios', () => {
  beforeAll(() => {
    mockDataResult = { data: 'mocked data' };
    // vi.mock('axios');
    vi.mock('axios', () => {
      return {
        default: {
          get: vi.fn(() => Promise.resolve(mockDataResult)),
        },
      };
    });
  });

  it('mocked axios', async () => {
    await axios.get('string');
    expect(axios.get).toHaveBeenCalledWith('string');
    expect(axios.post).toBeUndefined();
    const response = await axios.get('/test');
    expect(response).toEqual(mockDataResult);
  });

  it('can get actual axios', async () => {
    const ax = await vi.importActual<typeof axios>('axios');

    expect(vi.isMockFunction(ax.get)).toBe(false);
  });

  afterAll(() => {
    vi.unmock('axios');
  });
});

describe('mock only one function', () => {
  it('mocked axios', async () => {
    vi.doMock('axios', () => {
      return {
        default: {
          get: vi.fn(() => Promise.resolve(mockDataResult)),
        },
      };
    });
    await axios.get('string');
    expect(axios.get).toHaveBeenCalledWith('string');
    expect(axios.post).toBeUndefined();
    const response = await axios.get('/test');
    expect(response).toEqual(mockDataResult);
    vi.doUnmock('axios');
    expect(axios.get).toBeDefined();
  });
});
