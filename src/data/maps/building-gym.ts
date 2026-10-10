import type { MapDefinition } from '../../types/rpg';

/**
 * 活動中心 1F (building-gym-1f)
 * 包含：室內綜合球場、體適能檢測中心、司令看台、出入口往校園
 */
export const BUILDING_GYM_1F_MAP: MapDefinition = {
  id: 'building-gym-1f',
  name: '活動中心 1F 室內綜合球場',
  width: 900,
  height: 550,
  defaultSpawn: { x: 450, y: 490 },
  locationPath: ['桃園市立大溪國中', '活動中心 (體育館)', '1F 綜合球場'],
  buildingId: 'building-gym',
  floorLevel: 1,
  themeColor: '#ca8a04',
  spawnPoints: {
    'spawn-from-campus': { x: 450, y: 490 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 550 },
    { x: 870, y: 0, width: 30, height: 550 },
    { x: 0, y: 0, width: 900, height: 100 },
    { x: 0, y: 520, width: 390, height: 30 },
    { x: 510, y: 520, width: 390, height: 30 },

    // Left and right bleachers / equipment stands
    { x: 30, y: 150, width: 50, height: 260 },
    { x: 820, y: 150, width: 50, height: 260 },
  ],
  interactables: [
    {
      id: 'door-gym-exit',
      type: 'door',
      name: '活動中心大門 (通往校園)',
      x: 450,
      y: 520,
      width: 60,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 走出活動中心回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 380, y: 640 },
    },
    {
      id: 'room-plate-court',
      type: 'object',
      name: '綜合室內球場門牌',
      doorPlate: '綜合室內球場 ✦',
      x: 320,
      y: 110,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】綜合室內球場（籃球、羽球、排球標準場地）',
    },
    {
      id: 'room-plate-fitness',
      type: 'object',
      name: '體適能檢測中心門牌',
      doorPlate: '體適能健康中心',
      x: 580,
      y: 110,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】體適能健康管理中心',
    },
  ],
};
