'use client';

import * as React from 'react';

import type { Equipment } from '@staamina/types';

import { useTranslation } from '@staamina/ui/i18n';
import { cn } from '@staamina/ui/utils';
import { SelectableCard } from '@staamina/ui/selectable-card';

export interface EquipmentCardProps {
  equipment: Equipment;
  isSelected?: boolean;
  onClick: () => void;
  className?: string;
}

export const EquipmentCard = React.forwardRef<
  HTMLButtonElement,
  EquipmentCardProps
>(({ equipment, isSelected, onClick, className }, ref) => {
  const { t } = useTranslation();
  return (
    <SelectableCard
      ref={ref}
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      isSelected={isSelected}
      className={cn('equipment-card min-h-fit', className)}
    >
      <div className="flex w-full min-w-0 items-start justify-between text-left">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-text-primary">
            {equipment.name}
          </p>
          {equipment.type && (
            <p className="text-sm text-text-secondary">
              {t.ui.equipmentType} {equipment.type}
            </p>
          )}
        </div>
      </div>
      <div className="flex min-w-0 flex-wrap gap-x-4 gap-y-1 text-left text-sm text-text-secondary">
        {equipment.model?.brand?.name && (
          <span>
            {t.ui.equipmentBrand} {equipment.model.brand.name}
          </span>
        )}
        {equipment.model?.name && (
          <span>
            {t.ui.equipmentModel} {equipment.model.name}
          </span>
        )}
        {equipment.category?.name && (
          <span>
            {t.ui.equipmentCategory} {equipment.category.name}
          </span>
        )}
        {equipment.floor && (
          <span>
            {t.ui.equipmentFloor} {equipment.floor.number}
            {equipment.floor.siteBuilding?.site?.name &&
              `, ${equipment.floor.siteBuilding.site.name}`}
          </span>
        )}
      </div>
    </SelectableCard>
  );
});

EquipmentCard.displayName = 'EquipmentCard';
