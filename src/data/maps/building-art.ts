import type { MapDefinition } from '../../types/rpg';

/**
 * 藝術館 1F 樂活體能教室 (building-art-1f)
 * 包含：樂活教室、樓梯上 2F、大門通往校園中庭
 */
export const BUILDING_ART_1F_MAP: MapDefinition = {
  id: 'building-art-1f',
  name: '藝術館 1F 樂活體能教室',
  width: 800,
  height: 500,
  defaultSpawn: { x: 400, y: 440 },
  locationPath: ['大溪國中', '藝術館', '1F 樂活體能教室'],
  buildingId: 'building-art',
  floorLevel: 1,
  themeColor: '#d97706',
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

    { x: 240, y: 260, width: 60, height: 60 },
    { x: 500, y: 260, width: 60, height: 60 },

    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 大門出校園
    {
      id: 'door-art-exit-to-campus',
      type: 'door',
      name: '藝術館大門 (通往校園中庭)',
      x: 400,
      y: 470,
      width: 60,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 走出藝術館回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 220, y: 460 },
    },
    // 東側樓梯往 2F
    {
      id: 'stair-art-1f-up',
      type: 'stairs',
      name: '藝術館東側樓梯 (往 2F 音樂美學館)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▲ 按 [E] 走上樓梯前往 2F 音樂與美術空間',
      stairDirection: 'up',
      targetMapId: 'building-art-2f',
      targetSpawn: { x: 670, y: 240 },
    },
    // 教室門牌
    {
      id: 'room-plate-art-fitness',
      type: 'object',
      name: '樂活體能教室門牌',
      doorPlate: '樂活體能教室 🏃',
      x: 380,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 55,
      promptText: '【門牌】樂活體適能多元運動空間',
      challengeId: 'challenge-art-fitness',
      npcData: {
        title: '樂活體能教室',
        dialogue: '【體能任務】基礎代謝率 BMR、運動心率區間與熱量消耗公式換算！',
      },
    },
  ],
};

/**
 * 藝術館 2F 音樂與美學殿堂 (building-art-2f)
 * 包含：音樂教室、4F 美術教室通道、樓梯下 1F
 */
export const BUILDING_ART_2F_MAP: MapDefinition = {
  id: 'building-art-2f',
  name: '藝術館 2F 音樂與美學殿堂',
  width: 800,
  height: 500,
  defaultSpawn: { x: 670, y: 240 },
  locationPath: ['大溪國中', '藝術館', '2F 音樂與美學殿堂'],
  buildingId: 'building-art',
  floorLevel: 2,
  themeColor: '#b45309',
  spawnPoints: {
    'spawn-stair-up': { x: 670, y: 240 },
  },
  obstacles: [
    { x: 0, y: 0, width: 30, height: 500 },
    { x: 770, y: 0, width: 30, height: 500 },
    { x: 0, y: 0, width: 800, height: 120 },
    { x: 0, y: 470, width: 800, height: 30 },

    // 演奏樂器平台與展覽架
    { x: 260, y: 250, width: 100, height: 80 },
    { x: 440, y: 250, width: 100, height: 80 },

    { x: 700, y: 120, width: 20, height: 100 },
    { x: 700, y: 280, width: 20, height: 100 },
  ],
  interactables: [
    // 樓梯下 1F
    {
      id: 'stair-art-2f-down',
      type: 'stairs',
      name: '藝術館東側樓梯 (往 1F)',
      x: 720,
      y: 240,
      width: 40,
      height: 50,
      interactionRadius: 60,
      promptText: '▼ 按 [E] 走下樓梯前往 1F 樂活教室',
      stairDirection: 'down',
      targetMapId: 'building-art-1f',
      targetSpawn: { x: 670, y: 240 },
    },
    // 教室門牌
    {
      id: 'room-plate-art-music',
      type: 'object',
      name: '音樂教室門牌',
      doorPlate: '音樂教室 🎵',
      x: 240,
      y: 130,
      width: 50,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】多功能數位音樂教室',
      challengeId: 'challenge-art-music',
      npcData: {
        title: '數位音樂教室',
        dialogue: '【音樂任務】畢達哥拉斯五度相生律與十二平均律半音頻率等比級數計算！',
      },
    },
    {
      id: 'room-plate-art-visual',
      type: 'object',
      name: '美術教室通道門牌',
      doorPlate: '4F 美術教室通道 🎨',
      x: 520,
      y: 130,
      width: 55,
      height: 30,
      interactionRadius: 50,
      promptText: '【門牌】通往 4F 視覺藝術創作工坊',
      challengeId: 'challenge-art-visual',
      npcData: {
        title: '美術教室空間',
        dialogue: '【美學任務】黃金分割比例（1:1.618）構圖與單點透視幾何投影消失點推算！',
      },
    },
  ],
};
