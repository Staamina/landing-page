import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FormGroup } from '@staamina/ui/form-group';
import { Dropdown } from './dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    searchable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px]">
        <Dropdown
          options={sampleOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
        />
        {value && (
          <p className="mt-2 text-sm text-text-secondary">Selected: {value}</p>
        )}
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px]">
        <Dropdown
          options={sampleOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
          searchable
        />
      </div>
    );
  },
};

export const WithFormGroup: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px]">
        <FormGroup label="Select Option" name="option">
          <Dropdown
            options={sampleOptions}
            value={sampleOptions.find((option) => option.value === value)}
            onChange={setValue}
            placeholder="Select an option"
            searchable
          />
        </FormGroup>
      </div>
    );
  },
};

export const WithRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px]">
        <FormGroup label="Select Option" name="option" isRequired>
          <Dropdown
            options={sampleOptions}
            value={sampleOptions.find((option) => option.value === value)}
            onChange={setValue}
            placeholder="Select an option"
            searchable
          />
        </FormGroup>
      </div>
    );
  },
};

export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = useState('option2');
    return (
      <div className="w-[300px]">
        <Dropdown
          options={sampleOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
          searchable
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('option2');
    return (
      <div className="w-[300px]">
        <Dropdown
          options={sampleOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
          searchable
          disabled
        />
      </div>
    );
  },
};

export const PositionTop: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px] mt-64">
        <Dropdown
          options={sampleOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
          searchable
          position="top"
        />
      </div>
    );
  },
};

export const PositionBottom: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px]">
        <Dropdown
          options={sampleOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
          searchable
          position="bottom"
        />
      </div>
    );
  },
};

export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const manyOptions = Array.from({ length: 50 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
    }));
    return (
      <div className="w-[300px]">
        <Dropdown
          options={manyOptions}
          value={sampleOptions.find((option) => option.value === value)}
          onChange={setValue}
          placeholder="Select an option"
          searchable
        />
      </div>
    );
  },
};
