import * as React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CountryDropdown } from '../country-dropdown';
import { TranslationProvider } from '@staamina/ui/i18n';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

const mockRect = {
  top: 100,
  bottom: 140,
  left: 20,
  width: 300,
  height: 40,
  x: 20,
  y: 100,
  right: 320,
  toJSON: () => {},
};

// Stateful wrapper for controlled-component tests
const ControlledCountryDropdown = ({
  initialValue = '',
  onChange,
  onCountrySelect,
  placeholder,
  disabled,
}: {
  initialValue?: string;
  onChange?: (value: string) => void;
  onCountrySelect?: (country: { code: string; name: string }) => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [value, setValue] = React.useState(initialValue);
  return (
    <CountryDropdown
      value={value}
      onChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
      onCountrySelect={onCountrySelect}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

describe('CountryDropdown', () => {
  beforeEach(() => {
    Element.prototype.getBoundingClientRect = vi.fn(() => mockRect);
    // JSDOM doesn't implement scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  const renderUncontrolled = (
    props: {
      value?: string;
      onChange?: (value: string) => void;
      onCountrySelect?: (country: { code: string; name: string }) => void;
      placeholder?: string;
      disabled?: boolean;
    } = {}
  ) => {
    const onChange = props.onChange ?? vi.fn();
    return render(
      <TestWrapper>
        <CountryDropdown
          value={props.value ?? ''}
          onChange={onChange}
          onCountrySelect={props.onCountrySelect}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      </TestWrapper>
    );
  };

  const renderControlled = (
    props: {
      initialValue?: string;
      onChange?: (value: string) => void;
      onCountrySelect?: (country: { code: string; name: string }) => void;
      placeholder?: string;
      disabled?: boolean;
    } = {}
  ) => {
    return render(
      <TestWrapper>
        <ControlledCountryDropdown {...props} />
      </TestWrapper>
    );
  };

  /** Open the dropdown and wait for both the search input and listbox to appear */
  const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  };

  describe('Rendering', () => {
    it('renders with default placeholder', () => {
      renderUncontrolled();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
      renderUncontrolled({ placeholder: 'Choose country' });
      expect(screen.getByText('Choose country')).toBeInTheDocument();
    });

    it('renders selected country name when value is set', () => {
      renderUncontrolled({ value: 'FR' });
      expect(screen.getByText(/france/i)).toBeInTheDocument();
    });

    it('is disabled when disabled prop is true', () => {
      renderUncontrolled({ disabled: true });
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Opening and closing', () => {
    it('shows search input in trigger area when opened', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await user.click(screen.getByRole('button'));

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('shows country options in listbox when opened', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);

      expect(screen.getByText(/france/i)).toBeInTheDocument();
      expect(screen.getByText(/germany/i)).toBeInTheDocument();
    });

    it('closes dropdown and restores trigger button when Escape is pressed', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });

    it('closes when clicking outside', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.click(document.body);

      await waitFor(() => {
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });
  });

  describe('Search functionality', () => {
    it('filters countries as user types', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.type(screen.getByRole('textbox'), 'fra');

      await waitFor(() => {
        expect(screen.getByText(/france/i)).toBeInTheDocument();
        expect(screen.queryByText(/germany/i)).not.toBeInTheDocument();
      });
    });

    it('filters countries by ISO code', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.type(screen.getByRole('textbox'), 'DE');

      await waitFor(() => {
        expect(screen.getByText(/germany/i)).toBeInTheDocument();
        expect(screen.queryByText(/france/i)).not.toBeInTheDocument();
      });
    });

    it('shows empty state when no countries match', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.type(screen.getByRole('textbox'), 'zzzzzzz');

      await waitFor(() => {
        const listbox = screen.getByRole('listbox');
        expect(within(listbox).queryByRole('option')).not.toBeInTheDocument();
      });
    });

    it('resets search query when dropdown is closed and reopened', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.type(screen.getByRole('textbox'), 'fra');

      // Close with Escape
      await user.keyboard('{Escape}');
      await waitFor(() => screen.getByRole('button'));

      // Reopen
      await openDropdown(user);

      // After reopening, all countries are shown (search was reset)
      expect(screen.getByText(/germany/i)).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('calls onChange with country code when a country is selected', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      renderUncontrolled({ onChange });

      await openDropdown(user);

      const franceOption = await screen.findByRole('option', {
        name: /france/i,
      });
      await user.click(franceOption);

      expect(onChange).toHaveBeenCalledWith('FR');
    });

    it('calls onCountrySelect with country object when a country is selected', async () => {
      const onCountrySelect = vi.fn();
      const user = userEvent.setup();
      renderUncontrolled({ onCountrySelect });

      await openDropdown(user);

      const franceOption = await screen.findByRole('option', {
        name: /france/i,
      });
      await user.click(franceOption);

      expect(onCountrySelect).toHaveBeenCalledWith(
        expect.objectContaining({ code: 'FR' })
      );
    });

    it('closes dropdown after selecting a country', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);

      const franceOption = screen.getByRole('option', { name: /france/i });
      await user.click(franceOption);

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
    });

    it('displays selected country name in button after selection (controlled)', async () => {
      const user = userEvent.setup();
      renderControlled();

      await openDropdown(user);

      const franceOption = screen.getByRole('option', { name: /france/i });
      await user.click(franceOption);

      await waitFor(() => {
        // After closing, listbox disappears and the trigger button shows the selected label
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        expect(screen.getByText(/france/i)).toBeInTheDocument();
      });
    });
  });

  describe('Keyboard navigation', () => {
    it('navigates to first option with ArrowDown key', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options[0]).toHaveClass('bg-accent');
      });
    });

    it('navigates back with ArrowUp key', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);

      // Move down twice then up once — should be at index 0
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}');

      await waitFor(() => {
        const options = screen.getAllByRole('option');
        expect(options[0]).toHaveClass('bg-accent');
      });
    });

    it('selects highlighted option with Enter key', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      renderUncontrolled({ onChange });

      await openDropdown(user);

      // Filter to one result then select with Enter
      await user.type(screen.getByRole('textbox'), 'france');

      await waitFor(() => {
        expect(
          screen.getByRole('option', { name: /france/i })
        ).toBeInTheDocument();
      });

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith('FR');
      });
    });

    it('opens dropdown with ArrowDown on trigger button', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });
  });

  describe('Clear selection', () => {
    it('shows clear button when a value is selected', () => {
      renderUncontrolled({ value: 'FR' });
      expect(
        screen.getByRole('button', { name: /clear/i })
      ).toBeInTheDocument();
    });

    it('calls onChange with empty string when clear is clicked', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();
      renderUncontrolled({ value: 'FR', onChange });

      await user.click(screen.getByRole('button', { name: /clear/i }));

      expect(onChange).toHaveBeenCalledWith('');
    });

    it('does not show clear button when no value is selected', () => {
      renderUncontrolled({ value: '' });
      expect(
        screen.queryByRole('button', { name: /clear/i })
      ).not.toBeInTheDocument();
    });

    it('does not show clear button when disabled', () => {
      renderUncontrolled({ value: 'FR', disabled: true });
      expect(
        screen.queryByRole('button', { name: /clear/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('Scrolling', () => {
    it('renders all country options in the listbox', async () => {
      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);

      const listbox = screen.getByRole('listbox');
      const options = within(listbox).getAllByRole('option');
      // EUROPEAN_COUNTRIES array has 45 entries
      expect(options.length).toBe(45);
    });

    it('scrolls highlighted item into view when navigating with keyboard', async () => {
      const scrollIntoViewMock = vi.fn();
      Element.prototype.scrollIntoView = scrollIntoViewMock;

      const user = userEvent.setup();
      renderUncontrolled();

      await openDropdown(user);
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(scrollIntoViewMock).toHaveBeenCalled();
      });
    });
  });
});
