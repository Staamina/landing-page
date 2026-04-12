import * as React from 'react';
import { afterEach, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
global.URL.revokeObjectURL = vi.fn();

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock('@itsmeadarsh/warper', () => ({
  WarperComponent: ({
    itemCount,
    children,
    className,
    style,
  }: {
    itemCount: number;
    children: (index: number) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }) =>
    React.createElement(
      'div',
      { className, style, 'data-testid': 'virtual-list-mock' },
      Array.from({ length: itemCount }, (_, index) => children(index))
    ),
}));

beforeEach(() => {
  vi.mocked(global.URL.createObjectURL).mockReturnValue('blob:mock-url');
  vi.mocked(global.URL.revokeObjectURL).mockClear();
});

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to') &&
      args[0].includes('inside a test was not wrapped in act(...)')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

afterEach(() => {
  cleanup();
});
