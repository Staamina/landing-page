import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    // Dynamic import for ESM-only @tailwindcss/vite
    const tailwindcss = (await import('@tailwindcss/vite')).default;

    return mergeConfig(config, {
      plugins: [tailwindcss()],
      optimizeDeps: {
        exclude: ['@itsmeadarsh/warper'],
      },
      resolve: {
        alias: {
          '@staamina/types': path.resolve(__dirname, '../../types/index.ts'),
          '@/site-3d-viewer': path.resolve(
            __dirname,
            '../src/organisms/site-3d-viewer'
          ),
        },
      },
    });
  },
};

export default config;
