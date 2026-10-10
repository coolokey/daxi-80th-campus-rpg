import { describe, expect, it } from 'vitest';
import {
  computeMovementInput,
  updateDirection,
  resolveAnimationState,
  updatePlayer,
  findNearbyInteractable,
} from './player-controller';
import type { PlayerEntity, Rect, Interactable } from '../types/rpg';

describe('Player Controller', () => {
  it('moves up when W or ArrowUp is pressed', () => {
    const keys = new Set(['KeyW']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });
    expect(input.isMoving).toBe(true);
    expect(input.dx).toBe(0);
    expect(input.dy).toBe(-1);
  });

  it('moves down when S or ArrowDown is pressed', () => {
    const keys = new Set(['ArrowDown']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });
    expect(input.isMoving).toBe(true);
    expect(input.dx).toBe(0);
    expect(input.dy).toBe(1);
  });

  it('moves left when A or ArrowLeft is pressed', () => {
    const keys = new Set(['KeyA']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });
    expect(input.isMoving).toBe(true);
    expect(input.dx).toBe(-1);
    expect(input.dy).toBe(0);
  });

  it('moves right when D or ArrowRight is pressed', () => {
    const keys = new Set(['KeyD']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });
    expect(input.isMoving).toBe(true);
    expect(input.dx).toBe(1);
    expect(input.dy).toBe(0);
  });

  it('normalizes diagonal speed so it does not exceed 1.0', () => {
    const keys = new Set(['KeyW', 'KeyD']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });
    expect(input.isMoving).toBe(true);
    const speedMagnitude = Math.hypot(input.dx, input.dy);
    expect(speedMagnitude).toBeCloseTo(1.0, 5);
  });

  it('preserves facing direction when stopped (Rule 52)', () => {
    // Player was walking left
    const dirWhileMoving = updateDirection('down', -1, 0, true);
    expect(dirWhileMoving).toBe('left');

    // Player stops moving
    const dirWhenStopped = updateDirection(dirWhileMoving, 0, 0, false);
    expect(dirWhenStopped).toBe('left'); // Still facing left!
  });

  it('resolves all 8 animation states accurately (Rule 51)', () => {
    // Idle states
    expect(resolveAnimationState('down', false)).toBe('idle-down');
    expect(resolveAnimationState('up', false)).toBe('idle-up');
    expect(resolveAnimationState('left', false)).toBe('idle-left');
    expect(resolveAnimationState('right', false)).toBe('idle-right');

    // Walk states
    expect(resolveAnimationState('down', true)).toBe('walk-down');
    expect(resolveAnimationState('up', true)).toBe('walk-up');
    expect(resolveAnimationState('left', true)).toBe('walk-left');
    expect(resolveAnimationState('right', true)).toBe('walk-right');
  });

  it('stops player when colliding with an obstacle (Rule 55)', () => {
    const obstacle: Rect = { x: 200, y: 100, width: 50, height: 50 };
    const player: PlayerEntity = {
      x: 180,
      y: 110,
      width: 20,
      height: 20,
      direction: 'right',
      isMoving: false,
      animState: 'idle-right',
      walkFrame: 0,
      speed: 100,
    };

    // Try moving right into obstacle
    const { player: updated } = updatePlayer(
      player,
      { dx: 1, dy: 0, isMoving: true },
      0.1, // step 10px -> candidate 190 + 20 = 210 -> intersects obstacle!
      [obstacle],
      { width: 500, height: 500 },
      0
    );

    expect(updated.x).toBe(180); // Movement blocked!
  });

  it('detects nearby interactable within interaction radius (Rule 58 & 59)', () => {
    const interactables: Interactable[] = [
      {
        id: 'npc-teacher',
        type: 'npc',
        name: '數字研究員',
        x: 300,
        y: 300,
        width: 32,
        height: 48,
        interactionRadius: 80,
        promptText: '按 [E] 互動',
      },
    ];

    // Player far away (distance = 200)
    const far = findNearbyInteractable({ x: 100, y: 300 }, interactables);
    expect(far.interactable).toBeNull();

    // Player close (distance = 50 <= 80)
    const close = findNearbyInteractable({ x: 250, y: 300 }, interactables);
    expect(close.interactable).not.toBeNull();
    expect(close.interactable?.id).toBe('npc-teacher');
  });
});
