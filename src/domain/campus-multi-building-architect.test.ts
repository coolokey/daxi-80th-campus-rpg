import { describe, it, expect } from 'vitest';
import { MAP_REGISTRY, getMapById } from '../data/maps';
import {
  DAXI_CAMPUS_WORLD,
  getLocationBreadcrumb,
  getBuildingById,
  getFloorByMapId,
  getRoomById,
} from '../data/world-structure';
import { getChallengeById } from '../data/challenges';

describe('Campus Multi-Building & Multi-Floor World Architect (Rule 74～115)', () => {
  it('1. Campus outdoor contains entrance doors for all 8 buildings with valid targets', () => {
    const campus = getMapById('campus-outdoor');
    expect(campus.id).toBe('campus-outdoor');

    const expectedDoors = [
      { id: 'door-new-building', targetMapId: 'building-new-1f' },
      { id: 'door-admin', targetMapId: 'building-admin-1f' },
      { id: 'door-tech-lab', targetMapId: 'tech-lab-interior' },
      { id: 'door-multi', targetMapId: 'building-multi-1f' },
      { id: 'door-grade8', targetMapId: 'building-grade8-1f' },
      { id: 'door-grade9', targetMapId: 'building-grade9-1f' },
      { id: 'door-art', targetMapId: 'building-art-1f' },
      { id: 'door-activity', targetMapId: 'building-activity' },
    ];

    for (const d of expectedDoors) {
      const door = campus.interactables.find((i) => i.id === d.id);
      expect(door, `Door ${d.id} must exist on campus-outdoor`).toBeDefined();
      expect(door?.type).toBe('door');
      expect(door?.targetMapId).toBe(d.targetMapId);
      expect(door?.targetSpawn).toBeDefined();

      const targetMap = getMapById(door!.targetMapId!);
      expect(targetMap, `Target map ${d.targetMapId} must be registered`).toBeDefined();
    }
  });

  it('2. World structure defines all 8 official campus buildings and floor hierarchies', () => {
    expect(DAXI_CAMPUS_WORLD.buildings.length).toBe(8);

    const buildingIds = DAXI_CAMPUS_WORLD.buildings.map((b) => b.id);
    expect(buildingIds).toContain('building-new');
    expect(buildingIds).toContain('building-admin');
    expect(buildingIds).toContain('building-tech');
    expect(buildingIds).toContain('building-multi');
    expect(buildingIds).toContain('building-grade8');
    expect(buildingIds).toContain('building-grade9');
    expect(buildingIds).toContain('building-art');
    expect(buildingIds).toContain('building-activity');

    // New Building 3 floors
    const newBld = getBuildingById('building-new');
    expect(newBld?.floors.length).toBe(3);

    // Admin Building 3 floors
    const adminBld = getBuildingById('building-admin');
    expect(adminBld?.floors.length).toBe(3);

    // Tech Building 2 floors
    const techBld = getBuildingById('building-tech');
    expect(techBld?.floors.length).toBe(2);

    // Multi-purpose Building 2 floors
    const multiBld = getBuildingById('building-multi');
    expect(multiBld?.floors.length).toBe(2);

    // Grade 8 Building 3 floors
    const g8Bld = getBuildingById('building-grade8');
    expect(g8Bld?.floors.length).toBe(3);

    // Grade 9 Building 3 floors
    const g9Bld = getBuildingById('building-grade9');
    expect(g9Bld?.floors.length).toBe(3);

    // Art Building 2 floors
    const artBld = getBuildingById('building-art');
    expect(artBld?.floors.length).toBe(2);

    // Activity Center 1 floor (The Grand Arena)
    const actBld = getBuildingById('building-activity');
    expect(actBld?.floors.length).toBe(1);
  });

  it('3. All stairs have bidirectional connections between adjacent floors', () => {
    // Admin 1F <-> 2F <-> 3F
    const admin1F = getMapById('building-admin-1f');
    const stairAdmin1to2 = admin1F.interactables.find((i) => i.id === 'stair-admin-1f-up');
    expect(stairAdmin1to2?.targetMapId).toBe('building-admin-2f');

    const admin2F = getMapById('building-admin-2f');
    const stairAdmin2to1 = admin2F.interactables.find((i) => i.id === 'stair-admin-2f-down');
    expect(stairAdmin2to1?.targetMapId).toBe('building-admin-1f');
    const stairAdmin2to3 = admin2F.interactables.find((i) => i.id === 'stair-admin-2f-up');
    expect(stairAdmin2to3?.targetMapId).toBe('building-admin-3f');

    const admin3F = getMapById('building-admin-3f');
    const stairAdmin3to2 = admin3F.interactables.find((i) => i.id === 'stair-admin-3f-down');
    expect(stairAdmin3to2?.targetMapId).toBe('building-admin-2f');

    // Tech 1F <-> 2F
    const tech1F = getMapById('tech-lab-interior');
    const stairTech1to2 = tech1F.interactables.find((i) => i.id === 'stair-tech-1f-up');
    expect(stairTech1to2?.targetMapId).toBe('building-tech-2f');

    const tech2F = getMapById('building-tech-2f');
    const stairTech2to1 = tech2F.interactables.find((i) => i.id === 'stair-tech-2f-down');
    expect(stairTech2to1?.targetMapId).toBe('tech-lab-interior');

    // Multi 1F <-> 2F
    const multi1F = getMapById('building-multi-1f');
    const stairMulti1to2 = multi1F.interactables.find((i) => i.id === 'stair-multi-1f-up');
    expect(stairMulti1to2?.targetMapId).toBe('building-multi-2f');

    const multi2F = getMapById('building-multi-2f');
    const stairMulti2to1 = multi2F.interactables.find((i) => i.id === 'stair-multi-2f-down');
    expect(stairMulti2to1?.targetMapId).toBe('building-multi-1f');

    // Grade 8: 1F <-> 2F <-> 3F
    const g8_1F = getMapById('building-grade8-1f');
    const stairG8_1to2 = g8_1F.interactables.find((i) => i.id === 'stair-g8-1f-up');
    expect(stairG8_1to2?.targetMapId).toBe('building-grade8-2f');

    const g8_2F = getMapById('building-grade8-2f');
    const stairG8_2to1 = g8_2F.interactables.find((i) => i.id === 'stair-g8-2f-down');
    expect(stairG8_2to1?.targetMapId).toBe('building-grade8-1f');
    const stairG8_2to3 = g8_2F.interactables.find((i) => i.id === 'stair-g8-2f-up');
    expect(stairG8_2to3?.targetMapId).toBe('building-grade8-3f');

    const g8_3F = getMapById('building-grade8-3f');
    const stairG8_3to2 = g8_3F.interactables.find((i) => i.id === 'stair-g8-3f-down');
    expect(stairG8_3to2?.targetMapId).toBe('building-grade8-2f');

    // Grade 9: 1F <-> 2F <-> 3F
    const g9_1F = getMapById('building-grade9-1f');
    const stairG9_1to2 = g9_1F.interactables.find((i) => i.id === 'stair-g9-1f-up');
    expect(stairG9_1to2?.targetMapId).toBe('building-grade9-2f');

    const g9_2F = getMapById('building-grade9-2f');
    const stairG9_2to1 = g9_2F.interactables.find((i) => i.id === 'stair-g9-2f-down');
    expect(stairG9_2to1?.targetMapId).toBe('building-grade9-1f');
    const stairG9_2to3 = g9_2F.interactables.find((i) => i.id === 'stair-g9-2f-up');
    expect(stairG9_2to3?.targetMapId).toBe('building-grade9-3f');

    const g9_3F = getMapById('building-grade9-3f');
    const stairG9_3to2 = g9_3F.interactables.find((i) => i.id === 'stair-g9-3f-down');
    expect(stairG9_3to2?.targetMapId).toBe('building-grade9-2f');

    // Art: 1F <-> 2F
    const art1F = getMapById('building-art-1f');
    const stairArt1to2 = art1F.interactables.find((i) => i.id === 'stair-art-1f-up');
    expect(stairArt1to2?.targetMapId).toBe('building-art-2f');

    const art2F = getMapById('building-art-2f');
    const stairArt2to1 = art2F.interactables.find((i) => i.id === 'stair-art-2f-down');
    expect(stairArt2to1?.targetMapId).toBe('building-art-1f');
  });

  it('4. Real Daxi Junior High teachers are positioned in their authentic classrooms', () => {
    // Li Yu-Ying (English convener / language-navigator) in Admin 3F Language Lab
    const admin3F = getMapById('building-admin-3f');
    const liNPC = admin3F.interactables.find((i) => i.id === 'npc-li-yuying');
    expect(liNPC).toBeDefined();
    expect(liNPC?.name).toContain('李昱瑩');
    expect(liNPC?.npcData?.title).toContain('英語領域召集人');

    // Zhang Zhi-Xin (Science convener / element-researcher) in Tech 2F Science Lab 1
    const tech2F = getMapById('building-tech-2f');
    const zhangNPC = tech2F.interactables.find((i) => i.id === 'npc-zhang-zhixin');
    expect(zhangNPC).toBeDefined();
    expect(zhangNPC?.name).toContain('張致信');
    expect(zhangNPC?.npcData?.title).toContain('自然領域召集人');

    // Chen Yi-Hong (Tech convener / digital-engineer) in Tech 2F Digital Console
    const chenNPC = tech2F.interactables.find((i) => i.id === 'npc-chen-yihong');
    expect(chenNPC).toBeDefined();
    expect(chenNPC?.name).toContain('陳毅宏');
    expect(chenNPC?.npcData?.title).toContain('科技領域召集人');

    // Cai Zhi-Min in Grade 7 Math Challenge Room
    const mathRoom = getMapById('room-math-challenge');
    const caiNPC = mathRoom.interactables.find((i) => i.type === 'npc');
    expect(caiNPC?.name).toContain('蔡');
  });

  it('5. Elementary arithmetic easter eggs and classroom challenges are accessible', () => {
    // Kindergarten 9x9 multiplication
    const easter99 = getChallengeById('easter-egg-kindergarten-multiplication');
    expect(easter99).toBeDefined();
    expect(easter99?.isEasterEgg).toBe(true);

    // Kindergarten elementary addition & mental math blocks
    const easterBlocks = getChallengeById('easter-egg-kindergarten-blocks');
    expect(easterBlocks).toBeDefined();
    expect(easterBlocks?.isEasterEgg).toBe(true);
    expect(easterBlocks?.questions.some((q) => q.prompt.includes('8 + 7'))).toBe(true);
    expect(easterBlocks?.questions.some((q) => q.prompt.includes('28 + 15'))).toBe(true);
    expect(easterBlocks?.questions.some((q) => q.prompt.includes('98 + 47'))).toBe(true);

    // Health Center Heartbeat / Addition
    const easterHealth = getChallengeById('easter-egg-health-addition');
    expect(easterHealth).toBeDefined();
    expect(easterHealth?.isEasterEgg).toBe(true);

    // Coop Change Speed Math
    const easterCoop = getChallengeById('easter-egg-coop-change');
    expect(easterCoop).toBeDefined();
    expect(easterCoop?.isEasterEgg).toBe(true);

    // Boardgame Math
    const easterBoard = getChallengeById('easter-egg-boardgame-math');
    expect(easterBoard).toBeDefined();
    expect(easterBoard?.isEasterEgg).toBe(true);
  });

  it('6. getLocationBreadcrumb provides standard breadcrumb navigation paths', () => {
    expect(getLocationBreadcrumb('campus-outdoor')).toEqual(['桃園市立大溪國中', '校園戶外中庭']);
    expect(getLocationBreadcrumb('building-new-1f')).toEqual(['桃園市立大溪國中', '新大樓 (七年級)', '1F 穿堂廣場']);
    expect(getLocationBreadcrumb('building-admin-1f')).toEqual(['桃園市立大溪國中', '行政大樓', '1F 導師與行政廣場']);
    expect(getLocationBreadcrumb('tech-lab-interior')).toEqual(['大溪國中', '科技館', '1F', '能源核心實驗室']);
    expect(getLocationBreadcrumb('building-tech-2f')).toEqual(['桃園市立大溪國中', '科技館', '2F 理化創客館']);
    expect(getLocationBreadcrumb('building-multi-1f')).toEqual(['桃園市立大溪國中', '綜合大樓', '1F 校史與特教餐飲中心']);
    expect(getLocationBreadcrumb('building-grade8-1f')).toEqual(['桃園市立大溪國中', '八年級教學棟', '1F 木藝與幼兒天地']);
    expect(getLocationBreadcrumb('building-grade9-1f')).toEqual(['桃園市立大溪國中', '九年級教學棟', '1F 相似形探索區']);
    expect(getLocationBreadcrumb('building-art-1f')).toEqual(['桃園市立大溪國中', '藝術館', '1F 樂活體能教室']);
    expect(getLocationBreadcrumb('building-activity')).toEqual(['桃園市立大溪國中', '學生活動中心', '會考大殿堂 The Grand Arena']);
  });
});
