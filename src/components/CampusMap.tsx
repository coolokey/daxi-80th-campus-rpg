import { TopDownRPGCanvas } from './TopDownRPGCanvas';
import type { Vector2D } from '../types/rpg';

type CampusMapProps = {
  initialMapId?: string;
  initialSpawn?: Vector2D;
  currentMapId?: string;
  onMapChange?: (mapId: string) => void;
  onInteract?: (npcId: string) => void;
  onInteractNPC?: (npcData: {
    id: string;
    name: string;
    title?: string;
    dialogue: string;
    portraitUrl?: string;
  }) => void;
  onStartQuest?: () => void;
  isLocked?: boolean;
  collectedChips?: string[];
  onCollectChip?: (chipId: string, chipName: string, clue?: string) => void;
  isCoreCalibrated?: boolean;
};

export function CampusMap({
  initialMapId,
  initialSpawn,
  currentMapId,
  onMapChange,
  onInteract,
  onInteractNPC,
  onStartQuest,
  isLocked = false,
  collectedChips,
  onCollectChip,
  isCoreCalibrated = false,
}: CampusMapProps) {
  const handleInteractNPC = (npc: {
    id: string;
    name: string;
    title?: string;
    dialogue: string;
    portraitUrl?: string;
  }) => {
    if (onInteractNPC) {
      onInteractNPC(npc);
    } else if (onInteract) {
      onInteract(npc.id);
    }
  };

  return (
    <section aria-label="校園地圖" className="campus-rpg-container">
      <TopDownRPGCanvas
        initialMapId={initialMapId}
        initialSpawn={initialSpawn}
        currentMapId={currentMapId}
        onMapChange={onMapChange}
        onInteractNPC={handleInteractNPC}
        onStartQuest={onStartQuest}
        isLocked={isLocked}
        collectedChips={collectedChips}
        onCollectChip={onCollectChip}
        isCoreCalibrated={isCoreCalibrated}
      />
    </section>
  );
}
