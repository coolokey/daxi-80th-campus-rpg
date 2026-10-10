import { describe, it, expect } from 'vitest';
import { getMapById, MAP_REGISTRY } from '../data/maps';
import { getLocationBreadcrumb } from '../data/world-structure';
import { CLASSROOM_CHALLENGES, getChallengeById } from '../data/challenges';
import { gradeChoice } from './grading';
import type { Interactable } from '../types/rpg';

describe('Multi-Floor Gameplay, Stair Navigation & Classroom Exploration', () => {
  // 1. Campus outdoor entering New Building 1F
  it('1. Campus outdoor contains entrance door to New Building 1F with correct spawn point', () => {
    const campus = getMapById('campus-outdoor');
    expect(campus.id).toBe('campus-outdoor');

    const doorNewBuilding = campus.interactables.find((i) => i.id === 'door-new-building');
    expect(doorNewBuilding).toBeDefined();
    expect(doorNewBuilding?.type).toBe('door');
    expect(doorNewBuilding?.targetMapId).toBe('building-new-1f');
    expect(doorNewBuilding?.targetSpawn).toEqual({ x: 400, y: 440 });

    const newBuilding1F = getMapById(doorNewBuilding!.targetMapId!);
    expect(newBuilding1F.id).toBe('building-new-1f');
    expect(newBuilding1F.floorLevel).toBe(1);
    expect(newBuilding1F.locationPath).toEqual(['桃園市立大溪國中', '新大樓 (七年級)', '1F 穿堂廣場']);
    expect(getLocationBreadcrumb('building-new-1f')).toEqual(['桃園市立大溪國中', '新大樓 (七年級)', '1F 穿堂廣場']);
  });

  // 2. 1F stairs up to 2F
  it('2. 1F has clearly designated stairs going UP to 2F (stairDirection: up)', () => {
    const floor1F = getMapById('building-new-1f');
    const stairsUp = floor1F.interactables.find(
      (i): i is Interactable => i.type === 'stairs' && i.stairDirection === 'up'
    );

    expect(stairsUp).toBeDefined();
    expect(stairsUp?.id).toBe('stair-new-1f-up');
    expect(stairsUp?.targetMapId).toBe('building-new-2f');
    expect(stairsUp?.promptText).toContain('▲');
    expect(stairsUp?.promptText).toContain('2F');

    // Transition to 2F
    const floor2F = getMapById(stairsUp!.targetMapId!);
    expect(floor2F.id).toBe('building-new-2f');
    expect(floor2F.floorLevel).toBe(2);
    expect(floor2F.locationPath).toEqual(['桃園市立大溪國中', '新大樓 (七年級)', '2F 走廊']);
  });

  // 3. 2F stairs up to 3F
  it('3. 2F has bidirectional stairs (DOWN to 1F, UP to 3F)', () => {
    const floor2F = getMapById('building-new-2f');

    const stairsDown = floor2F.interactables.find(
      (i) => i.type === 'stairs' && i.stairDirection === 'down'
    );
    expect(stairsDown).toBeDefined();
    expect(stairsDown?.targetMapId).toBe('building-new-1f');
    expect(stairsDown?.promptText).toContain('▼');

    const stairsUp = floor2F.interactables.find(
      (i) => i.type === 'stairs' && i.stairDirection === 'up'
    );
    expect(stairsUp).toBeDefined();
    expect(stairsUp?.targetMapId).toBe('building-new-3f');
    expect(stairsUp?.promptText).toContain('▲');
    expect(stairsUp?.promptText).toContain('3F');

    // Transition to 3F
    const floor3F = getMapById(stairsUp!.targetMapId!);
    expect(floor3F.id).toBe('building-new-3f');
    expect(floor3F.floorLevel).toBe(3);
    expect(floor3F.locationPath).toEqual(['桃園市立大溪國中', '新大樓 (七年級)', '3F 走廊']);
  });

  // 4. Enter 3F Math Research Lab & Classroom Doorplates
  it('4. 3F has physical doorplates and entrance to Math Research Room', () => {
    const floor3F = getMapById('building-new-3f');

    // 706 Prime Hunter Special Challenge Doorplate
    const plate706 = floor3F.interactables.find((i) => i.id === 'room-plate-706');
    expect(plate706).toBeDefined();
    expect(plate706?.doorPlate).toContain('706');
    expect(['challenge-prime-hunter', 'challenge-g7-06']).toContain(plate706?.challengeId);

    // Door into Math Challenge Room
    const mathDoor = floor3F.interactables.find((i) => i.id === 'door-math-challenge-room');
    expect(mathDoor).toBeDefined();
    expect(mathDoor?.type).toBe('door');
    expect(mathDoor?.targetMapId).toBe('room-math-challenge');

    const mathRoom = getMapById(mathDoor!.targetMapId!);
    expect(mathRoom.id).toBe('room-math-challenge');
    expect(mathRoom.locationPath).toEqual(['大溪國中', '新大樓 (七年級)', '3F', '數學研究室']);

    // Inside math room: has Teacher Cai & central challenge console
    const teacherCai = mathRoom.interactables.find((i) => i.type === 'npc');
    expect(teacherCai).toBeDefined();
    const terminal = mathRoom.interactables.find((i) => i.id === 'math-challenge-terminal');
    expect(terminal).toBeDefined();
    expect(terminal?.challengeId).toBe('challenge-g7-math');
  });

  // 5. Reverse stairs descent back to Campus
  it('5. Allows descending smoothly from 3F -> 2F -> 1F -> Campus Outdoor without teleport menus', () => {
    // 3F to 2F
    const floor3F = getMapById('building-new-3f');
    const stair3to2 = floor3F.interactables.find(
      (i) => i.type === 'stairs' && i.stairDirection === 'down'
    );
    expect(stair3to2?.targetMapId).toBe('building-new-2f');

    // 2F to 1F
    const floor2F = getMapById(stair3to2!.targetMapId!);
    const stair2to1 = floor2F.interactables.find(
      (i) => i.type === 'stairs' && i.stairDirection === 'down'
    );
    expect(stair2to1?.targetMapId).toBe('building-new-1f');

    // 1F to Campus Outdoor
    const floor1F = getMapById(stair2to1!.targetMapId!);
    const exitDoor = floor1F.interactables.find((i) => i.id === 'door-exit-to-campus');
    expect(exitDoor?.targetMapId).toBe('campus-outdoor');

    const campus = getMapById(exitDoor!.targetMapId!);
    expect(campus.id).toBe('campus-outdoor');
  });

  // 6. Visit Admin Building, Tech Lab, and Complex Building (Library)
  it('6. Supports exploring Admin Building, Tech Lab, and Complex Building Library with multi-floor navigation', () => {
    // Admin Building
    const admin1F = getMapById('building-admin-1f');
    expect(admin1F.buildingId).toBe('building-admin');
    expect(admin1F.floorLevel).toBe(1);
    expect(admin1F.interactables.some((i) => i.id === 'stair-admin-1f-up')).toBe(true);

    const admin2F = getMapById('building-admin-2f');
    expect(admin2F.floorLevel).toBe(2);
    expect(admin2F.interactables.some((i) => i.stairDirection === 'down')).toBe(true);
    expect(admin2F.interactables.some((i) => i.doorPlate?.includes('教務處'))).toBe(true);

    // Tech Lab Interior
    const techLab = getMapById('tech-lab-interior');
    expect(techLab.id).toBe('tech-lab-interior');
    expect(techLab.interactables.some((i) => i.id === 'core-terminal')).toBe(true);

    // Complex Building (Library)
    const complex1F = getMapById('building-complex-1f');
    expect(['building-complex', 'building-multi']).toContain(complex1F.buildingId);
    expect(complex1F.floorLevel).toBe(1);
    expect(complex1F.interactables.some((i) => i.id.includes('stair'))).toBe(true);

    const complex2F = getMapById('building-complex-2f') || getMapById('building-multi-2f');
    expect(complex2F.floorLevel).toBe(2);
    expect(complex2F.interactables.some((i) => i.stairDirection === 'down')).toBe(true);
    expect(complex2F.interactables.some((i) => i.doorPlate?.includes('圖書館'))).toBe(true);

    // Grade 8, Grade 9, Art, Gym
    expect(MAP_REGISTRY['building-grade8-1f']).toBeDefined();
    expect(MAP_REGISTRY['building-grade9-1f']).toBeDefined();
    expect(MAP_REGISTRY['building-art-1f']).toBeDefined();
    expect(MAP_REGISTRY['building-gym-1f']).toBeDefined();
  });

  // 7. Verification of Universal Modular Challenges & Easter Eggs
  it('7. Universal modular challenge engine properly grades Prime Hunter, 9x9 Easter Egg, and Grades 7, 8, 9', () => {
    // 7A: Prime Hunter Myth-buster
    const primeChallenge = getChallengeById('challenge-prime-hunter');
    expect(primeChallenge).toBeDefined();
    expect(primeChallenge?.isEasterEgg).toBe(true);
    expect(primeChallenge?.easterEggBadge).toContain('質數獵人');

    // Question 1: 91 is composite (7 x 13)
    const q1 = primeChallenge!.questions[0];
    const res1 = gradeChoice(q1, q1.answer);
    expect(res1.correct).toBe(true);
    expect(q1.explanation).toContain('91 = 7 × 13');

    // Question 2: 51 is composite (3 x 17)
    const q2 = primeChallenge!.questions[1];
    expect(gradeChoice(q2, q2.answer).correct).toBe(true);
    expect(q2.explanation).toContain('51 = 3 × 17');

    // Question 3: 2 is the smallest and only even prime
    const q3 = primeChallenge!.questions[2];
    expect(gradeChoice(q3, q3.answer).correct).toBe(true);
    expect(q3.explanation).toContain('唯一');

    // 7B: Preschool 9x9 Multiplication Table Easter Egg
    const easter99 = getChallengeById('challenge-multiplication-easter');
    expect(easter99).toBeDefined();
    expect(easter99?.isEasterEgg).toBe(true);
    expect(easter99?.easterEggBadge).toContain('九九乘法');
    expect(easter99?.questions.length).toBeGreaterThanOrEqual(3);

    const q99_1 = easter99!.questions[0]; // 7 x 8 = 56
    expect(q99_1.choices[q99_1.answer]).toBe('56');
    expect(gradeChoice(q99_1, q99_1.answer).correct).toBe(true);

    // 7C: Grade 8 Algebra & Grade 9 Geometry
    const g8Challenge = getChallengeById('challenge-g8-algebra');
    expect(g8Challenge).toBeDefined();
    expect(g8Challenge?.grade).toBe(8);

    const g9Challenge = getChallengeById('challenge-g9-geometry');
    expect(g9Challenge).toBeDefined();
    expect(g9Challenge?.grade).toBe(9);
  });
});
