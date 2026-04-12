import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider, useToast } from '../toast-provider';
import type { ToastType } from '../toast.types';

// Helper component that triggers a toast on button click
const ToastTrigger = ({
  type = 'info',
  message = 'Test message',
  title,
  duration,
}: {
  type?: ToastType;
  message?: string;
  title?: string;
  duration?: number;
}) => {
  const { onShowToast } = useToast();
  return (
    <button onClick={() => onShowToast({ type, message, title, duration })}>
      Show Toast
    </button>
  );
};

// Helper component that triggers N toasts at once
const MultiToastTrigger = ({ count }: { count: number }) => {
  const { onShowToast } = useToast();
  return (
    <button
      onClick={() => {
        for (let i = 0; i < count; i++) {
          onShowToast({ type: 'info', message: `Toast ${i + 1}` });
        }
      }}
    >
      Show {count} toasts
    </button>
  );
};

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders children without errors', () => {
    render(
      <ToastProvider>
        <div>App content</div>
      </ToastProvider>
    );
    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('shows a toast message when onShowToast is called', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger message="Hello world" />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('shows toast with title when title is provided', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger message="Body message" title="Toast Title" />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    expect(screen.getByText('Toast Title')).toBeInTheDocument();
    expect(screen.getByText('Body message')).toBeInTheDocument();
  });

  it('does not render title element when title is omitted', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger message="Message only" />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    expect(screen.getByText('Message only')).toBeInTheDocument();
    // Only one text node — the title should be absent
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
  });

  it('limits the number of simultaneous toasts to 5', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <MultiToastTrigger count={7} />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show 7 toasts' }));

    // Only the 5 most recent toasts should be visible (slice to MAX_TOASTS)
    const toast1 = screen.queryByText('Toast 1');
    const toast2 = screen.queryByText('Toast 2');
    const toast3 = screen.queryByText('Toast 3');
    const toast4 = screen.queryByText('Toast 4');
    const toast5 = screen.queryByText('Toast 5');
    const toast6 = screen.queryByText('Toast 6');
    const toast7 = screen.queryByText('Toast 7');

    // Toasts 3–7 should be visible (7 added, newest first, slice to 5)
    expect(toast3).toBeInTheDocument();
    expect(toast4).toBeInTheDocument();
    expect(toast5).toBeInTheDocument();
    expect(toast6).toBeInTheDocument();
    expect(toast7).toBeInTheDocument();
    // Toasts 1 and 2 overflow the limit
    expect(toast1).not.toBeInTheDocument();
    expect(toast2).not.toBeInTheDocument();
  });

  it('removes toast from DOM after duration expires', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger message="Auto-dismiss toast" duration={1000} />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));
    expect(screen.getByText('Auto-dismiss toast')).toBeInTheDocument();

    // Advance past duration + exit animation delay
    act(() => {
      vi.advanceTimersByTime(1000 + 300 + 100);
    });

    expect(screen.queryByText('Auto-dismiss toast')).not.toBeInTheDocument();
  });

  it('throws when useToast is used outside ToastProvider', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    expect(() => render(<ToastTrigger message="outside" />)).toThrow(
      'useToast must be used within ToastProvider'
    );

    consoleError.mockRestore();
  });
});
