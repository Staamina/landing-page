import { useState, useMemo, useEffect } from 'react';

import { FloorSelector } from './components/controls/floor-selector';
import { EquipmentHighlight } from './components/interactions/equipment-highlight';
import { Building } from './components/scene/building';
import { SceneContainer } from './components/scene/scene-container';
import { EquipmentInfoPanel } from './components/ui/equipment-info-panel';
import { SearchBar } from './components/ui/search-bar';
import { useFloorNavigation } from './hooks/use-floor-navigation';
import { Equipment3DData } from './types/equipment-3d.types';
import { Floor } from './types/floor.types';

export interface Site3DViewerProps {
  floors: Floor[];
  equipments: Equipment3DData[];
  buildingWidth?: number;
  buildingLength?: number;
  onEquipmentClick?: (equipment: Equipment3DData) => void;
  onEquipmentHover?: (equipment?: Equipment3DData) => void;
  initialFloorId?: string;
  showControls?: boolean;
  enableSearch?: boolean;
  defaultFloorTextureUrl?: string;
  /** Set to false to skip Environment HDR (e.g. in Storybook to avoid CDN fetch) */
  enableEnvironment?: boolean;
}

export const Site3DViewer = ({
  floors,
  equipments,
  buildingWidth = 20,
  buildingLength = 20,
  onEquipmentClick,
  onEquipmentHover,
  initialFloorId,
  showControls = true,
  enableSearch = true,
  defaultFloorTextureUrl,
  enableEnvironment = true,
}: Site3DViewerProps) => {
  const { currentFloorId, filteredEquipment, sortedFloors, setCurrentFloorId } =
    useFloorNavigation(floors, equipments);

  const [selectedEquipment, setSelectedEquipment] =
    useState<Equipment3DData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialFloorId) {
      setCurrentFloorId(initialFloorId);
    }
  }, [initialFloorId, setCurrentFloorId]);

  const searchedEquipments = useMemo(() => {
    if (!searchQuery.trim()) {
      return filteredEquipment;
    }

    const query = searchQuery.toLowerCase();
    return filteredEquipment.filter(
      (eq) =>
        eq.name.toLowerCase().includes(query) ||
        eq.type.toLowerCase().includes(query)
    );
  }, [filteredEquipment, searchQuery]);

  const handleEquipmentClick = (eq: Equipment3DData) => {
    setSelectedEquipment(eq);
    onEquipmentClick?.(eq);
  };

  const handleEquipmentHover = (eq?: Equipment3DData) => {
    onEquipmentHover?.(eq);
  };

  return (
    <div className="relative w-full h-full">
      <SceneContainer
        enableControls={showControls}
        enableEnvironment={enableEnvironment}
      >
        <Building
          width={buildingWidth}
          length={buildingLength}
          floors={sortedFloors}
          currentFloorId={currentFloorId}
          defaultFloorTextureUrl={defaultFloorTextureUrl}
        />
        <EquipmentHighlight
          equipments={searchedEquipments}
          floors={sortedFloors}
          onEquipmentClick={handleEquipmentClick}
          onEquipmentHover={handleEquipmentHover}
        />
      </SceneContainer>

      {showControls && (
        <>
          <FloorSelector
            floors={sortedFloors}
            currentFloorId={currentFloorId}
            onFloorChange={setCurrentFloorId}
          />
          {enableSearch && (
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search equipment..."
            />
          )}
        </>
      )}

      {selectedEquipment && (
        <EquipmentInfoPanel
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  );
};
