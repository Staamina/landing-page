import type { Equipment } from '@staamina/types';
import { EquipmentCard } from './equipment-card';
import { useTranslation } from '@staamina/ui/i18n';

export interface EquipmentSearchResultsProps {
  equipments: Equipment[];
  selectedEquipment?: Equipment | null;
  onEquipmentClick: (equipment: Equipment) => void;
  isLoading?: boolean;
  searchQuery?: string;
}

export function EquipmentSearchResults({
  equipments,
  selectedEquipment,
  onEquipmentClick,
  isLoading,
  searchQuery,
}: EquipmentSearchResultsProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return null;
  }

  if (!searchQuery || searchQuery.trim() === '') {
    return null;
  }

  if (equipments.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-text-tertiary">
        {t.ui.noEquipmentAvailable}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <div className="text-xs font-medium text-text-tertiary px-1">
        {t.ui.searchResults} ({equipments.length})
      </div>
      <div className="flex max-h-96 w-full min-w-0 flex-col gap-2 overflow-x-hidden overflow-y-auto scrollbar-hide">
        {equipments.map((equipment) => (
          <EquipmentCard
            key={equipment.id}
            equipment={equipment}
            isSelected={selectedEquipment?.id === equipment.id}
            onClick={() => onEquipmentClick(equipment)}
          />
        ))}
      </div>
    </div>
  );
}
