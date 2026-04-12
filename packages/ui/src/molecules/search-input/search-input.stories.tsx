import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FormGroup } from '@staamina/ui/form-group';
import { SearchInput } from './search-input';

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'none'],
      description: 'Position of the search icon',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show clear button when input has value',
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[300px]">
        <SearchInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('Initial search term');
    return (
      <div className="w-[300px]">
        <SearchInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
        />
      </div>
    );
  },
};

export const WithClearCallback: Story = {
  render: () => {
    const [value, setValue] = useState('Click X to clear');
    const [clearCount, setClearCount] = useState(0);
    return (
      <div className="w-[300px] space-y-2">
        <SearchInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => {
            setValue('');
            setClearCount((c) => c + 1);
          }}
          placeholder="Search..."
        />
        <p className="text-sm text-text-secondary">
          Cleared {clearCount} times
        </p>
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value, setValue] = useState('Searching...');
    return (
      <div className="w-[300px]">
        <SearchInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          isLoading
        />
      </div>
    );
  },
};

export const IconPositions: Story = {
  render: () => {
    const [values, setValues] = useState({
      left: '',
      right: '',
      none: '',
    });
    return (
      <div className="w-[300px] space-y-4">
        <FormGroup label="Icon Left (default)">
          <SearchInput
            value={values.left}
            onChange={(e) => setValues((v) => ({ ...v, left: e.target.value }))}
            placeholder="Search..."
            iconPosition="left"
          />
        </FormGroup>

        <FormGroup label="Icon Right">
          <SearchInput
            value={values.right}
            onChange={(e) =>
              setValues((v) => ({ ...v, right: e.target.value }))
            }
            placeholder="Search..."
            iconPosition="right"
          />
        </FormGroup>

        <FormGroup label="No Icon">
          <SearchInput
            value={values.none}
            onChange={(e) => setValues((v) => ({ ...v, none: e.target.value }))}
            placeholder="Search..."
            iconPosition="none"
          />
        </FormGroup>
      </div>
    );
  },
};

export const NoClearButton: Story = {
  render: () => {
    const [value, setValue] = useState('No clear button shown');
    return (
      <div className="w-[300px]">
        <SearchInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          showClearButton={false}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled search',
    disabled: true,
    placeholder: 'Search...',
  },
  render: (args) => (
    <div className="w-[300px]">
      <SearchInput {...args} />
    </div>
  ),
};

export const WithFormGroup: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-[400px]">
        <FormGroup label="Search Equipment">
          <SearchInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter equipment name or model..."
          />
        </FormGroup>
      </div>
    );
  },
};

export const CustomPlaceholders: Story = {
  render: () => {
    const [values, setValues] = useState({
      equipment: '',
      incident: '',
      user: '',
    });
    return (
      <div className="w-[350px] space-y-4">
        <SearchInput
          value={values.equipment}
          onChange={(e) =>
            setValues((v) => ({ ...v, equipment: e.target.value }))
          }
          placeholder="Search equipment by name..."
        />
        <SearchInput
          value={values.incident}
          onChange={(e) =>
            setValues((v) => ({ ...v, incident: e.target.value }))
          }
          placeholder="Search by description..."
        />
        <SearchInput
          value={values.user}
          onChange={(e) => setValues((v) => ({ ...v, user: e.target.value }))}
          placeholder="Find users..."
        />
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = (searchValue: string) => {
      setValue(searchValue);
      if (searchValue.trim()) {
        setIsLoading(true);
        setTimeout(() => {
          setResults([
            `Result 1 for "${searchValue}"`,
            `Result 2 for "${searchValue}"`,
            `Result 3 for "${searchValue}"`,
          ]);
          setIsLoading(false);
        }, 500);
      } else {
        setResults([]);
      }
    };

    return (
      <div className="w-[350px] space-y-4">
        <SearchInput
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          onClear={() => {
            setValue('');
            setResults([]);
          }}
          placeholder="Type to search..."
          isLoading={isLoading}
        />
        {results.length > 0 && (
          <ul className="rounded-md border border-border-default bg-surface p-2 space-y-1">
            {results.map((result, i) => (
              <li
                key={i}
                className="px-3 py-2 text-sm rounded hover:bg-hover cursor-pointer"
              >
                {result}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({
      small: '',
      default: '',
      large: '',
    });
    return (
      <div className="w-[350px] space-y-4">
        <FormGroup label="Small">
          <SearchInput
            value={values.small}
            onChange={(e) =>
              setValues((v) => ({ ...v, small: e.target.value }))
            }
            placeholder="Search..."
            className="h-8 text-xs"
          />
        </FormGroup>

        <FormGroup label="Default">
          <SearchInput
            value={values.default}
            onChange={(e) =>
              setValues((v) => ({ ...v, default: e.target.value }))
            }
            placeholder="Search..."
          />
        </FormGroup>

        <FormGroup label="Large">
          <SearchInput
            value={values.large}
            onChange={(e) =>
              setValues((v) => ({ ...v, large: e.target.value }))
            }
            placeholder="Search..."
            className="h-12 text-base"
          />
        </FormGroup>
      </div>
    );
  },
};
