import { describe, expect, it } from 'vitest';
import { checkAABB, isColliding, getDistance, isWithinRadius, moveEntityWithSliding } from './collision';
import type { Rect } from '../types/game';

describe('Collision Engine', () => {
  it('detects box overlap correctly', () => {
    const boxA: Rect = { x: 10, y: 10, width: 20, height: 20 };
    const boxB: Rect = { x: 25, y: 25, width: 20, height: 20 };
    const boxC: Rect = { x: 100, y: 100, width: 20, height: 20 };

    expect(checkAABB(boxA, boxB)).toBe(true);
    expect(checkAABB(boxA, boxC)).toBe(false);
  });

  it('determines if entity collides with obstacle list', () => {
    const obstacles: Rect[] = [
      { x: 50, y: 50, width: 100, height: 100 },
      { x: 300, y: 300, width: 50, height: 50 },
    ];

    expect(isColliding({ x: 80, y: 80, width: 10, height: 10 }, obstacles)).toBe(true);
    expect(isColliding({ x: 10, y: 10, width: 10, height: 10 }, obstacles)).toBe(false);
  });

  it('calculates Euclidean distance and radius check accurately', () => {
    expect(getDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
    expect(isWithinRadius({ x: 0, y: 0 }, { x: 30, y: 40 }, 60)).toBe(true);
    expect(isWithinRadius({ x: 0, y: 0 }, { x: 30, y: 40 }, 40)).toBe(false);
  });

  it('stops player from entering a wall directly', () => {
    const obstacles: Rect[] = [{ x: 100, y: 0, width: 20, height: 100 }];
    const mapLimit = { width: 500, height: 500 };
    const playerSize = { width: 20, height: 20 };

    // Move directly into the wall on X axis
    const result = moveEntityWithSliding(
      { x: 75, y: 50 },
      { dx: 1, dy: 0 },
      100,
      0.1, // step = 10px -> candidateX = 85 -> collision!
      playerSize,
      obstacles,
      mapLimit
    );

    expect(result.x).toBe(75); // blocked!
    expect(result.moved).toBe(false);
  });

  it('slides along wall when moving diagonally', () => {
    const obstacles: Rect[] = [{ x: 100, y: 0, width: 20, height: 500 }]; // vertical wall
    const mapLimit = { width: 500, height: 500 };
    const playerSize = { width: 20, height: 20 };

    // Player at x: 75, y: 50, moving right & down (dx: 1, dy: 1)
    const result = moveEntityWithSliding(
      { x: 75, y: 50 },
      { dx: 1, dy: 1 },
      100,
      0.1,
      playerSize,
      obstacles,
      mapLimit
    );

    // X is blocked by wall at 100, but Y is free to slide downwards!
    expect(result.x).toBe(75);
    expect(result.y).toBeGreaterThan(50);
    expect(result.moved).toBe(true);
  });

  it('keeps player within map boundary', () => {
    const mapLimit = { width: 200, height: 200 };
    const playerSize = { width: 20, height: 20 };

    // Move left past 0
    const result = moveEntityWithSliding(
      { x: 5, y: 50 },
      { dx: -1, dy: 0 },
      100,
      0.2, // step = -20
      playerSize,
      [],
      mapLimit
    );

    expect(result.x).toBe(0); // clamped to 0!
  });
});
