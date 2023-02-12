/// <reference types="vitest" />

import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteBaseConfig from './vite.config.base';

export default mergeConfig(
  viteBaseConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      coverage: {
        reporter: ['text', 'clover', 'json'],
      },
    },
  })
);
