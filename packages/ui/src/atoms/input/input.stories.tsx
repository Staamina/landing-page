import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FormGroup } from '@staamina/ui/form-group';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    isHighContrast: {
      control: 'boolean',
      description: 'Use for dark backgrounds or high contrast scenarios',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('John Doe');
    return (
      <div className="w-[300px]">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your name"
        />
      </div>
    );
  },
};

export const Email: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    return (
      <div className="w-[300px]">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
    );
  },
};

export const Password: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    return (
      <div className="w-[300px]">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
    );
  },
};

export const Number: Story = {
  render: () => {
    const [number, setNumber] = useState('');
    return (
      <div className="w-[300px]">
        <Input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled input',
    disabled: true,
  },
};

export const WithFormGroup: Story = {
  render: () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    return (
      <div className="w-[400px] space-y-4">
        <FormGroup label="First Name">
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </FormGroup>

        <FormGroup label="Last Name">
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </FormGroup>

        <FormGroup label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormGroup>
      </div>
    );
  },
};

export const AllTypes: Story = {
  render: () => {
    return (
      <div className="w-[400px] space-y-4">
        <FormGroup label="Text">
          <Input type="text" placeholder="Text input" />
        </FormGroup>

        <FormGroup label="Email">
          <Input type="email" placeholder="Email input" />
        </FormGroup>

        <FormGroup label="Password">
          <Input type="password" placeholder="Password input" />
        </FormGroup>

        <FormGroup label="Number">
          <Input type="number" placeholder="Number input" />
        </FormGroup>

        <FormGroup label="Tel">
          <Input type="tel" placeholder="Phone number" />
        </FormGroup>

        <FormGroup label="URL">
          <Input type="url" placeholder="Website URL" />
        </FormGroup>

        <FormGroup label="Search">
          <Input type="search" placeholder="Search..." />
        </FormGroup>
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const hasError = email.length > 0 && !email.includes('@');

    return (
      <div className="w-[300px]">
        <FormGroup label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={
              hasError
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            }
          />
          {hasError && (
            <p className="text-sm text-destructive mt-1">
              Please enter a valid email address
            </p>
          )}
        </FormGroup>
      </div>
    );
  },
};

export const HighContrast: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px] bg-gray-900 p-6 rounded-lg">
        <FormGroup label="Email" className="text-white">
          <Input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your email"
            isHighContrast
          />
        </FormGroup>
      </div>
    );
  },
};

export const HighContrastWithValue: Story = {
  render: () => {
    const [email, setEmail] = useState('user@example.com');
    const [password, setPassword] = useState('');
    return (
      <div className="w-[400px] bg-slate-900 p-6 rounded-lg space-y-4">
        <FormGroup label="Email" className="text-white">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            isHighContrast
          />
        </FormGroup>
        <FormGroup label="Password" className="text-white">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            isHighContrast
          />
        </FormGroup>
      </div>
    );
  },
};
