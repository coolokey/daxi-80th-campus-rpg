import type { MapDefinition } from '../../types/rpg';

/**
 * 學生活動中心・會考最終戰大殿堂 (building-activity)
 * 包含：大型體育集會場、司令台、萬人看台、會考最終戰大殿堂 The Grand Arena、大門通往校園中庭
 */
export const BUILDING_ACTIVITY_MAP: MapDefinition = {
  id: 'building-activity',
  name: '學生活動中心・會考大殿堂',
  width: 900,
  height: 600,
  defaultSpawn: { x: 450, y: 530 },
  locationPath: ['大溪國中', '學生活動中心', '會考大殿堂 The Grand Arena'],
  buildingId: 'building-activity',
  floorLevel: 1,
  themeColor: '#4f46e5',
  spawnPoints: {
    'spawn-from-campus': { x: 450, y: 530 },
  },
  obstacles: [
    // 體育館四面外牆
    { x: 0, y: 0, width: 30, height: 600 },
    { x: 870, y: 0, width: 30, height: 600 },
    { x: 0, y: 0, width: 900, height: 80 },
    { x: 0, y: 560, width: 380, height: 40 },
    { x: 520, y: 560, width: 380, height: 40 },

    // 司令台（主席台）台座
    { x: 350, y: 90, width: 200, height: 70 },

    // 東西兩側看台座席
    { x: 40, y: 150, width: 90, height: 350 },
    { x: 770, y: 150, width: 90, height: 350 },

    // 羽球／籃球場邊圍欄
    { x: 200, y: 460, width: 80, height: 20 },
    { x: 620, y: 460, width: 80, height: 20 },
  ],
  interactables: [
    // 出口回校園
    {
      id: 'door-activity-exit-to-campus',
      type: 'door',
      name: '活動中心大門 (通往校園中庭)',
      x: 450,
      y: 565,
      width: 70,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 走出活動中心回到校園中庭',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 230, y: 640 },
    },
    // 司令台誓師互動
    {
      id: 'arena-stage',
      type: 'object',
      name: '集會司令台',
      doorPlate: '司令講台 🎖',
      x: 450,
      y: 175,
      width: 60,
      height: 35,
      interactionRadius: 65,
      promptText: '按 [E] 檢視會考誓師大會排陣',
      challengeId: 'challenge-arena-stage',
      npcData: {
        title: '中央司令台',
        dialogue: '【誓師任務】全校師生動員陣列：矩陣排隊人數與廣播音響聲壓等比衰減計算！',
      },
    },
    // 看台幾何級數求和
    {
      id: 'arena-stands',
      type: 'object',
      name: '大型體育看台',
      doorPlate: '觀眾席看台 🏟',
      x: 100,
      y: 320,
      width: 50,
      height: 40,
      interactionRadius: 65,
      promptText: '按 [E] 探索體育看台座席數列',
      challengeId: 'challenge-arena-stands',
      npcData: {
        title: '大型體育看台',
        dialogue: '【看台任務】階梯式看台座席等差級數求和（Sn = n/2 * (2a + (n-1)d)）容納量！',
      },
    },
    // 會考最終戰大殿堂 The Grand Arena 核心台座
    {
      id: 'arena-core-podium',
      type: 'object',
      name: '會考最終戰大殿堂 (The Grand Arena)',
      doorPlate: '會考最終殿堂 🏆',
      x: 450,
      y: 330,
      width: 80,
      height: 60,
      interactionRadius: 85,
      promptText: '按 [E] 啟動國中教育會考終極 BOSS 殿堂試煉',
      challengeId: 'challenge-grand-arena',
      npcData: {
        title: '會考最終戰大殿堂・跨領域巔峰試煉',
        dialogue: '【最終試煉】勇者，恭喜你踏遍大溪國中各大教學樓！這裡匯聚七年級代數、八年級幾何、九年級二次函數與科技跨領域所有精華，準備好迎接國中會考頂尖 A++ 榮耀挑戰了嗎？',
      },
    },
  ],
};
