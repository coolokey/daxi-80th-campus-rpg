import type { MapDefinition } from '../../types/rpg';

/**
 * 校門口民權東路椰林大道 (Royal Palm Boulevard)
 * 寬 800，高 1600 的壯麗長廊，兩側佇立高聳大王椰子樹、筆直柏油道路、透視向北延伸通往大溪國中宏偉正校門
 */
export const PALM_BOULEVARD_MAP: MapDefinition = {
  id: 'palm-boulevard',
  name: '校門口椰林大道 (民權東路)',
  width: 800,
  height: 1600,
  defaultSpawn: { x: 400, y: 1450 }, // 從大道南端 (民權東路口) 出發
  locationPath: ['桃園市立大溪國中', '校門口椰林大道'],
  themeColor: '#16a34a',
  obstacles: [
    // 兩側邊界圍牆與綠籬
    { x: 0, y: 0, width: 120, height: 1600 }, // 左側農園綠籬/民宅
    { x: 680, y: 0, width: 120, height: 1600 }, // 右側花架/鐵絲圍籬
    { x: 0, y: 1570, width: 800, height: 30 }, // 南側終端邊界

    // 北端大溪國中校門兩側白色金色球體門柱碰撞體
    { x: 230, y: 100, width: 90, height: 140 }, // 左側校名門柱
    { x: 480, y: 100, width: 90, height: 140 }, // 右側校門警衛室門柱

    // 兩側大王椰子樹樹幹碰撞盒 (左側 6 棵，右側 6 棵)
    { x: 190, y: 260, width: 24, height: 24 },
    { x: 190, y: 460, width: 24, height: 24 },
    { x: 190, y: 680, width: 24, height: 24 },
    { x: 190, y: 900, width: 24, height: 24 },
    { x: 190, y: 1120, width: 24, height: 24 },
    { x: 190, y: 1340, width: 24, height: 24 },

    { x: 590, y: 260, width: 24, height: 24 },
    { x: 590, y: 460, width: 24, height: 24 },
    { x: 590, y: 680, width: 24, height: 24 },
    { x: 590, y: 900, width: 24, height: 24 },
    { x: 590, y: 1120, width: 24, height: 24 },
    { x: 590, y: 1340, width: 24, height: 24 },
  ],
  interactables: [
    // 北端校門穿透傳送門：通往大溪國中校園戶外中庭
    {
      id: 'portal-enter-campus',
      type: 'portal',
      name: '大溪國中正校門',
      doorPlate: '大溪國中正門 🏛️',
      x: 400,
      y: 90,
      width: 140,
      height: 35,
      interactionRadius: 75,
      promptText: '按 [E] 穿過校門進入大溪國中中庭廣場',
      targetMapId: 'campus-outdoor',
      targetSpawn: { x: 720, y: 940 },
    },
    // 大溪國中校名立碑與精神標語
    {
      id: 'object-gate-monument',
      type: 'object',
      name: '大溪國中正門立柱 (金球地標)',
      doorPlate: '市立大溪國民中學 🏫',
      x: 275,
      y: 200,
      width: 60,
      height: 40,
      interactionRadius: 65,
      promptText: '按 [E] 瞻仰大溪國中正門立柱與金球',
      npcData: {
        title: '大溪國中門面地標',
        dialogue: '【桃園市立大溪國民中學】\n巍峨的白色校門柱頂端矗立著璀璨的金色明珠，象徵「智仁勇」三育並重、光耀大溪！穿過椰林大道即能進入迎曦廣場。',
        portraitUrl: '/assets/scenes/daxi-main-gate.jpg',
      },
    },
    // 椰林大道警衛室守護員
    {
      id: 'npc-security',
      type: 'npc',
      name: '校門警衛伯伯',
      x: 540,
      y: 200,
      width: 32,
      height: 48,
      interactionRadius: 70,
      promptText: '按 [E] 與警衛伯伯交談',
      npcData: {
        title: '大溪國中守護者',
        dialogue: '早安！歡迎來到大溪國中！沿著這條美麗的大王椰子樹民權東路走進來，就是大溪國中 80 年來莘莘學子每日上學的必經之路！校慶期間校園特別開放參觀喔！',
        portraitUrl: '/assets/scenes/daxi-main-gate.jpg',
      },
    },
    // 椰林時光立牌彩蛋
    {
      id: 'object-palm-history',
      type: 'object',
      name: '民權東路椰林大道解說牌',
      doorPlate: '椰林傳奇 🌴',
      x: 220,
      y: 800,
      width: 40,
      height: 30,
      interactionRadius: 60,
      promptText: '✨【校景彩蛋】按 [E] 閱讀大王椰子樹傳奇',
      npcData: {
        title: '八十載風華・大王椰子樹',
        dialogue: '【民權東路大王椰子樹大道】\n高聳挺拔的大王椰子樹夾道迎賓，象徵溪中人頂天立地、積極向上的風骨！無數溪中校友的青春回憶，皆從這條綠意盎然的椰林大道開始！',
        portraitUrl: '/assets/scenes/palm-boulevard.png',
      },
    },
    // 大道能量晶片（民權東路段）
    {
      id: 'chip-palm-boulevard',
      type: 'collectible',
      name: '發光能源晶片（椰林大道中段）',
      x: 400,
      y: 850,
      width: 24,
      height: 24,
      interactionRadius: 50,
      promptText: '按 [E] 拾取發光能源晶片',
      collectibleData: {
        clue: '【椰林數學線索】等距排列是數列的基礎：12 棵椰子樹筆直對稱，左右對稱軸即為道路中央的雙黃線！',
      },
    },
  ],
};
