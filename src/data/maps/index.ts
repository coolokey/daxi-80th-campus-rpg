import { CAMPUS_MAP } from './campus';
import { PALM_BOULEVARD_MAP } from './palm-boulevard';
import { TECH_LAB_MAP, getTechLabMap } from './tech-lab';
import { BUILDING_TECH_2F_MAP } from './building-tech';
import {
  BUILDING_NEW_1F_MAP,
  BUILDING_NEW_2F_MAP,
  BUILDING_NEW_3F_MAP,
} from './building-new';
import {
  ROOM_MATH_CHALLENGE_MAP,
  getMathChallengeRoomMap,
} from './math-challenge-room';
import {
  BUILDING_ADMIN_1F_MAP,
  BUILDING_ADMIN_2F_MAP,
  BUILDING_ADMIN_3F_MAP,
} from './building-admin';
import {
  BUILDING_MULTI_1F_MAP,
  BUILDING_MULTI_2F_MAP,
} from './building-multi';
import {
  BUILDING_GRADE8_1F_MAP,
  BUILDING_GRADE8_2F_MAP,
  BUILDING_GRADE8_3F_MAP,
} from './building-grade8';
import {
  BUILDING_GRADE9_1F_MAP,
  BUILDING_GRADE9_2F_MAP,
  BUILDING_GRADE9_3F_MAP,
} from './building-grade9';
import {
  BUILDING_ART_1F_MAP,
  BUILDING_ART_2F_MAP,
} from './building-art';
import { BUILDING_ACTIVITY_MAP } from './building-activity';
import type { MapDefinition } from '../../types/rpg';

export const MAP_REGISTRY: Record<string, MapDefinition> = {
  // 校門口椰林大道
  'palm-boulevard': PALM_BOULEVARD_MAP,

  // 校園戶外地圖
  'campus-outdoor': CAMPUS_MAP,

  // 科技館 (1F 能源實驗室, 2F 理化創客館)
  'tech-lab-interior': TECH_LAB_MAP,
  'building-tech-2f': BUILDING_TECH_2F_MAP,

  // 新大樓 (七年級教學棟 1F~3F + 數學研究室)
  'building-new-1f': BUILDING_NEW_1F_MAP,
  'building-new-2f': BUILDING_NEW_2F_MAP,
  'building-new-3f': BUILDING_NEW_3F_MAP,
  'room-math-challenge': ROOM_MATH_CHALLENGE_MAP,

  // 行政大樓 (1F 導師與行政, 2F 行政核心處室, 3F 語言與研習中心)
  'building-admin-1f': BUILDING_ADMIN_1F_MAP,
  'building-admin-2f': BUILDING_ADMIN_2F_MAP,
  'building-admin-3f': BUILDING_ADMIN_3F_MAP,

  // 綜合大樓 (1F 校史與特教餐飲, 2F 圖書館與資訊中心)
  'building-multi-1f': BUILDING_MULTI_1F_MAP,
  'building-multi-2f': BUILDING_MULTI_2F_MAP,
  'building-complex-1f': BUILDING_MULTI_1F_MAP, // 兼容別名
  'building-complex-2f': BUILDING_MULTI_2F_MAP, // 兼容別名

  // 八年級教學棟 (1F 木藝幼兒, 2F 幾何代數, 3F 桌遊專科)
  'building-grade8-1f': BUILDING_GRADE8_1F_MAP,
  'building-grade8-2f': BUILDING_GRADE8_2F_MAP,
  'building-grade8-3f': BUILDING_GRADE8_3F_MAP,

  // 九年級教學棟 (1F 相似形, 2F 圓與三心, 3F 函數與會考衝刺)
  'building-grade9-1f': BUILDING_GRADE9_1F_MAP,
  'building-grade9-2f': BUILDING_GRADE9_2F_MAP,
  'building-grade9-3f': BUILDING_GRADE9_3F_MAP,

  // 藝術館 (1F 樂活體能, 2F 音樂與美學殿堂)
  'building-art-1f': BUILDING_ART_1F_MAP,
  'building-art-2f': BUILDING_ART_2F_MAP,

  // 學生活動中心 (會考最終戰大殿堂 The Grand Arena)
  'building-activity': BUILDING_ACTIVITY_MAP,
  'building-gym-1f': BUILDING_ACTIVITY_MAP, // 兼容別名
};

export function getMapById(
  id: string,
  options?: { isCoreCalibrated?: boolean; isMathChallengeCompleted?: boolean }
): MapDefinition {
  if (id === 'tech-lab-interior') {
    return getTechLabMap(options?.isCoreCalibrated ?? false);
  }
  if (id === 'room-math-challenge') {
    return getMathChallengeRoomMap(options?.isMathChallengeCompleted ?? false);
  }
  return MAP_REGISTRY[id] || CAMPUS_MAP;
}
