import type { MapDefinition } from '../../types/rpg';

/**
 * 科技館 2F 理化實驗室與數位科技創客館 (building-tech-2f)
 * 包含：理化實驗室一（張致信老師駐點）、理化實驗室二、科技創作工坊、數位工程台（陳毅宏老師駐點）、樓梯下 1F
 */
export const BUILDING_TECH_2F_MAP: MapDefinition = {
  id: 'building-tech-2f',
  name: '科技館 2F 理化創客館',
  width: 800,
  height: 500,
  defaultSpawn: { x: 670, y: 240 },
  locationPath: ['大溪國中', '科技館', '2F 理化創客館'],
  buildingId: 'building-tech',
  floorLevel: 2,
  themeColor: '#0ea5e9',
  spawnPoints: {
    'spawn-stair-up': { x: 670, y: 240 },
  },
  obstacles: [
    // 外牆
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 800, height: 30 },

    // 中央實驗展示島台
    { x: 260, y: 260, width: 120, height: 60 },
    { x: 440, y: 260, width: 120, height: 60 },

    // 東側樓梯隔間
    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },

    // NPC 碰撞體
    { x: 220 - 16, y: 220 - 10, width: 32, height: 24 }, // 張致信老師
    { x: 580 - 16, y: 220 - 10, width: 32, height: 24 }, // 陳毅宏老師
  ],
  interactables: [
    // 樓梯下 1F
    {
      id: 'stair-tech-2f-down',
      type: 'stairs',
      name: '科技館東側樓梯 (往 1F 能源實驗室)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 1F 能源核心實驗室',
      stairDirection: 'down',
      targetMapId: 'tech-lab-interior',
      targetSpawn: { x: 670, y: 240 },
    },
    // 張致信老師 NPC (自然領域召集人 / 元素研究員)
    {
      id: 'npc-zhang-zhixin',
      type: 'npc',
      name: '元素研究員 (張致信老師)',
      x: 220,
      y: 220,
      width: 32,
      height: 48,
      interactionRadius: 75,
      promptText: '按 [E] 與自然領域召集人張致信老師交談',
      npcData: {
        title: '自然領域召集人・元素研究員',
        dialogue: '歡迎來到理化實驗室！我們正在監測全校化學平衡與光電光譜數據。物質不滅與能量守恆是宇宙定律，想親手調配反應比例嗎？',
        portraitUrl: '/assets/teachers/teacher-003-portrait.png',
      },
    },
    // 陳毅宏老師 NPC (科技領域召集人 / 數位工程師)
    {
      id: 'npc-chen-yihong',
      type: 'npc',
      name: '數位工程師 (陳毅宏老師)',
      x: 580,
      y: 220,
      width: 32,
      height: 48,
      interactionRadius: 75,
      promptText: '按 [E] 與科技領域召集人陳毅宏老師交談',
      npcData: {
        title: '科技領域召集人・數位工程師',
        dialogue: '嗨！這是數位工程台與自造基地。從程式演算法到機構齒輪，只要邏輯嚴密，校園的一切智慧裝置都能由你操控！',
        portraitUrl: '/assets/teachers/teacher-002-portrait.png',
      },
    },
    // 教室與實驗室門牌
    {
      id: 'room-plate-science-lab-1',
      type: 'object',
      name: '理化第一實驗室門牌',
      doorPlate: '理化實驗室一 ⚛',
      x: 180,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】理化第一實驗室（張致信老師駐點）',
      challengeId: 'challenge-science-lab-1',
      npcData: {
        title: '理化第一實驗室',
        dialogue: '【實驗任務】元素反應與化學莫耳數守恆平衡計算！',
      },
    },
    {
      id: 'room-plate-science-lab-2',
      type: 'object',
      name: '理化第二實驗室門牌',
      doorPlate: '理化實驗室二',
      x: 340,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】理化第二實驗室（精密光學與力學）',
      challengeId: 'challenge-science-lab-2',
      npcData: {
        title: '理化第二實驗室',
        dialogue: '【實驗任務】凸透鏡焦距成像與浮力力學平衡運算！',
      },
    },
    {
      id: 'room-plate-tech-maker',
      type: 'object',
      name: '科技創作工坊門牌',
      doorPlate: '科技創作工坊 ⚙',
      x: 500,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】科技創作工坊（自造者創客空間）',
      challengeId: 'challenge-tech-maker',
      npcData: {
        title: '科技創作工坊',
        dialogue: '【創客任務】智慧避障機器人紅外線測距幾何演算法！',
      },
    },
    {
      id: 'room-plate-tech-digital',
      type: 'object',
      name: '數位工程台門牌',
      doorPlate: '數位工程台 💻',
      x: 640,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】數位工程台（陳毅宏老師駐點）',
      challengeId: 'challenge-tech-digital',
      npcData: {
        title: '數位工程台',
        dialogue: '【工程任務】布林邏輯閘（AND/OR/NOT）與二進位真值表校驗！',
      },
    },
  ],
};
