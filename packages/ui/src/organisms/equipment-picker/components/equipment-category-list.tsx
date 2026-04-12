import * as React from 'react';
import type { Equipment } from '@staamina/types';
import { VirtualList } from '@staamina/ui/virtual-list';
import { EquipmentCard } from './equipment-card';
import { useTranslation } from '@staamina/ui/i18n';
import type { CategoryTreeNode } from '../equipment-picker.utils';

export interface EquipmentCategoryListProps {
  selectedEquipment?: Equipment | null;
  onEquipmentClick: (equipment: Equipment) => void;
  selectedCategory: CategoryTreeNode | null;
  equipmentByCategory?: Equipment[];
  isLoadingEquipmentByCategory?: boolean;
  equipmentByCategoryError?: { message?: string } | null;
}

export function EquipmentCategoryList({
  selectedEquipment,
  onEquipmentClick,
  selectedCategory,
  equipmentByCategory = [],
  isLoadingEquipmentByCategory = false,
  equipmentByCategoryError,
}: EquipmentCategoryListProps) {
  const { t } = useTranslation();

  const categoryId = selectedCategory?.id;
  const categoryName = selectedCategory?.name;

  const filteredEquipments = React.useMemo(() => {
    if (!categoryId) {
      return [];
    }

    return equipmentByCategory.filter((equipment) => {
      const equipmentCategoryId =
        equipment.category?.id || equipment.model?.categoryId;

      return equipmentCategoryId === categoryId;
    });
  }, [categoryId, equipmentByCategory]);

  if (isLoadingEquipmentByCategory) {
    return null;
  }

  if (equipmentByCategoryError) {
    return null;
  }

  if (!categoryId) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-text-secondary">
        {t.ui.selectCategoryOrSearch}
      </div>
    );
  }

  if (filteredEquipments.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-text-secondary">
        {t.ui.noEquipmentAvailable}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      {categoryName && (
        <div className="text-xs font-medium text-text-secondary px-1">
          {categoryName} ({filteredEquipments.length})
        </div>
      )}
      <div className="h-96 w-full min-w-0">
        <VirtualList
          data={filteredEquipments}
          className="scrollbar-hide"
          estimateSize={() => 104}
        >
          {(equipment) => (
            <div key={equipment.id}>
              <EquipmentCard
                equipment={equipment}
                isSelected={selectedEquipment?.id === equipment.id}
                onClick={() => onEquipmentClick(equipment)}
              />
            </div>
          )}
        </VirtualList>
      </div>
    </div>
  );
}
