import type { Rect } from '../types/game';

/**
 * Checks whether two axis-aligned bounding boxes overlap.
 */
export function checkAABB(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

/**
 * Checks if a bounding box collides with any obstacle in the obstacle list.
 */
export function isColliding(box: Rect, obstacles: Rect[]): boolean {
  for (let i = 0; i < obstacles.length; i++) {
    if (checkAABB(box, obstacles[i])) {
      return true;
    }
  }
  return false;
}

/**
 * Computes Euclidean distance between two points.
 */
export function getDistance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

/**
 * Determines if point a is within interaction radius of point b.
 */
export function isWithinRadius(
  a: { x: number; y: number },
  b: { x: number; y: number },
  radius: number
): boolean {
  return getDistance(a, b) <= radius;
}

export type MoveResult = {
  x: number;
  y: number;
  moved: boolean;
};

/**
 * Moves an entity with collision resolution and wall-sliding support.
 * Checks X and Y axes independently so diagonal movement against a flat wall slides smoothly.
 */
export function moveEntityWithSliding(
  pos: { x: number; y: number },
  input: { dx: number; dy: number },
  speed: number,
  dt: number,
  size: { width: number; height: number },
  obstacles: Rect[],
  mapLimit: { width: number; height: number }
): MoveResult {
  if (input.dx === 0 && input.dy === 0) {
    return { x: pos.x, y: pos.y, moved: false };
  }

  // Normalize diagonal vector to prevent 1.414x diagonal speed
  const len = Math.hypot(input.dx, input.dy);
  const normX = len > 0 ? input.dx / len : 0;
  const normY = len > 0 ? input.dy / len : 0;

  const stepX = normX * speed * dt;
  const stepY = normY * speed * dt;

  let newX = pos.x;
  let newY = pos.y;
  let moved = false;

  // Player's feet collision box (bottom portion of the sprite, e.g. height 20px)
  const feetHeight = Math.min(20, size.height);
  const feetOffsetY = size.height - feetHeight;

  // Try movement on X axis
  if (stepX !== 0) {
    const candidateX = Math.max(0, Math.min(mapLimit.width - size.width, pos.x + stepX));
    const testBoxX: Rect = {
      x: candidateX,
      y: pos.y + feetOffsetY,
      width: size.width,
      height: feetHeight,
    };

    if (!isColliding(testBoxX, obstacles)) {
      newX = candidateX;
      moved = true;
    }
  }

  // Try movement on Y axis
  if (stepY !== 0) {
    const candidateY = Math.max(0, Math.min(mapLimit.height - size.height, pos.y + stepY));
    const testBoxY: Rect = {
      x: newX,
      y: candidateY + feetOffsetY,
      width: size.width,
      height: feetHeight,
    };

    if (!isColliding(testBoxY, obstacles)) {
      newY = candidateY;
      moved = true;
    }
  }

  return { x: newX, y: newY, moved };
}
