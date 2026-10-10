import type { MapDefinition } from '../../types/rpg';

/**
 * 綜合大樓 / 樂活圖書館 1F (building-complex-1f)
 * 包含：樂活圖書館、桌遊益智教室(彩蛋)、創客中心、東側往 2F 樓梯、出入口往校園
 */
export const BUILDING_COMPLEX_1F_MAP: MapDefinition = {
  id: 'building-complex-1f',
  name: '綜合大樓 1F 樂活圖書館',
  width: 800,
  height: 500,
  defaultSpawn: { x: 400, y: 440 },
  locationPath: ['桃園市立大溪國中', '綜合大樓 (圖書館)', '1F 樂活圖書館'],
  buildingId: 'building-complex',
  floorLevel: 1,
  themeColor: '#059669',
  spawnPoints: {
    'spawn-from-campus': { x: 400, y: 440 },
    'spawn-stair-down': { x: 670, y: 240 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 340, height: 30 },
    { x: 460, y: 470, width: 340, height: 30 },

    // Bookshelf clusters
    { x: 160, y: 220, width: 100, height: 40 },
    { x: 160, y: 320, width: 100, height: 40 },
    { x: 520, y: 220, width: 100, height: 40 },
    { x: 520, y: 320, width: 100, height: 40 },

    // East stairwell side walls
    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    {
      id: 'door-complex-exit',
      type: 'door',
      name: '綜合大樓大門 (通往校園)',
      x: 400,
      y: 470,
      width: 60,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 走出綜合大樓回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 1080, y: 200 },
    },
    {
      id: 'stair-complex-1f-up',
      type: 'stairs',
      name: '綜合大樓東側樓梯 (往 2F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上樓梯前往 2F 資訊研習中心',
      stairDirection: 'up',
      targetMapId: 'building-complex-2f',
      targetSpawn: { x: 670, y: 240 },
    },
    // Doorplates
    {
      id: 'room-plate-library-main',
      type: 'object',
      name: '樂活圖書館門牌',
      doorPlate: '樂活圖書館 ◈',
      x: 280,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '◈【門牌】樂活圖書館（按 [E] 進行資訊檢索與邏輯推理挑戰）',
      challengeId: 'challenge-library-research',
    },
    {
      id: 'room-plate-boardgame-easter',
      type: 'object',
      name: '桌遊益智教室門牌 (彩蛋)',
      doorPlate: '桌遊益智教室 ✦',
      x: 440,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '✨【彩蛋門牌】桌遊益智教室（按 [E] 觸發趣味速算九九乘法彩蛋）',
      challengeId: 'challenge-multiplication-easter',
    },
    {
      id: 'room-plate-maker-space',
      type: 'object',
      name: '創客自造基地門牌',
      doorPlate: '創客自造基地',
      x: 580,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】創客自造空間（3D 列印與雷雕）',
    },
  ],
};

/**
 * 綜合大樓 2F 數位資訊中心 (building-complex-2f)
 */
export const BUILDING_COMPLEX_2F_MAP: MapDefinition = {
  id: 'building-complex-2f',
  name: '綜合大樓 2F 數位資訊中心',
  width: 800,
  height: 500,
  defaultSpawn: { x: 670, y: 240 },
  locationPath: ['桃園市立大溪國中', '綜合大樓 (圖書館)', '2F 數位資訊中心'],
  buildingId: 'building-complex',
  floorLevel: 2,
  themeColor: '#047857',
  spawnPoints: {
    'spawn-stair-down': { x: 670, y: 240 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 800, height: 30 },

    // East stairwell side walls
    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    {
      id: 'stair-complex-2f-down',
      type: 'stairs',
      name: '綜合大樓東側樓梯 (往 1F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 1F 圖書館',
      stairDirection: 'down',
      targetMapId: 'building-complex-1f',
      targetSpawn: { x: 670, y: 240 },
    },
    {
      id: 'room-plate-computer-lab',
      type: 'object',
      name: '電腦數位研習教室門牌',
      doorPlate: '數位資訊教室',
      x: 320,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】數位資訊科技教室（編程與 AI 運算）',
    },
    {
      id: 'room-plate-audiovisual',
      type: 'object',
      name: '多媒體視聽教室門牌',
      doorPlate: '多媒體視聽廳',
      x: 500,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】多媒體視聽階梯演藝廳',
    },
  ],
};
