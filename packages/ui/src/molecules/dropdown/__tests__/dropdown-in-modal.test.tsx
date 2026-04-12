import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dropdown } from '../dropdown';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from '@staamina/ui/modal';
import { TranslationProvider } from '@staamina/ui/i18n';

const OPTIONS = [
  { value: 'admin', label: 'Administrator' },
  { value: 'manager', label: 'SiteManager' },
  { value: 'staff', label: 'SiteStaff' },
];

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe('Dropdown inside Modal', () => {
  beforeEach(() => {
    const mockRect = {
      top: 100,
      bottom: 140,
      left: 20,
      width: 200,
      height: 40,
      x: 20,
      y: 100,
      right: 220,
      toJSON: () => {},
    };
    Element.prototype.getBoundingClientRect = vi.fn(() => mockRect);
  });

  it('allows selecting an option when dropdown is open inside a modal', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <Modal open size="md">
          <ModalHeader>
            <ModalTitle>Test modal</ModalTitle>
            <ModalDescription>Dropdown inside modal</ModalDescription>
          </ModalHeader>
          <div className="p-4">
            <Dropdown
              options={OPTIONS}
              onChange={onChange}
              onSelect={onSelect}
              searchable
              placeholder="Select role"
            />
          </div>
        </Modal>
      </TestWrapper>
    );

    const trigger = screen.getByRole('button', { name: /select role/i });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    const option = screen.getByText('SiteManager');
    expect(option).toBeInTheDocument();

    await user.click(option);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('manager');
    });
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'manager', label: 'SiteManager' })
    );
  });
});
