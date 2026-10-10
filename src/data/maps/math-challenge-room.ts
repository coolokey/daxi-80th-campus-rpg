import type { MapDefinition } from '../../types/rpg';

/**
 * 七年級數學研究室關卡地圖 (room-math-challenge)
 * 位於新大樓 3F，由數學領域召集人蔡之民老師主持
 * 包含：黑板、講台、中央全息幾何校準台、學生課桌組、出口大門
 */
export function getMathChallengeRoomMap(isCompleted: boolean = false): MapDefinition {
  return {
    id: 'room-math-challenge',
    name: '七年級數學研究室',
    width: 650,
    height: 480,
    defaultSpawn: { x: 325, y: 380 },
    locationPath: ['大溪國中', '新大樓 (七年級)', '3F', '數學研究室'],
    buildingId: 'building-new',
    floorLevel: 3,
    themeColor: '#0d47a1',
    obstacles: [
      // Perimeter boundaries
      { x: 0, y: 0, width: 25, height: 480 }, // Left wall
      { x: 625, y: 0, width: 25, height: 480 }, // Right wall
      { x: 0, y: 0, width: 650, height: 80 }, // Blackboard & Podium back wall
      { x: 0, y: 450, width: 280, height: 30 }, // Bottom wall left
      { x: 370, y: 450, width: 280, height: 30 }, // Bottom wall right

      // Teacher podium area
      { x: 260, y: 80, width: 130, height: 35 },

      // Student Desk Groups (with walking aisles)
      // Left desk cluster
      { x: 100, y: 170, width: 120, height: 50 },
      { x: 100, y: 270, width: 120, height: 50 },

      // Right desk cluster
      { x: 430, y: 170, width: 120, height: 50 },
      { x: 430, y: 270, width: 120, height: 50 },

      // Central Challenge Console collision footprint
      { x: 300, y: 215, width: 50, height: 45 },
    ],
    interactables: [
      // Exit door back to New Building 3F
      {
        id: 'door-exit-math-room',
        type: 'door',
        name: '研究室大門 (通往 3F 走廊)',
        x: 325,
        y: 450,
        width: 50,
        height: 25,
        interactionRadius: 55,
        promptText: '按 [E] 離開研究室回到新大樓 3F 走廊',
        targetMapId: 'building-new-3f',
        targetSpawn: { x: 620, y: 200 },
      },
      // Teacher NPC: 蔡之民老師
      {
        id: 'npc-cai-room',
        type: 'npc',
        name: '數字研究員 (蔡之民老師)',
        x: 325,
        y: 115,
        width: 32,
        height: 48,
        interactionRadius: 75,
        promptText: '按 [E] 與蔡老師交談',
        npcData: {
          title: '大溪國中數學領域召集人',
          dialogue: isCompleted
            ? '太棒了！你已經順利破解七年級數學研究室的數字核心難題！隨時可以在操作台重新進行自主演練（Practice Mode）。'
            : '歡迎來到新大樓三樓數學研究室！中央的「全息幾何校準台」出現了數值紊亂，正負數、指數與質因數需要你的精準運算來修正！走到操作台按 [E] 開始挑戰吧！',
          portraitUrl: '/assets/teachers/teacher-001-portrait.png',
        },
      },
      // Central Challenge Console
      {
        id: 'math-challenge-terminal',
        type: 'object',
        name: isCompleted ? '全息幾何校準台 (校準完成／練習模式)' : '全息幾何校準台 (數值紊亂)',
        x: 325,
        y: 235,
        width: 44,
        height: 40,
        interactionRadius: 65,
        promptText: isCompleted ? '◈ 按 [E] 啟動自主演練模式 (Practice)' : '◈ 按 [E] 啟動七年級數學校準挑戰 (Challenge)',
        challengeId: 'challenge-g7-math',
      },
    ],
  };
}

export const ROOM_MATH_CHALLENGE_MAP = getMathChallengeRoomMap(false);
