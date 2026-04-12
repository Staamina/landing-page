import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranslationProvider } from '@staamina/ui/i18n';
import { EquipmentCategoryList } from '../equipment-category-list';
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
    name: 'Air Conditioner Unit 2',
    type: 'HVAC',
    category: {
      id: 'cat-1',
      name: 'HVAC',
      parentId: null,
    },
    model: {
      id: 'model-2',
      name: 'AC-3000',
      categoryId: 'cat-1',
      brand: {
        id: 'brand-2',
        name: 'CoolTech',
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

const mockCategoryNode = {
  id: 'cat-1',
  name: 'HVAC',
  parentId: null,
  children: [],
  parent: null,
};

describe('EquipmentCategoryList', () => {
  const mockOnEquipmentClick = vi.fn();

  it('should display message when no category is selected', () => {
    render(
      <TestWrapper>
        <EquipmentCategoryList
          onEquipmentClick={mockOnEquipmentClick}
          selectedCategory={null}
          equipmentByCategory={[]}
        />
      </TestWrapper>
    );

    expect(
      screen.getByText(/select a category or search/i)
    ).toBeInTheDocument();
  });

  it('should display category name with count', () => {
    render(
      <TestWrapper>
        <EquipmentCategoryList
          onEquipmentClick={mockOnEquipmentClick}
          selectedCategory={mockCategoryNode}
          equipmentByCategory={mockEquipment}
        />
      </TestWrapper>
    );

    expect(screen.getByText('HVAC (2)')).toBeInTheDocument();
  });

  it('should render all equipment cards', () => {
    render(
      <TestWrapper>
        <EquipmentCategoryList
          onEquipmentClick={mockOnEquipmentClick}
          selectedCategory={mockCategoryNode}
          equipmentByCategory={mockEquipment}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Air Conditioner Unit 1')).toBeInTheDocument();
    expect(screen.getByText('Air Conditioner Unit 2')).toBeInTheDocument();
  });

  it('should highlight selected equipment', () => {
    render(
      <TestWrapper>
        <EquipmentCategoryList
          selectedEquipment={mockEquipment[0]}
          onEquipmentClick={mockOnEquipmentClick}
          selectedCategory={mockCategoryNode}
          equipmentByCategory={mockEquipment}
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
        <EquipmentCategoryList
          onEquipmentClick={mockOnEquipmentClick}
          selectedCategory={mockCategoryNode}
          equipmentByCategory={mockEquipment}
        />
      </TestWrapper>
    );

    const equipmentCard = screen
      .getByText('Air Conditioner Unit 1')
      .closest('.equipment-card');
    if (equipmentCard) {
      await user.click(equipmentCard);
    }

    expect(mockOnEquipmentClick).toHaveBeenCalledWith(mockEquipment[0]);
  });

  it('should display empty state when no equipment in category', () => {
    render(
      <TestWrapper>
        <EquipmentCategoryList
          onEquipmentClick={mockOnEquipmentClick}
          selectedCategory={mockCategoryNode}
          equipmentByCategory={[]}
        />
      </TestWrapper>
    );

    expect(screen.getByText(/no equipment/i)).toBeInTheDocument();
  });
});
