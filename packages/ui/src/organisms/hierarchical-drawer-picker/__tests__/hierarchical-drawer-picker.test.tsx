import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TooltipProvider } from '@staamina/ui/tooltip';
import { HierarchicalDrawerPicker } from '../hierarchical-drawer-picker';
import { mockOptions } from './hierarchical-drawer-picker.mock';

const _TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TooltipProvider>{children}</TooltipProvider>
);

function renderWithTooltip(ui: React.ReactElement) {
  return render(ui, { wrapper: _TestWrapper });
}

vi.mock('@staamina/ui/drawer', () => ({
  DrawerRoot: ({
    open,
    children,
  }: {
    open: boolean;
    children: React.ReactNode;
  }) => <div data-testid="drawer-root">{open ? children : null}</div>,
  DrawerContent: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div
      data-testid="drawer-content"
      className={className}
      role="dialog"
      {...props}
    >
      {children}
    </div>
  ),
  DrawerHeader: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="drawer-header" className={className} {...props}>
      {children}
    </div>
  ),
  DrawerTitle: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="drawer-title" className={className} {...props}>
      {children}
    </div>
  ),
}));

const defaultProps = {
  sectionLabel: 'Category',
  options: mockOptions,
  value: null,
  placeholder: 'Choose…',
  onChange: vi.fn(),
};

describe('HierarchicalDrawerPicker', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('trigger', () => {
    it('should render trigger with section label and placeholder when no value', () => {
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);

      const trigger = screen.getByRole('button', {
        name: /Category.*Choose/i,
      });
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('Choose…')).toBeInTheDocument();
    });

    it('should render trigger with section label and value when value is set', () => {
      renderWithTooltip(
        <HierarchicalDrawerPicker
          {...defaultProps}
          value={{ value: 'hvac-split', label: 'Split Systems' }}
        />
      );

      const trigger = screen.getByRole('button', {
        name: /Category.*Split Systems/i,
      });
      expect(trigger).toBeInTheDocument();
      expect(screen.getByText('Split Systems')).toBeInTheDocument();
    });

    it('should have aria-haspopup="dialog" on trigger', () => {
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);
      const trigger = screen.getByRole('button', { name: /Category/i });
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('should not open drawer when trigger is clicked and disabled', async () => {
      const user = userEvent.setup();
      renderWithTooltip(
        <HierarchicalDrawerPicker {...defaultProps} disabled />
      );

      const trigger = screen.getByRole('button', { name: /Category/i });
      await user.click(trigger);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('drawer open and options', () => {
    it('should open drawer and show root options when trigger is clicked', async () => {
      const user = userEvent.setup();
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /Category/i }));

      await waitFor(() => {
        expect(
          screen.getByRole('dialog', { name: 'Category' })
        ).toBeInTheDocument();
      });

      expect(screen.getByText('HVAC')).toBeInTheDocument();
      expect(screen.getByText('Electrical')).toBeInTheDocument();
      expect(screen.getByText('Plumbing')).toBeInTheDocument();
      const listbox = screen.getByRole('listbox', { name: 'Options' });
      expect(listbox).toBeInTheDocument();
    });

    it('should show back button and update title when drilling down', async () => {
      const user = userEvent.setup();
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /Category/i }));

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: /HVAC/i }));

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Back' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('dialog', { name: 'HVAC' })
        ).toBeInTheDocument();
      });

      expect(screen.getByText('Split Systems')).toBeInTheDocument();
      expect(screen.getByText('Central Air')).toBeInTheDocument();
    });

    it('should go back to parent level when Back is clicked', async () => {
      const user = userEvent.setup();
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /Category/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: /HVAC/i }));
      await waitFor(() => {
        expect(
          screen.getByRole('dialog', { name: 'HVAC' })
        ).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: 'Back' }));

      await waitFor(() => {
        expect(
          screen.getByRole('dialog', { name: 'Category' })
        ).toBeInTheDocument();
        expect(screen.getByText('HVAC')).toBeInTheDocument();
      });
    });

    it('should call onChange and close drawer when selecting a leaf option', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderWithTooltip(
        <HierarchicalDrawerPicker {...defaultProps} onChange={onChange} />
      );

      await user.click(screen.getByRole('button', { name: /Category/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: /HVAC/i }));
      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      await user.click(screen.getByRole('option', { name: 'Split Systems' }));

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 'hvac-split',
          label: 'Split Systems',
        })
      );

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should close drawer when Close button is clicked', async () => {
      const user = userEvent.setup();
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /Category/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: 'Close' }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('reset path on open', () => {
    it('should show root options when opening drawer again after drill-down', async () => {
      const user = userEvent.setup();
      renderWithTooltip(<HierarchicalDrawerPicker {...defaultProps} />);

      await user.click(screen.getByRole('button', { name: /Category/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      await user.click(screen.getByRole('option', { name: /HVAC/i }));
      await waitFor(() => {
        expect(
          screen.getByRole('dialog', { name: 'HVAC' })
        ).toBeInTheDocument();
      });
      await user.click(screen.getByRole('button', { name: 'Close' }));

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });

      await user.click(screen.getByRole('button', { name: /Category/i }));

      await waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-label', 'Category');
        expect(screen.getByText('HVAC')).toBeInTheDocument();
        expect(screen.getByText('Electrical')).toBeInTheDocument();
      });
    });
  });

  describe('keyboard', () => {
    it('should select option on Enter key', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderWithTooltip(
        <HierarchicalDrawerPicker {...defaultProps} onChange={onChange} />
      );

      await user.click(screen.getByRole('button', { name: /Category/i }));
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
      await user.click(screen.getByRole('option', { name: /HVAC/i }));
      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      const leafOption = screen.getByRole('option', { name: 'Split Systems' });
      leafOption.focus();
      await user.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 'hvac-split',
          label: 'Split Systems',
        })
      );
    });
  });

  describe('empty options', () => {
    it('should render trigger and open drawer with empty list when options is empty', async () => {
      const user = userEvent.setup();
      renderWithTooltip(
        <HierarchicalDrawerPicker {...defaultProps} options={[]} />
      );

      await user.click(screen.getByRole('button', { name: /Category/i }));

      await waitFor(() => {
        expect(
          screen.getByRole('dialog', { name: 'Category' })
        ).toBeInTheDocument();
      });

      const listbox = screen.getByRole('listbox', { name: 'Options' });
      expect(listbox).toBeInTheDocument();
      expect(listbox.querySelectorAll('[role="option"]')).toHaveLength(0);
    });
  });
});
