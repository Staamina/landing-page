import type { Meta, StoryObj } from '@storybook/react';
import { TokenVisualizer } from './TokenVisualizer';

const meta: Meta<typeof TokenVisualizer> = {
  title: 'Design System/Tokens',
  component: TokenVisualizer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TokenVisualizer>;

export const Gallery: Story = {};
