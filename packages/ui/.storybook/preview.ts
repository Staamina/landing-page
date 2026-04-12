import type { Preview } from '@storybook/react';
import { createElement } from 'react';
import '../src/storybook.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import { TooltipProvider } from '../src/molecules/tooltip';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) =>
      createElement(
        TooltipProvider,
        { delayDuration: 300 },
        createElement(Story)
      ),
  ],
};

export default preview;
