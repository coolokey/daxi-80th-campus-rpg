import type { Rect, WorldNPC } from '../types/game';

export const MAP_WIDTH = 1525;
export const MAP_HEIGHT = 1031;

export const PLAYER_START = {
  x: 720,
  y: 860,
  width: 32,
  height: 48,
  speed: 210, // pixels per second
};

export const TEACHER_NPC: WorldNPC = {
  id: 'teacher-001',
  name: '數字研究員',
  title: '大溪國中數學教師',
  x: 1220,
  y: 560,
  width: 36,
  height: 48,
  direction: 'down',
  dialogue: '同學你好！大溪校園的未來能源核心數值發生了偏差。請接受五道數學校準任務，一起修復核心吧！',
};

export const LANDMARKS = [
  { id: 'gate', name: '大溪國中正門', x: 720, y: 920 },
  { id: 'boulevard', name: '迎賓林蔭步道', x: 720, y: 700 },
  { id: 'tech-center', name: '科技館 (任務目標)', x: 1220, y: 560, hasNPC: true },
  { id: 'library', name: '圖書館', x: 1180, y: 150 },
  { id: 'yingxi-building', name: '迎曦樓', x: 720, y: 320 },
  { id: 'gym', name: '活動中心', x: 250, y: 750 },
  { id: 'track', name: '綜合運動場', x: 340, y: 360 },
];

/**
 * Solid physical obstacles that the player character cannot pass through.
 * Bounded boxes for campus perimeter, buildings, and structures.
 */
export const CAMPUS_OBSTACLES: Rect[] = [
  // Outer perimeter boundaries
  { x: 0, y: 0, width: 30, height: MAP_HEIGHT }, // Left wall
  { x: MAP_WIDTH - 30, y: 0, width: 30, height: MAP_HEIGHT }, // Right wall
  { x: 0, y: 0, width: MAP_WIDTH, height: 30 }, // Top wall
  { x: 0, y: MAP_HEIGHT - 30, width: 600, height: 30 }, // Bottom wall left
  { x: 840, y: MAP_HEIGHT - 30, width: MAP_WIDTH - 840, height: 30 }, // Bottom wall right

  // Central classroom complex (迎曦樓 / 勤學樓)
  { x: 570, y: 180, width: 300, height: 240 },

  // 科技館 (Technology Building)
  { x: 1100, y: 220, width: 340, height: 280 },

  // 圖書館 (Library)
  { x: 1040, y: 50, width: 320, height: 140 },

  // 活動中心 (Gymnasium on South-West)
  { x: 60, y: 620, width: 350, height: 280 },

  // 操場邊界看台與司令台
  { x: 160, y: 160, width: 340, height: 40 },

  // NPC Teacher physical collision box (cannot walk through the teacher)
  { x: TEACHER_NPC.x - 16, y: TEACHER_NPC.y - 10, width: 32, height: 24 },
];
