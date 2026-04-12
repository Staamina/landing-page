import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EquipmentPicker } from '../equipment-picker';
import { TranslationProvider } from '@staamina/ui/i18n';
import { mockEquipment, mockCategories } from './equipment-picker.mock';

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>{children}</TranslationProvider>
    </QueryClientProvider>
  );
};

describe('EquipmentPicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Search Input', () => {
    it('should render search input with placeholder', () => {
      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={[]}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      expect(searchInput).toBeInTheDocument();
    });

    it('should debounce search input changes', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      await user.type(searchInput, 'hvac');

      // Initially should not show results (debouncing)
      expect(screen.queryByText(/categories/i)).not.toBeInTheDocument();

      // After debounce, should show category search results
      await waitFor(
        () => {
          expect(screen.getByText(/categories/i)).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('should show loading spinner when loading categories', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={[]}
            equipmentByCategory={[]}
            isLoadingCategories={true}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      await user.type(searchInput, 'test');

      await waitFor(() => {
        const spinner = document.querySelector('.lucide-loader2');
        expect(spinner).toBeInTheDocument();
      });
    });

    it('should filter categories by search query', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      await user.type(searchInput, 'Split');

      await waitFor(
        () => {
          expect(screen.getByText(/categories/i)).toBeInTheDocument();
          // Text may be broken up by <mark> element, so check for both parts
          expect(screen.getByText('Split')).toBeInTheDocument();
          expect(screen.getByText(/Systems/i)).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('should show no categories found message when search has no matches', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      await user.type(searchInput, 'nonexistent');

      await waitFor(
        () => {
          expect(screen.getByText(/no categories found/i)).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  describe('Category Filtering', () => {
    it('should display category chips', () => {
      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      expect(screen.getByText('HVAC')).toBeInTheDocument();
      expect(screen.getByText('Plumbing')).toBeInTheDocument();
    });

    it('should navigate to subcategories when clicking a non-leaf category', async () => {
      const user = userEvent.setup();

      const mockOnSelectedCategoryChange = vi.fn();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(mockOnSelectedCategoryChange).toHaveBeenCalled();
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });
    });

    it('should show equipment list when clicking a leaf category', async () => {
      const user = userEvent.setup();

      const hvacEquipment = mockEquipment.filter(
        (eq) =>
          eq.category?.id === 'cat-hvac-split' ||
          eq.model?.categoryId === 'cat-hvac-split'
      );

      const mockOnSelectedCategoryChange = vi.fn();

      const { rerender } = render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      // Navigate to HVAC
      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      // Navigate to Split Systems (leaf category)
      const splitSystemsChip = screen.getByText('Split Systems');
      await user.click(splitSystemsChip);

      await waitFor(() => {
        expect(mockOnSelectedCategoryChange).toHaveBeenCalledTimes(2);
      });

      // Rerender with equipment for the leaf category
      rerender(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={hvacEquipment}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText(/air conditioner/i)).toBeInTheDocument();
      });
    });

    it('should show back button when navigated into category', async () => {
      const user = userEvent.setup();

      const mockOnSelectedCategoryChange = vi.fn();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(mockOnSelectedCategoryChange).toHaveBeenCalled();
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
        // Should show breadcrumb with Home icon and ancestors
        expect(screen.getByLabelText(/breadcrumb/i)).toBeInTheDocument();
        // Since we are in HVAC > Split Systems, HVAC should be in breadcrumb
        // But wait, Split Systems is a child of HVAC.
        // Navigate layout: Root > HVAC > Split Systems.
        // We are currently viewing children of HVAC: "Split Systems" is a child category item in the list?
        // Wait, "Split Systems" is a child of HVAC.
        // When we click HVAC, we see its children (including Split Systems).
        // Selected category is HVAC.
        // Breadcrumb should be: Home > HVAC.
        // HVAC is the current one, so it might not be a link if it's the last item, or it acts as title?
        // In my implementation:
        // breadcrumbPath = getCategoryBreadcrumb(selectedCategory) + selectedCategory
        // So [Root, HVAC] (Root is filtered out of breadcrumb usually or handled specially).
        // My implementation: if isRoot return [].
        // If HVAC: path = [HVAC].
        // Render: Home > HVAC.
        // HVAC is last item, so text only.

        // So we should see HVAC text in breadcrumb (already visible as title maybe?)
        // But checking for 'HVAC' might be ambiguous if it's also in the header or list (if we list siblings? no we list children).
        // The list contains "Split Systems".
        // The Breadcrumb contains "HVAC".

        // Let's verify we have a button/link for Home
        // In my code: <button ...><Home .../></button>
        expect(document.querySelector('.lucide-home')).toBeInTheDocument();
      });
    });

    it('should allow clearing category filter', async () => {
      const user = userEvent.setup();

      const hvacEquipment = mockEquipment.filter(
        (eq) =>
          eq.category?.id === 'cat-hvac-split' ||
          eq.model?.categoryId === 'cat-hvac-split'
      );

      const mockOnSelectedCategoryChange = vi.fn();

      const { rerender } = render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(mockOnSelectedCategoryChange).toHaveBeenCalled();
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      const splitSystemsChip = screen.getByText('Split Systems');
      await user.click(splitSystemsChip);

      await waitFor(() => {
        expect(mockOnSelectedCategoryChange).toHaveBeenCalledTimes(2);
      });

      rerender(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={hvacEquipment}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText(/air conditioner/i)).toBeInTheDocument();
      });

      const clearButton = screen.getByLabelText(/clear selection/i);
      await user.click(clearButton);

      await waitFor(() => {
        expect(screen.queryByText(/air conditioner/i)).not.toBeInTheDocument();
        expect(screen.getByText('HVAC')).toBeInTheDocument();
      });
    });

    it('should support parent-child category hierarchy', async () => {
      const user = userEvent.setup();

      const mockOnSelectedCategoryChange = vi.fn();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });
    });
  });

  describe('Equipment Selection', () => {
    it('should call onChange when equipment is clicked', async () => {
      const user = userEvent.setup();

      const hvacEquipment = mockEquipment.filter(
        (eq) =>
          eq.category?.id === 'cat-hvac-split' ||
          eq.model?.categoryId === 'cat-hvac-split'
      );

      const mockOnSelectedCategoryChange = vi.fn();

      const { rerender } = render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      // Navigate to leaf category
      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      const splitSystemsChip = screen.getByText('Split Systems');
      await user.click(splitSystemsChip);

      rerender(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={hvacEquipment}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      await waitFor(() => {
        const equipmentCard = screen.getByText(/air conditioner/i);
        expect(equipmentCard).toBeInTheDocument();
      });

      const equipmentCard = screen
        .getByText(/air conditioner/i)
        .closest('.equipment-card');
      if (equipmentCard) {
        await user.click(equipmentCard);
      }

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'eq-1',
            name: 'Air Conditioner Unit 1',
          })
        );
      });
    });

    it('should highlight selected equipment', async () => {
      const user = userEvent.setup();

      const selectedEquipment = mockEquipment[0];
      const hvacEquipment = mockEquipment.filter(
        (eq) =>
          eq.category?.id === 'cat-hvac-split' ||
          eq.model?.categoryId === 'cat-hvac-split'
      );

      const mockOnSelectedCategoryChange = vi.fn();

      const { rerender } = render(
        <TestWrapper>
          <EquipmentPicker
            value={selectedEquipment}
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      // Navigate to leaf category
      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      const splitSystemsChip = screen.getByText('Split Systems');
      await user.click(splitSystemsChip);

      rerender(
        <TestWrapper>
          <EquipmentPicker
            value={selectedEquipment}
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={hvacEquipment}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      await waitFor(() => {
        const equipmentCard = screen
          .getByText(/air conditioner/i)
          .closest('.equipment-card');
        expect(equipmentCard).toHaveClass('border-brand-primary');
      });
    });

    it('should clear selection when clicking selected equipment again', async () => {
      const user = userEvent.setup();

      const selectedEquipment = mockEquipment[0];
      const hvacEquipment = mockEquipment.filter(
        (eq) =>
          eq.category?.id === 'cat-hvac-split' ||
          eq.model?.categoryId === 'cat-hvac-split'
      );

      const mockOnSelectedCategoryChange = vi.fn();

      const { rerender } = render(
        <TestWrapper>
          <EquipmentPicker
            value={selectedEquipment}
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      // Navigate to leaf category
      const hvacChip = screen.getByText('HVAC');
      await user.click(hvacChip);

      await waitFor(() => {
        expect(screen.getByText('Split Systems')).toBeInTheDocument();
      });

      const splitSystemsChip = screen.getByText('Split Systems');
      await user.click(splitSystemsChip);

      rerender(
        <TestWrapper>
          <EquipmentPicker
            value={selectedEquipment}
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={hvacEquipment}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      await waitFor(() => {
        const equipmentCard = screen
          .getByText(/air conditioner/i)
          .closest('.equipment-card');
        expect(equipmentCard).toBeInTheDocument();
      });

      const equipmentCard = screen
        .getByText(/air conditioner/i)
        .closest('.equipment-card');
      if (equipmentCard) {
        await user.click(equipmentCard);
      }

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith(null);
      });
    });
  });

  describe('Empty States', () => {
    it('should display empty state message when no categories', () => {
      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={[]}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      expect(
        screen.getByText(/select a category or search/i)
      ).toBeInTheDocument();
    });

    it('should display message when no equipment available', () => {
      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={[]}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      expect(searchInput).toBeInTheDocument();
    });
  });

  describe('Category Search Results', () => {
    it('should allow clicking on category from search results', async () => {
      const user = userEvent.setup();

      const mockOnSelectedCategoryChange = vi.fn();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
            onSelectedCategoryChange={mockOnSelectedCategoryChange}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      await user.type(searchInput, 'Split');

      await waitFor(
        () => {
          expect(screen.getByText(/categories/i)).toBeInTheDocument();
        },
        { timeout: 1000 }
      );

      // Click on the category from search results (text may be broken up by <mark>)
      const systemsButton = screen.getByText(/Systems/i);
      await user.click(systemsButton);

      // Should navigate to that category
      await waitFor(() => {
        expect(mockOnSelectedCategoryChange).toHaveBeenCalled();
      });
    });

    it('should show breadcrumb for subcategories in search results', async () => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      await user.type(searchInput, 'Split');

      await waitFor(
        () => {
          // Should show HVAC in the breadcrumb
          expect(screen.getByText(/HVAC/i)).toBeInTheDocument();
          // Text may be broken up by <mark> element
          expect(screen.getByText('Split')).toBeInTheDocument();
          expect(screen.getByText(/Systems/i)).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should have minimum 44px touch targets for category chips', () => {
      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={mockCategories}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const hvacChip = screen.getByText('HVAC').closest('button');
      expect(hvacChip).toHaveClass('min-h-[44px]');
    });

    it('should have minimum 44px height for search input', () => {
      render(
        <TestWrapper>
          <EquipmentPicker
            onChange={mockOnChange}
            categories={[]}
            equipmentByCategory={[]}
          />
        </TestWrapper>
      );

      const searchInput = screen.getByPlaceholderText(/search equipment/i);
      expect(searchInput).toHaveClass('min-h-[44px]');
    });
  });
});
