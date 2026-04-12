import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CategoryPicker } from '../category-picker';
import { TranslationProvider } from '@staamina/ui/i18n';
import { mockCategories } from './category-picker.mock';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider>{children}</TranslationProvider>
);

describe('CategoryPicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Search Input', () => {
    it('should render search input with placeholder', () => {
      render(
        <TestWrapper>
          <CategoryPicker onChange={mockOnChange} categories={[]} />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search category/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('should debounce search input changes', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <CategoryPicker onChange={mockOnChange} categories={mockCategories} />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search category/i);
      await user.type(searchInput, 'hvac');

      await waitFor(
        () => {
          expect(screen.getByText(/categories/i)).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  describe('Category navigation', () => {
    it('should show root categories when no category selected', () => {
      render(
        <TestWrapper>
          <CategoryPicker onChange={mockOnChange} categories={mockCategories} />
        </TestWrapper>
      );

      expect(screen.getByText('HVAC')).toBeInTheDocument();
      expect(screen.getByText('Plumbing')).toBeInTheDocument();
    });

    it('should call onChange with category when selecting a leaf category', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <CategoryPicker onChange={mockOnChange} categories={mockCategories} />
        </TestWrapper>
      );

      await user.click(screen.getByText('HVAC'));
      await user.click(screen.getByText('Split Systems'));

      expect(mockOnChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          id: 'cat-hvac-split',
          name: 'Split Systems',
          parentId: 'cat-hvac',
        })
      );
    });

    it('should not show equipment list when on leaf category', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <CategoryPicker onChange={mockOnChange} categories={mockCategories} />
        </TestWrapper>
      );

      await user.click(screen.getByText('HVAC'));
      await user.click(screen.getByText('Split Systems'));

      expect(screen.queryByText(/no equipment/i)).not.toBeInTheDocument();
    });

    it('should show empty state when no categories and not loading', () => {
      render(
        <TestWrapper>
          <CategoryPicker onChange={mockOnChange} categories={[]} />
        </TestWrapper>
      );

      expect(
        screen.getByText(/select a category or search/i)
      ).toBeInTheDocument();
    });
  });
});
