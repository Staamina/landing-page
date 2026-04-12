import type { Meta, StoryObj } from '@storybook/react';

import { SplashScreen } from './SplashScreen';

const meta: Meta<typeof SplashScreen> = {
  title: 'Organisms/SplashScreen',
  component: SplashScreen,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    logoPath: {
      control: 'text',
      description: 'Path to the logo image',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  args: {
    logoPath: '/Stamina.svg',
  },
};

export const CustomLogoPath: Story = {
  args: {
    logoPath: '/Stamina.svg',
  },
};

export const WithCustomBackground: Story = {
  args: {
    logoPath: '/Stamina.svg',
    className:
      'bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10',
  },
};

export const DarkMode: Story = {
  args: {
    logoPath: '/Stamina-HighContrast.svg',
    className: 'bg-gray-900',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
