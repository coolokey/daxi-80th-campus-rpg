import type { MapDefinition } from '../../types/rpg';

/**
 * 九年級教學棟 1F 相似形探索區 (building-grade9-1f)
 * 包含：906、907、908、東側樓梯上 2F、大門通往校園中庭
 */
export const BUILDING_GRADE9_1F_MAP: MapDefinition = {
  id: 'building-grade9-1f',
  name: '九年級教學棟 1F 相似形探索區',
  width: 800,
  height: 500,
  defaultSpawn: { x: 400, y: 440 },
  locationPath: ['大溪國中', '九年級教學棟', '1F 相似形探索區'],
  buildingId: 'building-grade9',
  floorLevel: 1,
  themeColor: '#ea580c',
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

    { x: 200, y: 260, width: 40, height: 70 },
    { x: 560, y: 260, width: 40, height: 70 },

    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 大門出校園
    {
      id: 'door-g9-exit-to-campus',
      type: 'door',
      name: '九年級棟大門 (通往校園中庭)',
      x: 400,
      y: 470,
      width: 60,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 走出九年級棟回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 860, y: 480 },
    },
    // 東側樓梯往 2F
    {
      id: 'stair-g9-1f-up',
      type: 'stairs',
      name: '九年級東側樓梯 (往 2F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上樓梯前往 2F 圓與幾何綜合區',
      stairDirection: 'up',
      targetMapId: 'building-grade9-2f',
      targetSpawn: { x: 670, y: 240 },
    },
    // 教室門牌
    {
      id: 'room-plate-906',
      type: 'object',
      name: '906 教室門牌',
      doorPlate: '906',
      x: 200,
      y: 130,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年六班教室',
      challengeId: 'challenge-g9-06',
      npcData: {
        title: '906 教室',
        dialogue: '【教室任務】相似形比例、縮放與平行線截比例線段定理！',
      },
    },
    {
      id: 'room-plate-907',
      type: 'object',
      name: '907 教室門牌',
      doorPlate: '907',
      x: 380,
      y: 130,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年七班教室',
      challengeId: 'challenge-g9-07',
      npcData: {
        title: '907 教室',
        dialogue: '【教室任務】圓心角、圓周角、弦切角與圓內外角幾何證明！',
      },
    },
    {
      id: 'room-plate-908',
      type: 'object',
      name: '908 教室門牌',
      doorPlate: '908',
      x: 560,
      y: 130,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年八班教室',
      challengeId: 'challenge-g9-08',
      npcData: {
        title: '908 教室',
        dialogue: '【教室任務】銳角三角比（sin/cos/tan）與視角測量仰角俯角問題！',
      },
    },
  ],
};

/**
 * 九年級教學棟 2F 圓與幾何綜合區 (building-grade9-2f)
 * 包含：904、905、社團教室、樓梯上下
 */
export const BUILDING_GRADE9_2F_MAP: MapDefinition = {
  id: 'building-grade9-2f',
  name: '九年級教學棟 2F 圓與幾何綜合區',
  width: 800,
  height: 500,
  defaultSpawn: { x: 670, y: 240 },
  locationPath: ['大溪國中', '九年級教學棟', '2F 圓與幾何綜合區'],
  buildingId: 'building-grade9',
  floorLevel: 2,
  themeColor: '#c2410c',
  spawnPoints: {
    'spawn-stair-up': { x: 670, y: 240 },
    'spawn-stair-down': { x: 130, y: 240 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 800, height: 30 },

    { x: 380, y: 430, width: 80, height: 35 },

    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
    { x: 100, y: 120, width: 20, height: 100 },
    { x: 100, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 東側樓梯下 1F
    {
      id: 'stair-g9-2f-down',
      type: 'stairs',
      name: '九年級東側樓梯 (往 1F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 1F 相似形區',
      stairDirection: 'down',
      targetMapId: 'building-grade9-1f',
      targetSpawn: { x: 670, y: 240 },
    },
    // 西側樓梯上 3F
    {
      id: 'stair-g9-2f-up',
      type: 'stairs',
      name: '九年級西側樓梯 (往 3F)',
      x: 60,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上西側樓梯前往 3F 函數與會考決戰區',
      stairDirection: 'up',
      targetMapId: 'building-grade9-3f',
      targetSpawn: { x: 130, y: 240 },
    },
    // 教室門牌
    {
      id: 'room-plate-904',
      type: 'object',
      name: '904 教室門牌',
      doorPlate: '904',
      x: 220,
      y: 130,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年四班教室',
      challengeId: 'challenge-g9-04',
      npcData: {
        title: '904 教室',
        dialogue: '【教室任務】點、直線與兩圓之位置關係（外離/外切/相交/內切/內離）！',
      },
    },
    {
      id: 'room-plate-905',
      type: 'object',
      name: '905 教室門牌',
      doorPlate: '905',
      x: 400,
      y: 130,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年五班教室',
      challengeId: 'challenge-g9-05',
      npcData: {
        title: '905 教室',
        dialogue: '【教室任務】三角形三心（外心、內心、重心）坐標性質綜合應用題！',
      },
    },
    {
      id: 'room-plate-g9-clubs',
      type: 'object',
      name: '社團教室門牌',
      doorPlate: '綜合社團教室 🌟',
      x: 580,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年級多元社團專用空間',
      challengeId: 'challenge-g9-clubs',
      npcData: {
        title: '綜合社團教室',
        dialogue: '【社團任務】跨領域專案數據分析與問卷調查卡方檢定模型！',
      },
    },
  ],
};

/**
 * 九年級教學棟 3F 函數與會考決戰區 (building-grade9-3f)
 * 包含：901、902、903、九年級代數函數教室、樓梯下 2F
 */
export const BUILDING_GRADE9_3F_MAP: MapDefinition = {
  id: 'building-grade9-3f',
  name: '九年級教學棟 3F 函數與會考決戰區',
  width: 800,
  height: 500,
  defaultSpawn: { x: 130, y: 240 },
  locationPath: ['大溪國中', '九年級教學棟', '3F 函數與會考決戰區'],
  buildingId: 'building-grade9',
  floorLevel: 3,
  themeColor: '#9a3412',
  spawnPoints: {
    'spawn-stair-up': { x: 130, y: 240 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 800, height: 30 },

    { x: 100, y: 120, width: 20, height: 100 },
    { x: 100, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 西側樓梯下 2F
    {
      id: 'stair-g9-3f-down',
      type: 'stairs',
      name: '九年級西側樓梯 (往 2F)',
      x: 60,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 2F 九年級走廊',
      stairDirection: 'down',
      targetMapId: 'building-grade9-2f',
      targetSpawn: { x: 130, y: 240 },
    },
    // 教室門牌
    {
      id: 'room-plate-901',
      type: 'object',
      name: '901 教室門牌',
      doorPlate: '901',
      x: 180,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年一班教室',
      challengeId: 'challenge-g9-01',
      npcData: {
        title: '901 教室',
        dialogue: '【教室任務】二次函數 y = a(x - h)² + k 圖形平移與頂點極值！',
      },
    },
    {
      id: 'room-plate-902',
      type: 'object',
      name: '902 教室門牌',
      doorPlate: '902',
      x: 320,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年二班教室',
      challengeId: 'challenge-g9-02',
      npcData: {
        title: '902 教室',
        dialogue: '【教室任務】四分位數、全距與盒狀圖（箱形圖）極端值辨識！',
      },
    },
    {
      id: 'room-plate-903',
      type: 'object',
      name: '903 教室門牌',
      doorPlate: '903',
      x: 460,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】九年三班教室',
      challengeId: 'challenge-g9-03',
      npcData: {
        title: '903 教室',
        dialogue: '【教室任務】古典機率理論值、抽樣實驗與樹狀圖可能情形分析！',
      },
    },
    {
      id: 'room-plate-g9-algebra',
      type: 'object',
      name: '九年級代數函數教室門牌',
      doorPlate: '會考代數總複習室 ⚡',
      x: 620,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 55,
      promptText: '【門牌】國中會考數學決戰衝刺教室',
      challengeId: 'challenge-g9-algebra',
      npcData: {
        title: '會考代數總複習室',
        dialogue: '【衝刺任務】全方位跨單元會考壓軸模擬題！為登上最終會考大殿堂奠定頂尖實力！',
      },
    },
  ],
};
