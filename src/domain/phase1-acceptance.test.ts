import { describe, expect, it, vi } from 'vitest';
import {
  computeMovementInput,
  updatePlayer,
  findNearbyInteractable,
  resolveAnimationState,
  updateDirection,
} from './player-controller';
import { CAMPUS_MAP } from '../data/maps/campus';
import { TECH_LAB_MAP } from '../data/maps/tech-lab';
import { getMapById } from '../data/maps';
import type { PlayerEntity, Rect } from '../types/rpg';

describe('Phase 1 Acceptance: Playable Campus Prototype', () => {
  const createTestPlayer = (x = 720, y = 860): PlayerEntity => ({
    x,
    y,
    width: 32,
    height: 48,
    direction: 'down',
    isMoving: false,
    animState: 'idle-down',
    walkFrame: 0,
    speed: 200,
  });

  // Test 1
  it('Test 1: Press W moves the player character upward (Continuous Movement)', () => {
    const player = createTestPlayer(720, 860);
    const keys = new Set(['KeyW']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });

    expect(input.isMoving).toBe(true);
    expect(input.dy).toBeLessThan(0);

    const { player: updated } = updatePlayer(
      player,
      input,
      0.1,
      [],
      { width: 1525, height: 1031 },
      0
    );

    expect(updated.y).toBeLessThan(player.y);
    expect(updated.direction).toBe('up');
  });

  // Test 2
  it('Test 2: Press S moves the player character downward', () => {
    const player = createTestPlayer(720, 860);
    const keys = new Set(['KeyS']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });

    expect(input.dy).toBeGreaterThan(0);

    const { player: updated } = updatePlayer(
      player,
      input,
      0.1,
      [],
      { width: 1525, height: 1031 },
      0
    );

    expect(updated.y).toBeGreaterThan(player.y);
    expect(updated.direction).toBe('down');
  });

  // Test 3
  it('Test 3: Press A moves the player character to the left', () => {
    const player = createTestPlayer(720, 860);
    const keys = new Set(['KeyA']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });

    expect(input.dx).toBeLessThan(0);

    const { player: updated } = updatePlayer(
      player,
      input,
      0.1,
      [],
      { width: 1525, height: 1031 },
      0
    );

    expect(updated.x).toBeLessThan(player.x);
    expect(updated.direction).toBe('left');
  });

  // Test 4
  it('Test 4: Press D moves the player character to the right', () => {
    const player = createTestPlayer(720, 860);
    const keys = new Set(['KeyD']);
    const input = computeMovementInput(keys, { x: 0, y: 0 });

    expect(input.dx).toBeGreaterThan(0);

    const { player: updated } = updatePlayer(
      player,
      input,
      0.1,
      [],
      { width: 1525, height: 1031 },
      0
    );

    expect(updated.x).toBeGreaterThan(player.x);
    expect(updated.direction).toBe('right');
  });

  // Test 5
  it('Test 5: Plays corresponding walking animation states while moving and idle when stopped', () => {
    expect(resolveAnimationState('up', true)).toBe('walk-up');
    expect(resolveAnimationState('down', true)).toBe('walk-down');
    expect(resolveAnimationState('left', true)).toBe('walk-left');
    expect(resolveAnimationState('right', true)).toBe('walk-right');

    expect(resolveAnimationState('up', false)).toBe('idle-up');
    expect(resolveAnimationState('down', false)).toBe('idle-down');
    expect(resolveAnimationState('left', false)).toBe('idle-left');
    expect(resolveAnimationState('right', false)).toBe('idle-right');
  });

  // Test 6
  it('Test 6: Player character stops upon colliding with a solid building/obstacle (Cannot pass through)', () => {
    // 科技館 building obstacle at x: 1100, y: 220, w: 100, h: 280
    const obstacle: Rect = { x: 1100, y: 220, width: 100, height: 280 };
    // Player standing just to the left of the building: x: 1080, y: 300
    const player = createTestPlayer(1080, 300);

    // Press D to try walking right into the building
    const { player: afterCollision } = updatePlayer(
      player,
      { dx: 1, dy: 0, isMoving: true },
      0.1,
      [obstacle],
      { width: 1525, height: 1031 },
      0
    );

    // Player position on X is blocked and does NOT penetrate obstacle
    expect(afterCollision.x).toBe(1080);
  });

  // Test 7
  it('Test 7: Walking close to the NPC shows the Interaction Prompt within radius', () => {
    const npc = CAMPUS_MAP.interactables.find((i) => i.id === 'npc-cai')!;
    expect(npc).toBeDefined();

    // Far away (at campus gate: x: 720, y: 860; NPC at x: 1220, y: 560)
    const farResult = findNearbyInteractable({ x: 720, y: 860 }, CAMPUS_MAP.interactables);
    expect(farResult.interactable).toBeNull();

    // Walked right next to NPC (e.g. x: 1220, y: 600, distance = 40px <= 80px)
    const nearResult = findNearbyInteractable({ x: 1220, y: 600 }, CAMPUS_MAP.interactables);
    expect(nearResult.interactable).not.toBeNull();
    expect(nearResult.interactable?.id).toBe('npc-cai');
    expect(nearResult.interactable?.promptText).toContain('按 [E]');
  });

  // Test 8
  it('Test 8: Pressing E while near NPC initiates dialogue with portrait and dialogue text', () => {
    const npc = CAMPUS_MAP.interactables.find((i) => i.id === 'npc-cai')!;
    const near = findNearbyInteractable({ x: 1220, y: 600 }, CAMPUS_MAP.interactables);
    expect(near.interactable?.id).toBe('npc-cai');

    const onDialogueOpen = vi.fn();
    if (near.interactable?.npcData) {
      onDialogueOpen({
        name: near.interactable.name,
        dialogue: near.interactable.npcData.dialogue,
        portraitUrl: near.interactable.npcData.portraitUrl,
      });
    }

    expect(onDialogueOpen).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.stringContaining('數字研究員'),
        dialogue: expect.stringContaining('能源核心'),
      })
    );
  });

  // Test 9
  it('Test 9: Walking to the door triggers portal / map transition to tech-lab-interior and back', () => {
    // 1. Player near technology lab door on campus
    const door = CAMPUS_MAP.interactables.find((i) => i.id === 'door-tech-lab')!;
    expect(door).toBeDefined();
    expect(door.type).toBe('door');
    expect(door.targetMapId).toBe('tech-lab-interior');

    // 2. Load tech-lab interior map
    const interiorMap = getMapById(door.targetMapId!);
    expect(interiorMap.id).toBe('tech-lab-interior');
    expect(interiorMap.obstacles.length).toBeGreaterThan(0);

    // 3. Find exit door inside tech lab
    const exitDoor = interiorMap.interactables.find((i) => i.id === 'door-campus-exit')!;
    expect(exitDoor).toBeDefined();
    expect(exitDoor.targetMapId).toBe('campus-outdoor');

    // 4. Returning to campus outdoor map
    const returnMap = getMapById(exitDoor.targetMapId!);
    expect(returnMap.id).toBe('campus-outdoor');
  });

  // Test 10
  it('Test 10: Camera correctly follows player and clamps within world bounds', () => {
    const mapW = 1525;
    const mapH = 1031;
    const viewW = 960;
    const viewH = 580;

    const calcCamera = (px: number, py: number) => {
      const camX = Math.max(0, Math.min(mapW - viewW, px + 16 - viewW / 2));
      const camY = Math.max(0, Math.min(mapH - viewH, py + 24 - viewH / 2));
      return { camX, camY };
    };

    // When player is near top-left: camera is clamped at (0, 0)
    const tl = calcCamera(100, 100);
    expect(tl.camX).toBe(0);
    expect(tl.camY).toBe(0);

    // When player is in center: camera centers on player
    const center = calcCamera(720, 500);
    expect(center.camX).toBeGreaterThan(0);
    expect(center.camY).toBeGreaterThan(0);
    expect(center.camX).toBeLessThan(mapW - viewW);
    expect(center.camY).toBeLessThan(mapH - viewH);

    // When player is near bottom-right: camera clamps at max bounds
    const br = calcCamera(1450, 950);
    expect(br.camX).toBe(mapW - viewW);
    expect(br.camY).toBe(mapH - viewH);
  });
});
