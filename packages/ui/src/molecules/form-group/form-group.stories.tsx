import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@staamina/ui/button';
import { DatePicker } from '@staamina/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@staamina/ui/select';
import { FormGroup } from './form-group';

const meta: Meta<typeof FormGroup> = {
  title: 'Molecules/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  args: {
    label: 'Form Label',
    children: (
      <input
        type="text"
        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        placeholder="Enter text"
      />
    ),
  },
};

export const WithDatePicker: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-[400px]">
        <FormGroup label="Date of Birth">
          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Select your date of birth"
          />
        </FormGroup>
      </div>
    );
  },
};

export const WithSelect: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <FormGroup label="Country">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>
      </div>
    );
  },
};

export const WithInput: Story = {
  render: () => {
    return (
      <div className="w-[400px]">
        <FormGroup label="Email Address">
          <input
            type="email"
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Enter your email"
          />
        </FormGroup>
      </div>
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="w-[400px]">
        <FormGroup>
          <DatePicker value={date} onChange={setDate} />
        </FormGroup>
      </div>
    );
  },
};

export const FormComposition: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [country, setCountry] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    return (
      <div className="w-[500px] space-y-4">
        <FormGroup label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Enter your email"
          />
        </FormGroup>

        <FormGroup label="Country">
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </SelectContent>
          </Select>
        </FormGroup>

        <FormGroup label="Start Date">
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            placeholder="Select start date"
          />
        </FormGroup>

        <FormGroup label="End Date">
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            placeholder="Select end date"
            minDate={startDate || undefined}
          />
        </FormGroup>

        <div className="flex gap-2 pt-4">
          <Button>Submit</Button>
          <Button intent="secondary" appearance="outline">
            Cancel
          </Button>
        </div>
      </div>
    );
  },
};

export const MultipleFormGroups: Story = {
  render: () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    return (
      <div className="w-[400px]">
        <FormGroup label="First Name">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Enter first name"
          />
        </FormGroup>

        <FormGroup label="Last Name">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Enter last name"
          />
        </FormGroup>

        <FormGroup label="Date of Birth">
          <DatePicker
            value={birthDate}
            onChange={setBirthDate}
            placeholder="Select date of birth"
          />
        </FormGroup>
      </div>
    );
  },
};
