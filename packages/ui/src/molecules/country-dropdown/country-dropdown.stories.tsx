import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FormGroup } from '@staamina/ui/form-group';
import { TranslationProvider } from '@staamina/ui/i18n';
import { CountryDropdown } from './country-dropdown';

const meta: Meta<typeof CountryDropdown> = {
  title: 'Molecules/CountryDropdown',
  component: CountryDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountryDropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[400px]">
        <CountryDropdown
          value={value}
          onChange={setValue}
          placeholder="Select a country"
        />
        {value && (
          <p className="mt-2 text-sm text-text-secondary">Selected: {value}</p>
        )}
      </div>
    );
  },
};

export const WithFormGroup: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[400px]">
        <FormGroup label="Country" name="country">
          <CountryDropdown
            value={value}
            onChange={setValue}
            placeholder="Select a country"
          />
        </FormGroup>
        {value && (
          <p className="mt-2 text-sm text-text-secondary">
            Selected code: {value}
          </p>
        )}
      </div>
    );
  },
};

export const WithRequired: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[400px]">
        <FormGroup label="Country" name="country" isRequired>
          <CountryDropdown
            value={value}
            onChange={setValue}
            placeholder="Select a country"
          />
        </FormGroup>
      </div>
    );
  },
};

export const FrenchLocale: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TranslationProvider locale="fr">
        <div className="w-[400px]">
          <FormGroup label="Pays" name="country" isRequired>
            <CountryDropdown
              value={value}
              onChange={setValue}
              placeholder="Sélectionner un pays"
            />
          </FormGroup>
          {value && (
            <p className="mt-2 text-sm text-text-secondary">
              Code sélectionné: {value}
            </p>
          )}
        </div>
      </TranslationProvider>
    );
  },
};

export const WithCountrySelect: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<{
      code: string;
      name: string;
    } | null>(null);

    return (
      <div className="w-[400px] space-y-4">
        <FormGroup label="Country" name="country" isRequired>
          <CountryDropdown
            value={value}
            onChange={setValue}
            onCountrySelect={(country) => setSelectedCountry(country)}
            placeholder="Select a country"
          />
        </FormGroup>
        {selectedCountry && (
          <div className="p-4 bg-subtle rounded-md">
            <p className="text-sm font-medium">Selected Country:</p>
            <p className="text-sm text-text-secondary">
              Code: {selectedCountry.code}
            </p>
            <p className="text-sm text-text-secondary">
              Name: {selectedCountry.name}
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = useState('FR');
    return (
      <div className="w-[400px]">
        <FormGroup label="Country" name="country" isRequired>
          <CountryDropdown
            value={value}
            onChange={setValue}
            placeholder="Select a country"
          />
        </FormGroup>
        <p className="mt-2 text-sm text-text-secondary">
          Pre-selected: {value}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('FR');
    return (
      <div className="w-[400px]">
        <FormGroup label="Country" name="country" isRequired>
          <CountryDropdown
            value={value}
            onChange={setValue}
            placeholder="Select a country"
            disabled
          />
        </FormGroup>
      </div>
    );
  },
};

export const PositionTop: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[400px] mt-64">
        <FormGroup label="Country" name="country" isRequired>
          <CountryDropdown
            value={value}
            onChange={setValue}
            placeholder="Select a country"
            position="top"
          />
        </FormGroup>
      </div>
    );
  },
};

export const PositionBottom: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[400px]">
        <FormGroup label="Country" name="country" isRequired>
          <CountryDropdown
            value={value}
            onChange={setValue}
            placeholder="Select a country"
            position="bottom"
          />
        </FormGroup>
      </div>
    );
  },
};
