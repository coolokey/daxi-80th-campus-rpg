import type { MapDefinition } from '../../types/rpg';

/**
 * 新大樓 1F 穿堂廣場 (building-new-1f)
 * 包含：701、709 體育班、導師室、非營利幼兒園(九九乘法彩蛋)、東側往 2F 樓梯、校園出入口大門
 */
export const BUILDING_NEW_1F_MAP: MapDefinition = {
  id: 'building-new-1f',
  name: '新大樓 1F 穿堂廣場',
  width: 800,
  height: 500,
  defaultSpawn: { x: 400, y: 440 },
  locationPath: ['桃園市立大溪國中', '新大樓 (七年級)', '1F 穿堂廣場'],
  buildingId: 'building-new',
  floorLevel: 1,
  themeColor: '#00838f',
  spawnPoints: {
    'spawn-from-campus': { x: 400, y: 440 },
    'spawn-stair-down': { x: 670, y: 240 },
  },
  obstacles: [
    // Outer boundaries
    { x: 0, y: 0, width: 30, height: 500 }, // Left wall
    { x: 770, y: 0, width: 30, height: 500 }, // Right wall
    { x: 0, y: 0, width: 800, height: 120 }, // Top classroom wall
    { x: 0, y: 470, width: 340, height: 30 }, // Bottom wall left
    { x: 460, y: 470, width: 340, height: 30 }, // Bottom wall right

    // Interior structural columns & exhibition boards
    { x: 180, y: 260, width: 40, height: 80 },
    { x: 580, y: 260, width: 40, height: 80 },

    // East stairwell side walls
    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // Exit door to Campus Outdoor
    {
      id: 'door-exit-to-campus',
      type: 'door',
      name: '新大樓大門 (通往校園中庭)',
      x: 400,
      y: 470,
      width: 60,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 走出新大樓回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 1220, y: 200 },
    },
    // East Stairwell UP to 2F
    {
      id: 'stair-new-1f-up',
      type: 'stairs',
      name: '東側樓梯 (往 2F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上樓梯前往 2F',
      stairDirection: 'up',
      targetMapId: 'building-new-2f',
      targetSpawn: { x: 670, y: 240 },
    },
    // Classroom Doorplates (Immersion & inspection & easter eggs)
    {
      id: 'room-plate-701',
      type: 'object',
      name: '701 教室門牌',
      doorPlate: '701',
      x: 240,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】七年一班教室（自主晨讀中）',
      challengeId: 'challenge-g7-01',
      npcData: {
        title: '701 教室（數與數線探索室）',
        dialogue: '【教室任務】點擊進行七年級「數與數線／相反數與絕對值」單元題目挑戰！',
      },
    },
    {
      id: 'room-plate-preschool-easter',
      type: 'object',
      name: '非營利幼兒園門牌 (彩蛋)',
      doorPlate: '非營利幼兒園 ✦',
      x: 380,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '✨【彩蛋門牌】非營利幼兒園（按 [E] 挑戰國小九九乘法速問）',
      challengeId: 'easter-egg-kindergarten-multiplication',
      npcData: {
        title: '幼兒園懷舊教室',
        dialogue: '【趣味彩蛋】國小九九乘法表回憶殺！你能秒答所有乘法運算嗎？',
      },
    },
    {
      id: 'room-plate-709',
      type: 'object',
      name: '709 體育班教室門牌',
      doorPlate: '709 體育班',
      x: 520,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】七年九班體育班教室（訓練中）',
      challengeId: 'challenge-g7-09',
      npcData: {
        title: '709 體育班教室',
        dialogue: '【教室任務】體育折返跑數據分析與整數比值運算挑戰！',
      },
    },
    {
      id: 'room-plate-teachers-office',
      type: 'object',
      name: '七年級導師室門牌',
      doorPlate: '七年級導師室',
      x: 140,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】七年級導師室（教師備課交流中）',
      challengeId: 'challenge-g7-office',
      npcData: {
        title: '七年級導師室',
        dialogue: '【處室任務】七年級班級經營與學生學期評量數據統籌任務！',
      },
    },
  ],
};

/**
 * 新大樓 2F 走廊 (building-new-2f)
 * 包含：702、703、家長會、東側往 1F 樓梯、西側往 3F 樓梯
 */
export const BUILDING_NEW_2F_MAP: MapDefinition = {
  id: 'building-new-2f',
  name: '新大樓 2F 走廊',
  width: 800,
  height: 500,
  defaultSpawn: { x: 670, y: 240 },
  locationPath: ['桃園市立大溪國中', '新大樓 (七年級)', '2F 走廊'],
  buildingId: 'building-new',
  floorLevel: 2,
  themeColor: '#00695c',
  spawnPoints: {
    'spawn-stair-up': { x: 670, y: 240 },
    'spawn-stair-down': { x: 130, y: 240 },
  },
  obstacles: [
    // Outer boundaries
    { x: 0, y: 0, width: 30, height: 500 }, // Left wall
    { x: 770, y: 0, width: 30, height: 500 }, // Right wall
    { x: 0, y: 0, width: 800, height: 120 }, // Top classroom wall
    { x: 0, y: 470, width: 800, height: 30 }, // Bottom wall (safety handrail)

    // Corridor decorative benches & display cases
    { x: 380, y: 430, width: 80, height: 35 },

    // Stair enclosure walls
    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
    { x: 100, y: 120, width: 20, height: 100 },
    { x: 100, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // East Stairwell DOWN to 1F
    {
      id: 'stair-new-2f-down',
      type: 'stairs',
      name: '東側樓梯 (往 1F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 1F 穿堂',
      stairDirection: 'down',
      targetMapId: 'building-new-1f',
      targetSpawn: { x: 670, y: 240 },
    },
    // West Stairwell UP to 3F
    {
      id: 'stair-new-2f-up',
      type: 'stairs',
      name: '西側樓梯 (往 3F)',
      x: 60,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上西側樓梯前往 3F',
      stairDirection: 'up',
      targetMapId: 'building-new-3f',
      targetSpawn: { x: 130, y: 240 },
    },
    // Classroom Doorplates
    {
      id: 'room-plate-702',
      type: 'object',
      name: '702 教室門牌',
      doorPlate: '702',
      x: 260,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】七年二班教室',
      challengeId: 'challenge-g7-02',
      npcData: {
        title: '702 教室',
        dialogue: '【教室任務】正負數加減乘除四則混合運算與括號去括號法則！',
      },
    },
    {
      id: 'room-plate-703',
      type: 'object',
      name: '703 教室門牌',
      doorPlate: '703',
      x: 420,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】七年三班教室',
      challengeId: 'challenge-g7-03',
      npcData: {
        title: '703 教室',
        dialogue: '【教室任務】指數律乘除法則（aᵐ × aⁿ = aᵐ⁺ⁿ）與科學記號大小比較！',
      },
    },
    {
      id: 'room-plate-pta',
      type: 'object',
      name: '家長會辦公室門牌',
      doorPlate: '家長會辦公室 🤝',
      x: 580,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】學生家長會辦公室',
      challengeId: 'challenge-g7-pta',
      npcData: {
        title: '家長會辦公室',
        dialogue: '【處室任務】家長會校務發展志工時數與贊助經費收支統計演算！',
      },
    },
  ],
};

/**
 * 新大樓 3F 走廊 (building-new-3f)
 * 包含：706 質數研究室 (質數判別特訓)、707、西側往 2F 樓梯、七年級數學研究室入口大門
 */
export const BUILDING_NEW_3F_MAP: MapDefinition = {
  id: 'building-new-3f',
  name: '新大樓 3F 走廊',
  width: 800,
  height: 500,
  defaultSpawn: { x: 130, y: 240 },
  locationPath: ['桃園市立大溪國中', '新大樓 (七年級)', '3F 走廊'],
  buildingId: 'building-new',
  floorLevel: 3,
  themeColor: '#1565c0',
  spawnPoints: {
    'spawn-stair-up': { x: 130, y: 240 },
    'spawn-from-math-room': { x: 620, y: 200 },
  },
  obstacles: [
    // Outer boundaries
    { x: 0, y: 0, width: 30, height: 500 }, // Left wall
    { x: 770, y: 0, width: 30, height: 500 }, // Right wall
    { x: 0, y: 0, width: 800, height: 120 }, // Top classroom wall
    { x: 0, y: 470, width: 800, height: 30 }, // Bottom wall (safety handrail)

    // West Stairwell enclosure walls
    { x: 100, y: 120, width: 20, height: 100 },
    { x: 100, y: 280, width: 20, height: 100 },

    // Holographic research terminal decoration
    { x: 420, y: 430, width: 60, height: 35 },
  ],
  interactables: [
    // West Stairwell DOWN to 2F
    {
      id: 'stair-new-3f-down',
      type: 'stairs',
      name: '西側樓梯 (往 2F)',
      x: 60,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 2F',
      stairDirection: 'down',
      targetMapId: 'building-new-2f',
      targetSpawn: { x: 130, y: 240 },
    },
    // Classroom Doorplates: 706 質數研究室 (質數判別特訓)
    {
      id: 'room-plate-706',
      type: 'object',
      name: '706 質因數特訓門牌',
      doorPlate: '706 質因數 ◈',
      x: 200,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '◈【特訓門牌】706 質因數研究室（按 [E] 進入質數判別特訓關卡）',
      challengeId: 'challenge-g7-06',
      npcData: {
        title: '706 質因數研究室',
        dialogue: '【教室任務】質因數分解、短除法與最大公因數最小公倍數應用題！',
      },
    },
    {
      id: 'room-plate-707',
      type: 'object',
      name: '707 教室門牌',
      doorPlate: '707',
      x: 340,
      y: 130,
      width: 40,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】七年七班教室',
      challengeId: 'challenge-g7-07',
      npcData: {
        title: '707 教室',
        dialogue: '【教室任務】一元一次方程式未知數移項法則與應用題列式！',
      },
    },
    {
      id: 'room-plate-union',
      type: 'object',
      name: '教師會辦公室門牌',
      doorPlate: '教師會辦公室 📚',
      x: 470,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】教師會辦公室',
      challengeId: 'challenge-g7-union',
      npcData: {
        title: '教師會辦公室',
        dialogue: '【處室任務】教師研習與七年級數學課程共備社群成果展！',
      },
    },
    // Challenge Room Entrance: 數學研究室
    {
      id: 'door-math-challenge-room',
      type: 'door',
      name: '七年級數學研究室大門',
      doorPlate: '數學研究室 ◈',
      x: 620,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 65,
      promptText: '◈ 按 [E] 進入七年級數學研究室',
      targetMapId: 'room-math-challenge',
      targetSpawn: { x: 325, y: 380 },
    },
  ],
};
