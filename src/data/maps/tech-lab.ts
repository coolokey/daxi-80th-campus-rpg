import type { Interactable, MapDefinition } from '../../types/rpg';

export const TECH_LAB_MAP: MapDefinition = {
  id: 'tech-lab-interior',
  name: '科技館・未來能源實驗室',
  width: 800,
  height: 550,
  defaultSpawn: { x: 400, y: 460 },
  themeColor: '#0284c7',
  obstacles: [
    // Outer walls
    { x: 0, y: 0, width: 30, height: 550 }, // Left wall
    { x: 770, y: 0, width: 30, height: 550 }, // Right wall
    { x: 0, y: 0, width: 800, height: 60 }, // Top wall (chalkboard / screens)
    { x: 0, y: 510, width: 350, height: 40 }, // Bottom wall left
    { x: 450, y: 510, width: 350, height: 40 }, // Bottom wall right

    // Central Energy Core Console Unit
    { x: 320, y: 160, width: 160, height: 120 },

    // Left experimental workbenches
    { x: 90, y: 140, width: 140, height: 60 },
    { x: 90, y: 280, width: 140, height: 60 },

    // Right experimental computer terminals
    { x: 570, y: 140, width: 140, height: 60 },
    { x: 570, y: 280, width: 140, height: 60 },
  ],
  interactables: [
    {
      id: 'door-campus-exit',
      type: 'door',
      name: '實驗室出口',
      x: 400,
      y: 505,
      width: 50,
      height: 25,
      interactionRadius: 55,
      promptText: '按 [E] 返回大溪校園',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 1220, y: 535 },
    },
    {
      id: 'core-terminal',
      type: 'object',
      name: '能源核心校準控制台',
      x: 400,
      y: 290,
      width: 60,
      height: 40,
      interactionRadius: 75,
      promptText: '按 [E] 啟動數學校準任務',
      npcData: {
        title: '能源核心控制台',
        dialogue: '【系統提示】檢測到七年級數學校準模組尚未鎖定，是否立即進行 5 道校準程序？',
      },
    },
    {
      id: 'npc-lab-assistant',
      type: 'npc',
      name: '實驗室助理 (數位工程師)',
      x: 640,
      y: 230,
      width: 32,
      height: 48,
      interactionRadius: 70,
      promptText: '按 [E] 詢問實驗室狀態',
      npcData: {
        title: '大溪科技館技術助教',
        dialogue: '歡迎進入大溪科技館實驗室！中央控制台正在監測校園能源流向，請協助蔡老師完成校準！',
      },
    },
    {
      id: 'stair-tech-1f-up',
      type: 'stairs',
      name: '科技館東側樓梯 (往 2F 理化創客館)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上樓梯前往 2F 理化實驗室與數位工程台',
      stairDirection: 'up',
      targetMapId: 'building-tech-2f',
      targetSpawn: { x: 670, y: 240 },
    },
    {
      id: 'room-plate-tech-av',
      type: 'object',
      name: '視聽教室門牌',
      doorPlate: '視聽教室',
      x: 160,
      y: 80,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】多媒體視聽教室',
      challengeId: 'challenge-tech-av',
      npcData: {
        title: '多媒體視聽教室',
        dialogue: '【教室任務】多媒體音訊採樣與數位訊號頻率傅立葉轉換！',
      },
    },
    {
      id: 'room-plate-tech-living-1',
      type: 'object',
      name: '生活科技第一教室門牌',
      doorPlate: '生活科技一',
      x: 300,
      y: 80,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】生活科技第一教室（機構與工藝）',
      challengeId: 'challenge-tech-living-1',
      npcData: {
        title: '生活科技第一教室',
        dialogue: '【教室任務】機械傳動齒輪比與扭力力矩槓桿原理計算！',
      },
    },
    {
      id: 'room-plate-tech-living-2',
      type: 'object',
      name: '生活科技第二教室門牌',
      doorPlate: '生活科技二',
      x: 500,
      y: 80,
      width: 45,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】生活科技第二教室（3D 列印與智慧製造）',
      challengeId: 'challenge-tech-living-2',
      npcData: {
        title: '生活科技第二教室',
        dialogue: '【教室任務】三維空間坐標建模與切片幾何公差計算！',
      },
    },
  ],
};

export const CALIBRATED_CORE_TERMINAL: Interactable = {
  id: 'core-terminal',
  type: 'object',
  name: '能源核心校準控制台 (穩定已校準)',
  x: 400,
  y: 290,
  width: 60,
  height: 40,
  interactionRadius: 75,
  promptText: '能源核心運轉穩定 [已完成校準]',
  npcData: {
    title: '能源核心控制台',
    dialogue: '【系統提示】七年級數學校準模組（正負數、指數、因數）已全數鎖定，能源核心狀態：穩定已校準 (100%)！',
  },
};

export function getTechLabMap(isCalibrated = false): MapDefinition {
  return {
    ...TECH_LAB_MAP,
    interactables: TECH_LAB_MAP.interactables.map((item) => {
      if (item.id === 'core-terminal') {
        return isCalibrated ? CALIBRATED_CORE_TERMINAL : item;
      }
      if (item.id === 'npc-lab-assistant' && isCalibrated) {
        return {
          ...item,
          npcData: {
            title: '大溪科技館技術助教',
            dialogue: '太棒了！中央能源核心已穩定運轉！你可以繼續在實驗室參觀，或從南側出口門返回大溪校園！',
          },
        };
      }
      return item;
    }),
  };
}

