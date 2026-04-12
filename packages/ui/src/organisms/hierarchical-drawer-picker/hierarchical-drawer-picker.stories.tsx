import {
  Droplets,
  FolderTree,
  HelpCircle,
  Info,
  Thermometer,
  Zap,
} from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import type { HierarchicalOption, HierarchicalOptionValue } from './types';
import { HierarchicalDrawerPicker } from './hierarchical-drawer-picker';

const meta: Meta<typeof HierarchicalDrawerPicker> = {
  title: 'Organisms/HierarchicalDrawerPicker',
  component: HierarchicalDrawerPicker,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '400px', minWidth: 0 }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    sectionLabel: {
      control: 'text',
      description: 'Label of the section (first line)',
    },
    sectionIcon: {
      description:
        'Icon displayed next to section label on trigger and drawer title at root',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder when no value selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the trigger',
    },
  },
};

export default meta;

type Story = StoryObj<typeof HierarchicalDrawerPicker>;

const mockOptions: HierarchicalOption[] = [
  {
    value: 'hvac',
    label: 'HVAC',
    children: [
      { value: 'hvac-split', label: 'Split Systems' },
      { value: 'hvac-central', label: 'Central Air' },
    ],
  },
  {
    value: 'electrical',
    label: 'Electrical',
    children: [
      { value: 'electrical-panel', label: 'Electrical Panels' },
      { value: 'electrical-lighting', label: 'Lighting' },
    ],
  },
  {
    value: 'plumbing',
    label: 'Plumbing',
    children: [
      { value: 'plumbing-fixtures', label: 'Fixtures' },
      { value: 'plumbing-pumps', label: 'Pumps' },
    ],
  },
];

const mockOptionsWithDidactics: HierarchicalOption[] = [
  {
    value: 'hvac',
    label: 'HVAC',
    didactics: {
      tooltip: 'Heating, ventilation and air conditioning systems',
      icon: <Thermometer className="h-5 w-5" />,
    },
    children: [
      {
        value: 'hvac-split',
        label: 'Split Systems',
        didactics: {
          tooltip: 'Split AC units with indoor and outdoor components',
          icon: <Info className="h-5 w-5" />,
        },
      },
      {
        value: 'hvac-central',
        label: 'Central Air',
        didactics: {
          tooltip: 'Central ducted air conditioning',
          icon: <HelpCircle className="h-5 w-5" />,
        },
      },
    ],
  },
  {
    value: 'electrical',
    label: 'Electrical',
    didactics: {
      tooltip: 'Electrical systems and components',
      icon: <Zap className="h-5 w-5" />,
    },
    children: [
      { value: 'electrical-panel', label: 'Electrical Panels' },
      { value: 'electrical-lighting', label: 'Lighting' },
    ],
  },
  {
    value: 'plumbing',
    label: 'Plumbing',
    didactics: {
      tooltip: 'Pipes, fixtures and water systems',
      icon: <Droplets className="h-5 w-5" />,
    },
    children: [
      { value: 'plumbing-fixtures', label: 'Fixtures' },
      { value: 'plumbing-pumps', label: 'Pumps' },
    ],
  },
];

const deepOptions: HierarchicalOption[] = [
  {
    value: 'a',
    label: 'Level 1 A',
    children: [
      {
        value: 'a1',
        label: 'Level 2 A1',
        children: [
          {
            value: 'a1x',
            label: 'Level 3 A1X',
            children: [
              {
                value: 'a1x-i',
                label: 'Level 4 A1X-I',
                children: [
                  { value: 'a1x-i-1', label: 'Level 5 Item 1' },
                  { value: 'a1x-i-2', label: 'Level 5 Item 2' },
                ],
              },
              { value: 'a1x-ii', label: 'Level 4 A1X-II' },
            ],
          },
          {
            value: 'a1y',
            label: 'Level 3 A1Y',
          },
        ],
      },
      { value: 'a2', label: 'Level 2 A2' },
    ],
  },
  {
    value: 'b',
    label: 'Level 1 B',
    children: [{ value: 'b1', label: 'Level 2 B1' }],
  },
];

export const Default: Story = {
  args: {
    sectionLabel: 'Category',
    options: mockOptions,
    value: null,
    placeholder: 'Choose…',
    onChange: (node: HierarchicalOption) => {
      console.log('Selected:', node);
    },
  },
};

export const WithValue: Story = {
  args: {
    sectionLabel: 'Category',
    options: mockOptions,
    value: {
      value: 'hvac-split',
      label: 'Split Systems',
    } as HierarchicalOptionValue,
    placeholder: 'Choose…',
    onChange: (node: HierarchicalOption) => {
      console.log('Selected:', node);
    },
  },
};

export const WithSectionIcon: Story = {
  args: {
    sectionLabel: 'Category',
    sectionIcon: <FolderTree className="h-5 w-5" />,
    options: mockOptions,
    value: null,
    placeholder: 'Choose a category…',
    onChange: (node: HierarchicalOption) => {
      console.log('Selected:', node);
    },
  },
};

export const WithDidactics: Story = {
  args: {
    sectionLabel: 'Category',
    sectionIcon: <FolderTree className="h-5 w-5" />,
    options: mockOptionsWithDidactics,
    value: null,
    placeholder: 'Choose a category…',
    onChange: (node: HierarchicalOption) => {
      console.log('Selected:', node);
    },
  },
};

export const EmptyOptions: Story = {
  args: {
    sectionLabel: 'Category',
    options: [],
    value: null,
    placeholder: 'No options available',
    onChange: () => {},
  },
};

export const DeepHierarchy: Story = {
  args: {
    sectionLabel: 'Category',
    options: deepOptions,
    value: null,
    placeholder: 'Choose…',
    onChange: (node: HierarchicalOption) => {
      console.log('Selected:', node);
    },
  },
};

const deepOptionsWithDidactics: HierarchicalOption[] = [
  {
    value: 'a',
    label: 'Level 1 A',
    didactics: {
      tooltip: 'First level with didactics',
      icon: <Info className="h-5 w-5" />,
    },
    children: [
      {
        value: 'a1',
        label: 'Level 2 A1',
        didactics: {
          tooltip: 'Second level with didactics',
          icon: <HelpCircle className="h-5 w-5" />,
        },
        children: [
          {
            value: 'a1x',
            label: 'Level 3 A1X',
            children: [{ value: 'a1x-leaf', label: 'Level 4 Leaf' }],
          },
        ],
      },
    ],
  },
  {
    value: 'b',
    label: 'Level 1 B',
    children: [{ value: 'b1', label: 'Level 2 B1' }],
  },
];

export const WithDidacticsAndDeepHierarchy: Story = {
  args: {
    sectionLabel: 'Category',
    sectionIcon: <FolderTree className="h-5 w-5" />,
    options: deepOptionsWithDidactics,
    value: null,
    placeholder: 'Choose…',
    onChange: (node: HierarchicalOption) => {
      console.log('Selected:', node);
    },
  },
};
