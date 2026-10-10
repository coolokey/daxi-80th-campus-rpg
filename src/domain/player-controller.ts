import type {
  AnimationState,
  Direction,
  Interactable,
  PlayerEntity,
  Rect,
  Vector2D,
} from '../types/rpg';
import { moveEntityWithSliding, getDistance } from './collision';

/**
 * Computes movement velocity vector from keyboard active keys and touch joystick input.
 * Normalizes diagonal input so speed is strictly uniform across all 8 directions.
 */
export function computeMovementInput(
  keys: Set<string>,
  joy: Vector2D
): { dx: number; dy: number; isMoving: boolean } {
  let dx = 0;
  let dy = 0;

  if (keys.has('KeyW') || keys.has('ArrowUp')) dy -= 1;
  if (keys.has('KeyS') || keys.has('ArrowDown')) dy += 1;
  if (keys.has('KeyA') || keys.has('ArrowLeft')) dx -= 1;
  if (keys.has('KeyD') || keys.has('ArrowRight')) dx += 1;

  if (Math.hypot(joy.x, joy.y) > 0.1) {
    dx += joy.x;
    dy += joy.y;
  }

  const length = Math.hypot(dx, dy);
  if (length < 0.1) {
    return { dx: 0, dy: 0, isMoving: false };
  }

  // Normalize diagonal vector to avoid diagonal super-speed
  return {
    dx: dx / length,
    dy: dy / length,
    isMoving: true,
  };
}

/**
 * Determines new facing direction based on movement vector.
 * Retains existing facing direction when player stops moving.
 */
export function updateDirection(
  currentDir: Direction,
  dx: number,
  dy: number,
  isMoving: boolean
): Direction {
  if (!isMoving) {
    return currentDir;
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'right' : 'left';
  }
  return dy > 0 ? 'down' : 'up';
}

/**
 * Resolves current Animation State according to facing direction and movement state.
 */
export function resolveAnimationState(
  direction: Direction,
  isMoving: boolean
): AnimationState {
  if (isMoving) {
    switch (direction) {
      case 'up':
        return 'walk-up';
      case 'down':
        return 'walk-down';
      case 'left':
        return 'walk-left';
      case 'right':
        return 'walk-right';
    }
  }

  switch (direction) {
    case 'up':
      return 'idle-up';
    case 'down':
      return 'idle-down';
    case 'left':
      return 'idle-left';
    case 'right':
      return 'idle-right';
  }
}

/**
 * Updates player entity state for a single physics tick (dt).
 */
export function updatePlayer(
  player: PlayerEntity,
  input: { dx: number; dy: number; isMoving: boolean },
  dt: number,
  obstacles: Rect[],
  mapLimit: { width: number; height: number },
  walkTimer: number
): { player: PlayerEntity; newWalkTimer: number } {
  const newDirection = updateDirection(
    player.direction,
    input.dx,
    input.dy,
    input.isMoving
  );
  const animState = resolveAnimationState(newDirection, input.isMoving);

  let newWalkTimer = walkTimer;
  let walkFrame = 0;

  if (input.isMoving) {
    newWalkTimer += dt * 8; // 8 animation frames per second
    walkFrame = Math.floor(newWalkTimer) % 4;
  }

  // Move with AABB obstacle collision and wall sliding
  const moveResult = moveEntityWithSliding(
    { x: player.x, y: player.y },
    { dx: input.dx, dy: input.dy },
    player.speed,
    dt,
    { width: player.width, height: player.height },
    obstacles,
    mapLimit
  );

  return {
    player: {
      ...player,
      x: moveResult.x,
      y: moveResult.y,
      direction: newDirection,
      isMoving: input.isMoving,
      animState,
      walkFrame,
    },
    newWalkTimer,
  };
}

/**
 * Finds the nearest interactable within its interaction radius.
 */
export function findNearbyInteractable(
  playerPos: Vector2D,
  interactables: Interactable[]
): { interactable: Interactable | null; distance: number } {
  let closest: Interactable | null = null;
  let minDistance = Infinity;

  for (const item of interactables) {
    const dist = getDistance(playerPos, { x: item.x, y: item.y });
    if (dist <= item.interactionRadius && dist < minDistance) {
      minDistance = dist;
      closest = item;
    }
  }

  return {
    interactable: closest,
    distance: minDistance,
  };
}
