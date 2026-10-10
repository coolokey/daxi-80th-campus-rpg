import type { MapDefinition } from '../../types/rpg';

/**
 * 綜合大樓 1F 校史與特教餐飲中心 (building-multi-1f)
 * 包含：校史室、餐飲教室、特教導師室、樓梯上 2F、大門通往校園
 */
export const BUILDING_MULTI_1F_MAP: MapDefinition = {
  id: 'building-multi-1f',
  name: '綜合大樓 1F 校史與特教餐飲中心',
  width: 800,
  height: 500,
  defaultSpawn: { x: 400, y: 440 },
  locationPath: ['大溪國中', '綜合大樓', '1F 校史與特教餐飲中心'],
  buildingId: 'building-multi',
  floorLevel: 1,
  themeColor: '#7c3aed',
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

    { x: 220, y: 260, width: 40, height: 70 },
    { x: 540, y: 260, width: 40, height: 70 },

    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 大門出校園
    {
      id: 'door-multi-exit-to-campus',
      type: 'door',
      name: '綜合大樓大門 (通往校園中庭)',
      x: 400,
      y: 470,
      width: 60,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 走出綜合大樓回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 1060, y: 220 },
    },
    // 東側樓梯往 2F
    {
      id: 'stair-multi-1f-up',
      type: 'stairs',
      name: '綜合大樓東側樓梯 (往 2F 圖書館)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上樓梯前往 2F 圖書館與資訊中心',
      stairDirection: 'up',
      targetMapId: 'building-multi-2f',
      targetSpawn: { x: 670, y: 240 },
    },
    // 教室門牌
    {
      id: 'room-plate-multi-history',
      type: 'object',
      name: '校史室門牌',
      doorPlate: '校史室 🏛',
      x: 180,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】大溪國中校史典藏室',
      challengeId: 'challenge-multi-history',
      npcData: {
        title: '校史室',
        dialogue: '【教室任務】大溪一甲子歷史時空軸！正負年代數線與校史里程碑演算。',
      },
    },
    {
      id: 'room-plate-multi-cooking',
      type: 'object',
      name: '餐飲教室門牌',
      doorPlate: '餐飲教室 🍴',
      x: 360,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】生活家政與餐飲教室',
      challengeId: 'challenge-multi-cooking',
      npcData: {
        title: '餐飲教室',
        dialogue: '【教室任務】大溪豆干烹調配比！食材重量百分比濃度與比例分配題。',
      },
    },
    {
      id: 'room-plate-multi-special',
      type: 'object',
      name: '特教導師室門牌',
      doorPlate: '特教導師室 ☀',
      x: 540,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】資源與特教導師室',
      challengeId: 'challenge-multi-special',
      npcData: {
        title: '特教導師室',
        dialogue: '【教室任務】個別化學習適性矩陣與多維度能力向度評估題！',
      },
    },
  ],
};

/**
 * 綜合大樓 2F 圖書館與資訊中心 (building-multi-2f)
 * 包含：圖書館-知識檢索空間、大電腦教室、資訊機房、樓梯下 1F
 */
export const BUILDING_MULTI_2F_MAP: MapDefinition = {
  id: 'building-multi-2f',
  name: '綜合大樓 2F 圖書館與資訊中心',
  width: 800,
  height: 500,
  defaultSpawn: { x: 670, y: 240 },
  locationPath: ['大溪國中', '綜合大樓', '2F 圖書館與資訊中心'],
  buildingId: 'building-multi',
  floorLevel: 2,
  themeColor: '#6d28d9',
  spawnPoints: {
    'spawn-stair-up': { x: 670, y: 240 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 800, height: 30 },

    // 圖書館大型書架
    { x: 180, y: 240, width: 80, height: 120 },
    { x: 300, y: 240, width: 80, height: 120 },
    { x: 420, y: 240, width: 80, height: 120 },

    // 東側樓梯隔間
    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 樓梯下 1F
    {
      id: 'stair-multi-2f-down',
      type: 'stairs',
      name: '綜合大樓東側樓梯 (往 1F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 1F 校史室',
      stairDirection: 'down',
      targetMapId: 'building-multi-1f',
      targetSpawn: { x: 670, y: 240 },
    },
    // 圖書館檢索島台
    {
      id: 'room-plate-multi-library',
      type: 'object',
      name: '圖書館知識檢索空間',
      doorPlate: '圖書館 📚',
      x: 180,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 55,
      promptText: '【門牌】大溪國中智慧圖書館（知識檢索中心）',
      challengeId: 'challenge-multi-library',
      npcData: {
        title: '智慧圖書館',
        dialogue: '【教室任務】圖書索書號杜威十進位分類法與二元搜尋法知識檢索挑戰！',
      },
    },
    {
      id: 'room-plate-multi-computer',
      type: 'object',
      name: '大電腦教室門牌',
      doorPlate: '大電腦教室 🖥',
      x: 400,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】大型多媒體電腦教室',
      challengeId: 'challenge-multi-computer',
      npcData: {
        title: '大電腦教室',
        dialogue: '【教室任務】巨量資料排序演算法（快速排序與時間複雜度 Big-O）！',
      },
    },
    {
      id: 'room-plate-multi-server',
      type: 'object',
      name: '資訊機房門牌',
      doorPlate: '資訊網路機房 🖧',
      x: 580,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】校園主幹核心資訊機房',
      challengeId: 'challenge-multi-server',
      npcData: {
        title: '資訊網路機房',
        dialogue: '【機房任務】二進位 IPv4/IPv6 子網遮罩計算與封包路徑拓撲圖論！',
      },
    },
  ],
};
