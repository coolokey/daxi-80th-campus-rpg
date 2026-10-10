import type { MapDefinition } from '../../types/rpg';

export const CAMPUS_MAP: MapDefinition = {
  id: 'campus-outdoor',
  name: '大溪國中未來科技校園',
  width: 1525,
  height: 1031,
  defaultSpawn: { x: 720, y: 860 },
  locationPath: ['桃園市立大溪國中', '校園戶外中庭'],
  bgImage: '/assets/maps/daxi-future-campus-rpg-v1.png',
  themeColor: '#0b7fab',
  obstacles: [
    // Outer perimeter boundaries
    { x: 0, y: 0, width: 30, height: 1031 }, // Left wall
    { x: 1495, y: 0, width: 30, height: 1031 }, // Right wall
    { x: 0, y: 0, width: 1525, height: 30 }, // Top wall
    { x: 0, y: 1000, width: 620, height: 31 }, // Bottom wall left
    { x: 820, y: 1000, width: 705, height: 31 }, // Bottom wall right

    // Central classroom complex (迎曦樓 / 勤學樓 / 行政大樓)
    { x: 570, y: 180, width: 300, height: 240 },

    // 科技館 (Technology Building main body)
    // Left of door: x 1100 to 1200
    { x: 1100, y: 220, width: 100, height: 280 },
    // Right of door: x 1240 to 1440
    { x: 1240, y: 220, width: 200, height: 280 },
    // Roof above door: y 220 to 480
    { x: 1200, y: 220, width: 40, height: 260 },

    // 圖書館 / 綜合大樓 (Library & Complex)
    { x: 1040, y: 50, width: 320, height: 140 },

    // 活動中心 (Gymnasium on South-West)
    { x: 60, y: 620, width: 350, height: 280 },

    // 操場跑道看台與司令台
    { x: 160, y: 160, width: 340, height: 40 },

    // 大溪國中 80 週年時光石碑基座碰撞盒
    { x: 720 - 24, y: 700 - 20, width: 48, height: 40 },

    // NPC Teacher collision footprint
    { x: 1220 - 16, y: 560 - 10, width: 32, height: 24 },
  ],
  interactables: [
    {
      id: 'npc-cai',
      type: 'npc',
      name: '數字研究員 (蔡老師)',
      x: 1220,
      y: 560,
      width: 32,
      height: 48,
      interactionRadius: 80,
      promptText: '按 [E] 與數字研究員交談',
      npcData: {
        title: '大溪國中數學領域召集人',
        dialogue: '同學你好！校園科技館的「未來能源核心」出現數值異常！請進入科技館實驗室，或直接在此進行五道數學校準任務，一起穩定核心！',
        portraitUrl: '/assets/characters/digital-researcher-v1.png',
      },
    },
    // 科技館大門
    {
      id: 'door-tech-lab',
      type: 'door',
      name: '科技館入口大門',
      doorPlate: '科技館 ◈',
      x: 1220,
      y: 490,
      width: 40,
      height: 25,
      interactionRadius: 60,
      promptText: '按 [E] 進入科技館實驗室',
      targetMapId: 'tech-lab-interior',
      targetSpawn: { x: 400, y: 450 },
    },
    // 新大樓 (七年級大樓)
    {
      id: 'door-new-building',
      type: 'door',
      name: '新大樓大門 (七年級教學大樓)',
      doorPlate: '新大樓 (七年級) ◈',
      x: 1220,
      y: 180,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入新大樓 (七年級教學大樓)',
      targetMapId: 'building-new-1f',
      targetSpawn: { x: 400, y: 440 },
    },
    // 行政大樓正門
    {
      id: 'door-admin',
      type: 'door',
      name: '行政大樓入口大門',
      doorPlate: '行政大樓 ◈',
      x: 720,
      y: 350,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入行政大樓處室大廳',
      targetMapId: 'building-admin-1f',
      targetSpawn: { x: 400, y: 440 },
    },
    // 綜合大樓 (圖書館)
    {
      id: 'door-multi',
      type: 'door',
      name: '綜合大樓入口大門 (圖書館)',
      doorPlate: '綜合大樓 (圖書館) ◈',
      x: 1080,
      y: 190,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入綜合大樓 (圖書館與資訊中心)',
      targetMapId: 'building-multi-1f',
      targetSpawn: { x: 400, y: 440 },
    },
    // 八年級棟
    {
      id: 'door-grade8',
      type: 'door',
      name: '八年級棟入口大門',
      doorPlate: '八年級棟 ◈',
      x: 650,
      y: 420,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入八年級教學大樓',
      targetMapId: 'building-grade8-1f',
      targetSpawn: { x: 400, y: 440 },
    },
    // 九年級棟
    {
      id: 'door-grade9',
      type: 'door',
      name: '九年級棟入口大門',
      doorPlate: '九年級棟 ◈',
      x: 650,
      y: 200,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入九年級教學大樓',
      targetMapId: 'building-grade9-1f',
      targetSpawn: { x: 400, y: 440 },
    },
    // 人文藝術館
    {
      id: 'door-art',
      type: 'door',
      name: '藝術館入口大門',
      doorPlate: '藝術館 ◈',
      x: 1380,
      y: 380,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入藝術館',
      targetMapId: 'building-art-1f',
      targetSpawn: { x: 400, y: 440 },
    },
    // 活動中心 (體育館)
    {
      id: 'door-activity',
      type: 'door',
      name: '活動中心入口大門',
      doorPlate: '活動中心 ◈',
      x: 380,
      y: 640,
      width: 45,
      height: 25,
      interactionRadius: 65,
      promptText: '按 [E] 進入學生活動中心 (會考最終大殿堂)',
      targetMapId: 'building-activity',
      targetSpawn: { x: 450, y: 530 },
    },
    // 合作社心算彩蛋
    {
      id: 'coop-change-easter-egg',
      type: 'object',
      name: '校園合作社 (找零心算彩蛋)',
      doorPlate: '員生消費合作社 🛒',
      x: 720,
      y: 640,
      width: 50,
      height: 35,
      interactionRadius: 60,
      promptText: '✨【趣味彩蛋】按 [E] 挑戰合作社找零心算速算！',
      challengeId: 'easter-egg-coop-change',
      npcData: {
        title: '員生合作社阿姨',
        dialogue: '同學買文具和麵包總共 137 元，你付了 500 元，心算一下應該找多少錢呢？挑戰速算解鎖「心算達人」成就！',
      },
    },
    // 發光能源晶片
    {
      id: 'chip-welcome-gate',
      type: 'collectible',
      name: '發光能源晶片（校門迎賓道）',
      x: 720,
      y: 780,
      width: 24,
      height: 24,
      interactionRadius: 48,
      promptText: '按 [E] 拾取發光能源晶片',
      collectibleData: {
        clue: '【數學線索 1】以原點 0 為界，向右為正數、向左為負數；地下為負數、地上為正數。',
      },
    },
    // 大溪國中 80 週年時光紀念石碑 (慶祝校慶核心彩蛋)
    {
      id: 'monument-daxi-80th',
      type: 'object',
      name: '大溪國中 80 週年時光紀念碑',
      doorPlate: '溪中 80 週年紀念 🏛️',
      x: 720,
      y: 700,
      width: 48,
      height: 48,
      interactionRadius: 68,
      promptText: '✨【80週年校慶】按 [E] 探索時光紀念碑與校史問答',
      challengeId: 'challenge-daxi-80th',
      npcData: {
        title: '大溪國中八十載時光石碑 (1946-2026)',
        dialogue: '【大溪國中創校八十週年紀念】\n「甲子又廿，作育英才；大溪風華，源遠流長。」\n大溪國中自民國 35 年建校以來，歷經無數師生辛勤耕耘，迎來光輝 80 歲生日！點擊挑戰校史問答，解鎖「80週年榮譽校友」紀念勳章！',
      },
    },
    {
      id: 'chip-library',
      type: 'collectible',
      name: '發光能源晶片（圖書館前）',
      x: 980,
      y: 130,
      width: 24,
      height: 24,
      interactionRadius: 48,
      promptText: '按 [E] 拾取發光能源晶片',
      collectibleData: {
        clue: '【數學線索 2】次方代表連乘，同底數相乘時指數相加；任何非零數的 0 次方均為 1。',
      },
    },
    {
      id: 'chip-building',
      type: 'collectible',
      name: '發光能源晶片（迎曦樓前）',
      x: 720,
      y: 460,
      width: 24,
      height: 24,
      interactionRadius: 48,
      promptText: '按 [E] 拾取發光能源晶片',
      collectibleData: {
        clue: '【數學線索 3】能整除被除數的數為因數；質數大於 1 且只有 1 和自己兩個因數。',
      },
    },
  ],
};
