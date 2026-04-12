import type { Category } from '@staamina/types';
import type { Meta, StoryObj } from '@storybook/react';

import { CategoryPicker } from './category-picker';

const meta: Meta<typeof CategoryPicker> = {
  title: 'Organisms/CategoryPicker',
  component: CategoryPicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryPicker>;

const mockCategories: Category[] = [
  { id: 'cat-hvac', name: 'HVAC', parentId: null },
  { id: 'cat-hvac-split', name: 'Split Systems', parentId: 'cat-hvac' },
  { id: 'cat-hvac-central', name: 'Central Air', parentId: 'cat-hvac' },
  { id: 'cat-electrical', name: 'Electrical', parentId: null },
  {
    id: 'cat-electrical-panel',
    name: 'Electrical Panels',
    parentId: 'cat-electrical',
  },
  {
    id: 'cat-electrical-lighting',
    name: 'Lighting',
    parentId: 'cat-electrical',
  },
  { id: 'cat-plumbing', name: 'Plumbing', parentId: null },
  { id: 'cat-plumbing-fixtures', name: 'Fixtures', parentId: 'cat-plumbing' },
  { id: 'cat-plumbing-pumps', name: 'Pumps', parentId: 'cat-plumbing' },
];

export const Default: Story = {
  args: {
    categories: mockCategories,
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    categories: mockCategories,
    value: mockCategories.find((c) => c.id === 'cat-hvac-split') ?? null,
    onChange: () => {},
  },
};

export const Empty: Story = {
  args: {
    categories: [],
    onChange: () => {},
  },
};

export const Loading: Story = {
  args: {
    categories: [],
    isLoadingCategories: true,
    onChange: () => {},
  },
};
