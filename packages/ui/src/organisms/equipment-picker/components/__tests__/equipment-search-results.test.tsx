import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranslationProvider } from '@staamina/ui/i18n';
import { EquipmentSearchResults } from '../equipment-search-results';
import type { Equipment } from '@staamina/types';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <TranslationProvider>{children}</TranslationProvider>;
};

const mockEquipment: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Air Conditioner Unit 1',
    type: 'HVAC',
    category: {
      id: 'cat-1',
      name: 'HVAC',
      parentId: null,
    },
    model: {
      id: 'model-1',
      name: 'AC-5000',
      categoryId: 'cat-1',
      brand: {
        id: 'brand-1',
        name: 'CoolAir',
      },
    },
    floor: {
      id: 'floor-1',
      number: 1,
      siteBuilding: {
        site: {
          id: 'site-1',
          name: 'Main Site',
        },
      },
    },
    siteId: 'site-1',
  },
  {
    id: 'eq-2',
    name: 'Heating Unit 2',
    type: 'HVAC',
    category: {
      id: 'cat-1',
      name: 'HVAC',
      parentId: null,
    },
    model: {
      id: 'model-2',
      name: 'HT-3000',
      categoryId: 'cat-1',
      brand: {
        id: 'brand-2',
        name: 'HeatTech',
      },
    },
    floor: {
      id: 'floor-2',
      number: 2,
      siteBuilding: {
        site: {
          id: 'site-1',
          name: 'Main Site',
        },
      },
    },
    siteId: 'site-1',
  },
];

describe('EquipmentSearchResults', () => {
  const mockOnEquipmentClick = vi.fn();

  it('should not render when search query is empty', () => {
    const { container } = render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={mockEquipment}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery=""
        />
      </TestWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render when loading', () => {
    const { container } = render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={mockEquipment}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery="air"
          isLoading={true}
        />
      </TestWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should display search results with count', () => {
    render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={mockEquipment}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery="unit"
        />
      </TestWrapper>
    );

    expect(screen.getByText(/\(2\)/)).toBeInTheDocument();
  });

  it('should render all equipment cards', () => {
    render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={mockEquipment}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery="unit"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Air Conditioner Unit 1')).toBeInTheDocument();
    expect(screen.getByText('Heating Unit 2')).toBeInTheDocument();
  });

  it('should highlight selected equipment', () => {
    render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={mockEquipment}
          selectedEquipment={mockEquipment[0]}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery="unit"
        />
      </TestWrapper>
    );

    const selectedCard = screen
      .getByText('Air Conditioner Unit 1')
      .closest('.equipment-card');
    expect(selectedCard).toHaveClass('border-brand-primary');
  });

  it('should call onEquipmentClick when card is clicked', async () => {
    const user = userEvent.setup();

    render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={mockEquipment}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery="unit"
        />
      </TestWrapper>
    );

    const equipmentCard = screen
      .getByText('Air Conditioner Unit 1')
      .closest('div');
    if (equipmentCard) {
      await user.click(equipmentCard);
    }

    expect(mockOnEquipmentClick).toHaveBeenCalledWith(mockEquipment[0]);
  });

  it('should display empty state when no results', () => {
    render(
      <TestWrapper>
        <EquipmentSearchResults
          equipments={[]}
          onEquipmentClick={mockOnEquipmentClick}
          searchQuery="nonexistent"
        />
      </TestWrapper>
    );

    expect(screen.getByText(/no equipment/i)).toBeInTheDocument();
  });
});
