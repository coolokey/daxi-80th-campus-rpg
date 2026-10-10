export type Direction = 'up' | 'down' | 'left' | 'right';

export type AnimationState =
  | 'idle-down'
  | 'idle-up'
  | 'idle-left'
  | 'idle-right'
  | 'walk-down'
  | 'walk-up'
  | 'walk-left'
  | 'walk-right';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Vector2D = {
  x: number;
  y: number;
};

export type InteractableType =
  | 'npc'
  | 'door'
  | 'portal'
  | 'stairs'
  | 'chest'
  | 'object'
  | 'collectible';

export type StairDirection = 'up' | 'down';

export type Interactable = {
  id: string;
  type: InteractableType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  interactionRadius: number;
  promptText: string;
  targetMapId?: string;
  targetSpawn?: Vector2D;
  targetSpawnId?: string;
  stairDirection?: StairDirection;
  doorPlate?: string;
  challengeId?: string;
  npcData?: {
    title: string;
    dialogue: string;
    portraitUrl?: string;
  };
  collectibleData?: {
    clue: string;
    category?: string;
  };
};

export type PlayerEntity = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  isMoving: boolean;
  animState: AnimationState;
  walkFrame: number;
  speed: number;
};

export type MapDefinition = {
  id: string;
  name: string;
  width: number;
  height: number;
  defaultSpawn: Vector2D;
  spawnPoints?: Record<string, Vector2D>;
  locationPath?: string[]; // Breadcrumb: e.g. ['大溪國中', '新大樓', '3F', '數學研究室']
  buildingId?: string;
  floorLevel?: number;
  bgImage?: string;
  themeColor: string;
  obstacles: Rect[];
  interactables: Interactable[];
};
