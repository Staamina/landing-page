import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-[300px]">
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2024, 5, 15));
    return (
      <div className="w-[300px]">
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const WithMinDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date();
    return (
      <div className="w-[300px]">
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          placeholder="Select a future date"
        />
      </div>
    );
  },
};

export const WithMaxDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return (
      <div className="w-[300px]">
        <DatePicker
          value={date}
          onChange={setDate}
          maxDate={maxDate}
          placeholder="Select a date within 30 days"
        />
      </div>
    );
  },
};

export const WithDateRange: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    return (
      <div className="w-[300px]">
        <DatePicker
          value={date}
          onChange={setDate}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Select a date (next 60 days)"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(new Date(2024, 5, 15));
    return (
      <div className="w-[300px]">
        <DatePicker value={date} onChange={setDate} disabled />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-[300px]">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Choose your date"
        />
      </div>
    );
  },
};

export const MultipleDatePickers: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    return (
      <div className="flex flex-col gap-4 w-[300px]">
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          placeholder="Start date"
        />
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          placeholder="End date"
          minDate={startDate || undefined}
        />
      </div>
    );
  },
};
