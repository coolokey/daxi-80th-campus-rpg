/**
 * 五層式校園 RPG 世界架構資料模型 (Campus -> Building -> Floor -> Room -> Challenge)
 * 遵循規格書 Rule 74～115 規範
 */

export interface WorldChallenge {
  id: string;
  title: string;
  grade: 7 | 8 | 9 | number | string;
  subject: 'math' | 'science' | 'tech' | 'interdisciplinary' | 'general';
  description: string;
  concepts: string[];
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';
  bossNpcId?: string;
  isEasterEgg?: boolean;
}

export interface WorldRoom {
  id: string;
  displayName: string;
  doorPlate: string;
  buildingId: string;
  floorLevel: number;
  doorPosition: { x: number; y: number };
  destinationMapId?: string;
  challengeId?: string;
  description?: string;
}

export interface WorldStairs {
  id: string;
  name: string;
  fromMap: string;
  toMap: string;
  direction: 'up' | 'down';
  position: { x: number; y: number };
  targetSpawnId: string;
}

export interface WorldFloor {
  id: string;
  buildingId: string;
  floorLevel: number;
  displayName: string;
  mapId: string;
  rooms: WorldRoom[];
  stairs: WorldStairs[];
  spawnPoints: Record<string, { x: number; y: number }>;
}

export interface WorldBuilding {
  id: string;
  name: string;
  code: string;
  description: string;
  campusPosition: { x: number; y: number };
  floors: WorldFloor[];
}

export interface CampusWorldStructure {
  id: string;
  name: string;
  outdoorMapId: string;
  buildings: WorldBuilding[];
}

/**
 * 大溪國中真實校園 RPG 世界定義（八大建築全體多樓層完整架構）
 */
export const DAXI_CAMPUS_WORLD: CampusWorldStructure = {
  id: 'daxi-campus-world',
  name: '桃園市立大溪國中未來科技校園',
  outdoorMapId: 'campus-outdoor',
  buildings: [
    // 1. 新大樓 (七年級大樓)
    {
      id: 'building-new',
      name: '新大樓 (七年級大樓)',
      code: 'NEW',
      description: '大溪國中七年級主要教學與探索大樓，擁有穿堂廣場、701~709 教室與數學研究室。',
      campusPosition: { x: 1220, y: 180 },
      floors: [
        {
          id: 'floor-new-1f',
          buildingId: 'building-new',
          floorLevel: 1,
          displayName: '新大樓 1F 穿堂廣場',
          mapId: 'building-new-1f',
          stairs: [
            {
              id: 'stair-new-1f-up',
              name: '東側樓梯 (往 2F)',
              fromMap: 'building-new-1f',
              toMap: 'building-new-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-701',
              displayName: '701 教室',
              doorPlate: '701',
              buildingId: 'building-new',
              floorLevel: 1,
              doorPosition: { x: 240, y: 130 },
              challengeId: 'challenge-g7-01',
              description: '數與數線探索室：正負數與絕對值。',
            },
            {
              id: 'room-preschool-easter',
              displayName: '非營利幼兒園',
              doorPlate: '非營利幼兒園 ✦',
              buildingId: 'building-new',
              floorLevel: 1,
              doorPosition: { x: 380, y: 130 },
              challengeId: 'easter-egg-kindergarten-multiplication',
              description: '懷舊彩蛋：國小九九乘法表速問挑戰。',
            },
            {
              id: 'room-709',
              displayName: '709 體育班教室',
              doorPlate: '709 體育班',
              buildingId: 'building-new',
              floorLevel: 1,
              doorPosition: { x: 520, y: 130 },
              challengeId: 'challenge-g7-09',
              description: '體育數據與整數比值。',
            },
            {
              id: 'room-new-teachers-office',
              displayName: '七年級導師室',
              doorPlate: '七年級導師室',
              buildingId: 'building-new',
              floorLevel: 1,
              doorPosition: { x: 140, y: 130 },
              challengeId: 'challenge-g7-office',
              description: '班級經營與數學教學籌備。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 440 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-new-2f',
          buildingId: 'building-new',
          floorLevel: 2,
          displayName: '新大樓 2F 走廊',
          mapId: 'building-new-2f',
          stairs: [
            {
              id: 'stair-new-2f-down',
              name: '東側樓梯 (往 1F)',
              fromMap: 'building-new-2f',
              toMap: 'building-new-1f',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
            {
              id: 'stair-new-2f-up',
              name: '西側樓梯 (往 3F)',
              fromMap: 'building-new-2f',
              toMap: 'building-new-3f',
              direction: 'up',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-702',
              displayName: '702 教室',
              doorPlate: '702',
              buildingId: 'building-new',
              floorLevel: 2,
              doorPosition: { x: 260, y: 130 },
              challengeId: 'challenge-g7-02',
              description: '正負數四則混合運算。',
            },
            {
              id: 'room-703',
              displayName: '703 教室',
              doorPlate: '703',
              buildingId: 'building-new',
              floorLevel: 2,
              doorPosition: { x: 420, y: 130 },
              challengeId: 'challenge-g7-03',
              description: '指數記法與科學記號。',
            },
            {
              id: 'room-pta',
              displayName: '家長會辦公室',
              doorPlate: '家長會辦公室 🤝',
              buildingId: 'building-new',
              floorLevel: 2,
              doorPosition: { x: 580, y: 130 },
              challengeId: 'challenge-g7-pta',
              description: '家長會校務發展與經費統計。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
            'spawn-stair-down': { x: 130, y: 240 },
          },
        },
        {
          id: 'floor-new-3f',
          buildingId: 'building-new',
          floorLevel: 3,
          displayName: '新大樓 3F 走廊',
          mapId: 'building-new-3f',
          stairs: [
            {
              id: 'stair-new-3f-down',
              name: '西側樓梯 (往 2F)',
              fromMap: 'building-new-3f',
              toMap: 'building-new-2f',
              direction: 'down',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-706',
              displayName: '706 質數研究室',
              doorPlate: '706 質因數 ◈',
              buildingId: 'building-new',
              floorLevel: 3,
              doorPosition: { x: 200, y: 130 },
              challengeId: 'challenge-g7-06',
              description: '質數獵人特訓關卡：偽質數粉碎與質因數分解。',
            },
            {
              id: 'room-707',
              displayName: '707 教室',
              doorPlate: '707',
              buildingId: 'building-new',
              floorLevel: 3,
              doorPosition: { x: 340, y: 130 },
              challengeId: 'challenge-g7-07',
              description: '一元一次方程式移項法則。',
            },
            {
              id: 'room-union',
              displayName: '教師會辦公室',
              doorPlate: '教師會辦公室 📚',
              buildingId: 'building-new',
              floorLevel: 3,
              doorPosition: { x: 470, y: 130 },
              challengeId: 'challenge-g7-union',
              description: '七年級數學課程共備社群。',
            },
            {
              id: 'room-math-challenge',
              displayName: '七年級數學研究室',
              doorPlate: '數學研究室 ◈',
              buildingId: 'building-new',
              floorLevel: 3,
              doorPosition: { x: 620, y: 130 },
              destinationMapId: 'room-math-challenge',
              challengeId: 'challenge-g7-math',
              description: '蔡之民老師主持的七年級數學研究核心，包含正負數、指數與質因數校準關卡。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 130, y: 240 },
            'spawn-from-math-room': { x: 620, y: 200 },
          },
        },
      ],
    },

    // 2. 行政大樓
    {
      id: 'building-admin',
      name: '行政大樓',
      code: 'ADM',
      description: '大溪國中行政中樞，包含處室、導師室、健康中心、校長室與語言教室。',
      campusPosition: { x: 720, y: 350 },
      floors: [
        {
          id: 'floor-admin-1f',
          buildingId: 'building-admin',
          floorLevel: 1,
          displayName: '行政大樓 1F 導師與行政廣場',
          mapId: 'building-admin-1f',
          stairs: [
            {
              id: 'stair-admin-1f-up',
              name: '中央東側樓梯 (往 2F)',
              fromMap: 'building-admin-1f',
              toMap: 'building-admin-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-grade89-office',
              displayName: '八九年級導師室',
              doorPlate: '八九年級導師室',
              buildingId: 'building-admin',
              floorLevel: 1,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-admin-teachers',
              description: '跨年級常態分佈與評量數據統計分析。',
            },
            {
              id: 'room-health-center',
              displayName: '健康中心',
              doorPlate: '健康中心 ✙',
              buildingId: 'building-admin',
              floorLevel: 1,
              doorPosition: { x: 360, y: 130 },
              challengeId: 'easter-egg-health-addition',
              description: '健康心率與體能數值速算彩蛋。',
            },
            {
              id: 'room-counseling',
              displayName: '諮商室',
              doorPlate: '輔導諮商室',
              buildingId: 'building-admin',
              floorLevel: 1,
              doorPosition: { x: 540, y: 130 },
              challengeId: 'challenge-admin-counseling',
              description: '心理量表象限幾何分析。',
            },
            {
              id: 'room-admin-guide-academic',
              displayName: '教務處服務台',
              doorPlate: '教務處 ◈',
              buildingId: 'building-admin',
              floorLevel: 1,
              doorPosition: { x: 640, y: 130 },
              challengeId: 'challenge-admin-academic',
              description: '教務處課程諮詢與學分排程。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 440 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-admin-2f',
          buildingId: 'building-admin',
          floorLevel: 2,
          displayName: '行政大樓 2F 行政核心處室',
          mapId: 'building-admin-2f',
          stairs: [
            {
              id: 'stair-admin-2f-down',
              name: '中央東側樓梯 (往 1F)',
              fromMap: 'building-admin-2f',
              toMap: 'building-admin-1f',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
            {
              id: 'stair-admin-2f-up',
              name: '西側樓梯 (往 3F)',
              fromMap: 'building-admin-2f',
              toMap: 'building-admin-3f',
              direction: 'up',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-academic',
              displayName: '教務處',
              doorPlate: '教務處',
              buildingId: 'building-admin',
              floorLevel: 2,
              doorPosition: { x: 200, y: 130 },
              challengeId: 'challenge-admin-academic',
              description: '最佳排課圖論與學分矩陣運算。',
            },
            {
              id: 'room-principal',
              displayName: '校長室',
              doorPlate: '校長室 ★',
              buildingId: 'building-admin',
              floorLevel: 2,
              doorPosition: { x: 320, y: 130 },
              challengeId: 'challenge-admin-principal',
              description: '大溪智慧校園全方位願景規劃。',
            },
            {
              id: 'room-general',
              displayName: '總務處',
              doorPlate: '總務處',
              buildingId: 'building-admin',
              floorLevel: 2,
              doorPosition: { x: 440, y: 130 },
              challengeId: 'challenge-admin-general',
              description: '校舍修繕面積與採購工程預算。',
            },
            {
              id: 'room-hr',
              displayName: '人事室',
              doorPlate: '人事室',
              buildingId: 'building-admin',
              floorLevel: 2,
              doorPosition: { x: 540, y: 130 },
              challengeId: 'challenge-admin-hr',
              description: '教職員年資與進修階梯函數。',
            },
            {
              id: 'room-accounting',
              displayName: '會計室',
              doorPlate: '會計室',
              buildingId: 'building-admin',
              floorLevel: 2,
              doorPosition: { x: 630, y: 130 },
              challengeId: 'challenge-admin-accounting',
              description: '會計收支平衡與借貸心算考驗。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
            'spawn-stair-down': { x: 130, y: 240 },
          },
        },
        {
          id: 'floor-admin-3f',
          buildingId: 'building-admin',
          floorLevel: 3,
          displayName: '行政大樓 3F 語言與研習中心',
          mapId: 'building-admin-3f',
          stairs: [
            {
              id: 'stair-admin-3f-down',
              name: '西側樓梯 (往 2F)',
              fromMap: 'building-admin-3f',
              toMap: 'building-admin-2f',
              direction: 'down',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-language-lab',
              displayName: '語言教室',
              doorPlate: '語言教室 ♫',
              buildingId: 'building-admin',
              floorLevel: 3,
              doorPosition: { x: 320, y: 130 },
              challengeId: 'challenge-admin-lang',
              description: '李昱瑩老師駐點：跨國雙語科技導航。',
            },
            {
              id: 'room-faculty-office',
              displayName: '專任辦公室',
              doorPlate: '專任教師辦公室',
              buildingId: 'building-admin',
              floorLevel: 3,
              doorPosition: { x: 480, y: 130 },
              challengeId: 'challenge-admin-faculty',
              description: '跨領域素養命題設計。',
            },
            {
              id: 'room-seminar-center',
              displayName: '研習中心',
              doorPlate: '教師研習中心',
              buildingId: 'building-admin',
              floorLevel: 3,
              doorPosition: { x: 640, y: 130 },
              challengeId: 'challenge-admin-seminar',
              description: '智慧教學大數據統計分析。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 130, y: 240 },
          },
        },
      ],
    },

    // 3. 科技館
    {
      id: 'building-tech',
      name: '科技館',
      code: 'TECH',
      description: '大溪國中自造者中心與能源實驗核心，包含生科實驗室、中央能源核心、理化實驗室與數位工程台。',
      campusPosition: { x: 1220, y: 490 },
      floors: [
        {
          id: 'floor-tech-1f',
          buildingId: 'building-tech',
          floorLevel: 1,
          displayName: '科技館 1F 能源核心實驗室',
          mapId: 'tech-lab-interior',
          stairs: [
            {
              id: 'stair-tech-1f-up',
              name: '科技館東側樓梯 (往 2F 理化創客館)',
              fromMap: 'tech-lab-interior',
              toMap: 'building-tech-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-tech-core',
              displayName: '中央能源核心',
              doorPlate: '能源核心控制台 ⚡',
              buildingId: 'building-tech',
              floorLevel: 1,
              doorPosition: { x: 400, y: 290 },
              challengeId: 'challenge-g7-math',
              description: '大溪國中核心數學校準中樞。',
            },
            {
              id: 'room-tech-av',
              displayName: '視聽教室',
              doorPlate: '視聽教室',
              buildingId: 'building-tech',
              floorLevel: 1,
              doorPosition: { x: 160, y: 80 },
              challengeId: 'challenge-tech-av',
              description: '多媒體音訊採樣與數位訊號轉換。',
            },
            {
              id: 'room-tech-living-1',
              displayName: '生活科技第一教室',
              doorPlate: '生活科技一',
              buildingId: 'building-tech',
              floorLevel: 1,
              doorPosition: { x: 300, y: 80 },
              challengeId: 'challenge-tech-living-1',
              description: '齒輪機構傳動比與力矩平衡。',
            },
            {
              id: 'room-tech-living-2',
              displayName: '生活科技第二教室',
              doorPlate: '生活科技二',
              buildingId: 'building-tech',
              floorLevel: 1,
              doorPosition: { x: 500, y: 80 },
              challengeId: 'challenge-tech-living-2',
              description: '3D 列印空間幾何切片建模。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 450 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-tech-2f',
          buildingId: 'building-tech',
          floorLevel: 2,
          displayName: '科技館 2F 理化創客館',
          mapId: 'building-tech-2f',
          stairs: [
            {
              id: 'stair-tech-2f-down',
              name: '科技館東側樓梯 (往 1F)',
              fromMap: 'building-tech-2f',
              toMap: 'tech-lab-interior',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-science-lab-1',
              displayName: '理化第一實驗室',
              doorPlate: '理化實驗室一 ⚛',
              buildingId: 'building-tech',
              floorLevel: 2,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-science-lab-1',
              description: '張致信老師駐點：元素莫耳數與化學平衡。',
            },
            {
              id: 'room-science-lab-2',
              displayName: '理化第二實驗室',
              doorPlate: '理化實驗室二',
              buildingId: 'building-tech',
              floorLevel: 2,
              doorPosition: { x: 340, y: 130 },
              challengeId: 'challenge-science-lab-2',
              description: '透鏡成像幾何光學與浮力計算。',
            },
            {
              id: 'room-tech-maker',
              displayName: '科技創作工坊',
              doorPlate: '科技創作工坊 ⚙',
              buildingId: 'building-tech',
              floorLevel: 2,
              doorPosition: { x: 500, y: 130 },
              challengeId: 'challenge-tech-maker',
              description: '智慧避障幾何演算法。',
            },
            {
              id: 'room-tech-digital',
              displayName: '數位工程台',
              doorPlate: '數位工程台 💻',
              buildingId: 'building-tech',
              floorLevel: 2,
              doorPosition: { x: 640, y: 130 },
              challengeId: 'challenge-tech-digital',
              description: '陳毅宏老師駐點：布林邏輯閘與二進位控制。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
          },
        },
      ],
    },

    // 4. 綜合大樓
    {
      id: 'building-multi',
      name: '綜合大樓',
      code: 'MUL',
      description: '大溪國中知識檢索與多元教育基地，包含校史室、餐飲教室、特教導師室、圖書館與資訊機房。',
      campusPosition: { x: 1080, y: 190 },
      floors: [
        {
          id: 'floor-multi-1f',
          buildingId: 'building-multi',
          floorLevel: 1,
          displayName: '綜合大樓 1F 校史與特教餐飲中心',
          mapId: 'building-multi-1f',
          stairs: [
            {
              id: 'stair-multi-1f-up',
              name: '綜合大樓東側樓梯 (往 2F 圖書館)',
              fromMap: 'building-multi-1f',
              toMap: 'building-multi-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-multi-history',
              displayName: '校史室',
              doorPlate: '校史室 🏛',
              buildingId: 'building-multi',
              floorLevel: 1,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-multi-history',
              description: '大溪一甲子校史年代紀年數線運算。',
            },
            {
              id: 'room-multi-cooking',
              displayName: '餐飲教室',
              doorPlate: '餐飲教室 🍴',
              buildingId: 'building-multi',
              floorLevel: 1,
              doorPosition: { x: 360, y: 130 },
              challengeId: 'challenge-multi-cooking',
              description: '烘焙配方比與食材重量百分比濃度。',
            },
            {
              id: 'room-multi-special',
              displayName: '特教導師室',
              doorPlate: '特教導師室 ☀',
              buildingId: 'building-multi',
              floorLevel: 1,
              doorPosition: { x: 540, y: 130 },
              challengeId: 'challenge-multi-special',
              description: '個別化學習適性評量矩陣。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 440 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-multi-2f',
          buildingId: 'building-multi',
          floorLevel: 2,
          displayName: '綜合大樓 2F 圖書館與資訊中心',
          mapId: 'building-multi-2f',
          stairs: [
            {
              id: 'stair-multi-2f-down',
              name: '綜合大樓東側樓梯 (往 1F)',
              fromMap: 'building-multi-2f',
              toMap: 'building-multi-1f',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-multi-library',
              displayName: '圖書館-知識檢索空間',
              doorPlate: '圖書館 📚',
              buildingId: 'building-multi',
              floorLevel: 2,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-multi-library',
              description: '杜威十進位分類與二元搜尋法知識檢索。',
            },
            {
              id: 'room-multi-computer',
              displayName: '大電腦教室',
              doorPlate: '大電腦教室 🖥',
              buildingId: 'building-multi',
              floorLevel: 2,
              doorPosition: { x: 400, y: 130 },
              challengeId: 'challenge-multi-computer',
              description: '巨量資料快速排序與時間複雜度分析。',
            },
            {
              id: 'room-multi-server',
              displayName: '資訊機房',
              doorPlate: '資訊網路機房 🖧',
              buildingId: 'building-multi',
              floorLevel: 2,
              doorPosition: { x: 580, y: 130 },
              challengeId: 'challenge-multi-server',
              description: '二進位 IP 子網遮罩計算與封包路徑拓撲。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
          },
        },
      ],
    },

    // 5. 八年級教學棟
    {
      id: 'building-grade8',
      name: '八年級教學棟',
      code: 'G8',
      description: '大溪國中八年級教學大樓，擁有 801~809 教室、木藝教室、幼兒園、桌遊專科與幾何教室。',
      campusPosition: { x: 650, y: 420 },
      floors: [
        {
          id: 'floor-grade8-1f',
          buildingId: 'building-grade8',
          floorLevel: 1,
          displayName: '八年級教學棟 1F 木藝與幼兒天地',
          mapId: 'building-grade8-1f',
          stairs: [
            {
              id: 'stair-g8-1f-up',
              name: '八年級東側樓梯 (往 2F)',
              fromMap: 'building-grade8-1f',
              toMap: 'building-grade8-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-804',
              displayName: '804 教室',
              doorPlate: '804',
              buildingId: 'building-grade8',
              floorLevel: 1,
              doorPosition: { x: 160, y: 130 },
              challengeId: 'challenge-g8-04',
              description: '乘法公式與差平方展開。',
            },
            {
              id: 'room-809',
              displayName: '809 體育班教室',
              doorPlate: '809 體育班',
              buildingId: 'building-grade8',
              floorLevel: 1,
              doorPosition: { x: 300, y: 130 },
              challengeId: 'challenge-g8-09',
              description: '運動拋物線頂點坐標運算。',
            },
            {
              id: 'room-woodcraft',
              displayName: '木藝教室',
              doorPlate: '大溪木藝教室 🪵',
              buildingId: 'building-grade8',
              floorLevel: 1,
              doorPosition: { x: 460, y: 130 },
              challengeId: 'challenge-g8-woodcraft',
              description: '大溪傳統木藝榫卯直角與公差幾何。',
            },
            {
              id: 'room-kindergarten',
              displayName: '非營利幼兒園',
              doorPlate: '附設幼兒園 🎈',
              buildingId: 'building-grade8',
              floorLevel: 1,
              doorPosition: { x: 620, y: 130 },
              challengeId: 'easter-egg-kindergarten-multiplication',
              description: '國小九九乘法表與湊十法速算懷舊彩蛋。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 440 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-grade8-2f',
          buildingId: 'building-grade8',
          floorLevel: 2,
          displayName: '八年級教學棟 2F 幾何與代數探索區',
          mapId: 'building-grade8-2f',
          stairs: [
            {
              id: 'stair-g8-2f-down',
              name: '八年級東側樓梯 (往 1F)',
              fromMap: 'building-grade8-2f',
              toMap: 'building-grade8-1f',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
            {
              id: 'stair-g8-2f-up',
              name: '八年級西側樓梯 (往 3F)',
              fromMap: 'building-grade8-2f',
              toMap: 'building-grade8-3f',
              direction: 'up',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-801',
              displayName: '801 教室',
              doorPlate: '801',
              buildingId: 'building-grade8',
              floorLevel: 2,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-g8-01',
              description: '平方根與最簡根式化簡。',
            },
            {
              id: 'room-802',
              displayName: '802 教室',
              doorPlate: '802',
              buildingId: 'building-grade8',
              floorLevel: 2,
              doorPosition: { x: 270, y: 130 },
              challengeId: 'challenge-g8-02',
              description: '畢氏定理直角三角形證明。',
            },
            {
              id: 'room-803',
              displayName: '803 教室',
              doorPlate: '803',
              buildingId: 'building-grade8',
              floorLevel: 2,
              doorPosition: { x: 360, y: 130 },
              challengeId: 'challenge-g8-03',
              description: '多項式四則運算與長除法。',
            },
            {
              id: 'room-807',
              displayName: '807 教室',
              doorPlate: '807',
              buildingId: 'building-grade8',
              floorLevel: 2,
              doorPosition: { x: 450, y: 130 },
              challengeId: 'challenge-g8-07',
              description: '二次多項式十字交乘因式分解。',
            },
            {
              id: 'room-805',
              displayName: '805 教室',
              doorPlate: '805',
              buildingId: 'building-grade8',
              floorLevel: 2,
              doorPosition: { x: 540, y: 130 },
              challengeId: 'challenge-g8-05',
              description: '一元二次方程式公式解與配方法。',
            },
            {
              id: 'room-g8-geometry',
              displayName: '八年級數學幾何教室',
              doorPlate: '數學幾何教室 △',
              buildingId: 'building-grade8',
              floorLevel: 2,
              doorPosition: { x: 630, y: 130 },
              challengeId: 'challenge-g8-geometry',
              description: '三角形全等性質尺規作圖。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
            'spawn-stair-down': { x: 130, y: 240 },
          },
        },
        {
          id: 'floor-grade8-3f',
          buildingId: 'building-grade8',
          floorLevel: 3,
          displayName: '八年級教學棟 3F 桌遊與跨領域專科',
          mapId: 'building-grade8-3f',
          stairs: [
            {
              id: 'stair-g8-3f-down',
              name: '八年級西側樓梯 (往 2F)',
              fromMap: 'building-grade8-3f',
              toMap: 'building-grade8-2f',
              direction: 'down',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-806',
              displayName: '806 教室',
              doorPlate: '806',
              buildingId: 'building-grade8',
              floorLevel: 3,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-g8-06',
              description: '平行線截角性質推導。',
            },
            {
              id: 'room-808',
              displayName: '808 教室',
              doorPlate: '808',
              buildingId: 'building-grade8',
              floorLevel: 3,
              doorPosition: { x: 290, y: 130 },
              challengeId: 'challenge-g8-08',
              description: '四邊形性質與幾何證明。',
            },
            {
              id: 'room-boardgame',
              displayName: '桌遊教室',
              doorPlate: '桌遊思考教室 🎲',
              buildingId: 'building-grade8',
              floorLevel: 3,
              doorPosition: { x: 420, y: 130 },
              challengeId: 'easter-egg-boardgame-math',
              description: '桌遊數學邏輯與機率推理益智彩蛋。',
            },
            {
              id: 'room-native',
              displayName: '本土語教室',
              doorPlate: '本土語文教室',
              buildingId: 'building-grade8',
              floorLevel: 3,
              doorPosition: { x: 540, y: 130 },
              challengeId: 'challenge-g8-native',
              description: '大漢溪老街地景距離測繪。',
            },
            {
              id: 'room-arts',
              displayName: '表演藝術教室',
              doorPlate: '表演藝術教室 🎭',
              buildingId: 'building-grade8',
              floorLevel: 3,
              doorPosition: { x: 650, y: 130 },
              challengeId: 'challenge-g8-arts',
              description: '劇場舞台燈光角度與聲波共振。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 130, y: 240 },
          },
        },
      ],
    },

    // 6. 九年級教學棟
    {
      id: 'building-grade9',
      name: '九年級教學棟',
      code: 'G9',
      description: '大溪國中九年級教學大樓，擁有 901~908 教室、社團教室與會考代數衝刺教室。',
      campusPosition: { x: 650, y: 200 },
      floors: [
        {
          id: 'floor-grade9-1f',
          buildingId: 'building-grade9',
          floorLevel: 1,
          displayName: '九年級教學棟 1F 相似形探索區',
          mapId: 'building-grade9-1f',
          stairs: [
            {
              id: 'stair-g9-1f-up',
              name: '九年級東側樓梯 (往 2F)',
              fromMap: 'building-grade9-1f',
              toMap: 'building-grade9-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-906',
              displayName: '906 教室',
              doorPlate: '906',
              buildingId: 'building-grade9',
              floorLevel: 1,
              doorPosition: { x: 200, y: 130 },
              challengeId: 'challenge-g9-06',
              description: '相似多邊形比例與平行線截比例線段。',
            },
            {
              id: 'room-907',
              displayName: '907 教室',
              doorPlate: '907',
              buildingId: 'building-grade9',
              floorLevel: 1,
              doorPosition: { x: 380, y: 130 },
              challengeId: 'challenge-g9-07',
              description: '圓心角、圓周角與弦切角幾何證明。',
            },
            {
              id: 'room-908',
              displayName: '908 教室',
              doorPlate: '908',
              buildingId: 'building-grade9',
              floorLevel: 1,
              doorPosition: { x: 560, y: 130 },
              challengeId: 'challenge-g9-08',
              description: '銳角三角比（sin/cos/tan）與視角測量。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 440 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-grade9-2f',
          buildingId: 'building-grade9',
          floorLevel: 2,
          displayName: '九年級教學棟 2F 圓與幾何綜合區',
          mapId: 'building-grade9-2f',
          stairs: [
            {
              id: 'stair-g9-2f-down',
              name: '九年級東側樓梯 (往 1F)',
              fromMap: 'building-grade9-2f',
              toMap: 'building-grade9-1f',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
            {
              id: 'stair-g9-2f-up',
              name: '九年級西側樓梯 (往 3F)',
              fromMap: 'building-grade9-2f',
              toMap: 'building-grade9-3f',
              direction: 'up',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-904',
              displayName: '904 教室',
              doorPlate: '904',
              buildingId: 'building-grade9',
              floorLevel: 2,
              doorPosition: { x: 220, y: 130 },
              challengeId: 'challenge-g9-04',
              description: '點線圓與兩圓位置關係。',
            },
            {
              id: 'room-905',
              displayName: '905 教室',
              doorPlate: '905',
              buildingId: 'building-grade9',
              floorLevel: 2,
              doorPosition: { x: 400, y: 130 },
              challengeId: 'challenge-g9-05',
              description: '三角形三心（外心、內心、重心）坐標性質。',
            },
            {
              id: 'room-g9-clubs',
              displayName: '社團教室',
              doorPlate: '綜合社團教室 🌟',
              buildingId: 'building-grade9',
              floorLevel: 2,
              doorPosition: { x: 580, y: 130 },
              challengeId: 'challenge-g9-clubs',
              description: '跨領域專題數學統計模型。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
            'spawn-stair-down': { x: 130, y: 240 },
          },
        },
        {
          id: 'floor-grade9-3f',
          buildingId: 'building-grade9',
          floorLevel: 3,
          displayName: '九年級教學棟 3F 函數與會考決戰區',
          mapId: 'building-grade9-3f',
          stairs: [
            {
              id: 'stair-g9-3f-down',
              name: '九年級西側樓梯 (往 2F)',
              fromMap: 'building-grade9-3f',
              toMap: 'building-grade9-2f',
              direction: 'down',
              position: { x: 60, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-901',
              displayName: '901 教室',
              doorPlate: '901',
              buildingId: 'building-grade9',
              floorLevel: 3,
              doorPosition: { x: 180, y: 130 },
              challengeId: 'challenge-g9-01',
              description: '二次函數圖形平移與頂點極值。',
            },
            {
              id: 'room-902',
              displayName: '902 教室',
              doorPlate: '902',
              buildingId: 'building-grade9',
              floorLevel: 3,
              doorPosition: { x: 320, y: 130 },
              challengeId: 'challenge-g9-02',
              description: '統計圖表、四分位數與盒狀圖。',
            },
            {
              id: 'room-903',
              displayName: '903 教室',
              doorPlate: '903',
              buildingId: 'building-grade9',
              floorLevel: 3,
              doorPosition: { x: 460, y: 130 },
              challengeId: 'challenge-g9-03',
              description: '古典機率理論與樹狀圖分析。',
            },
            {
              id: 'room-g9-algebra',
              displayName: '九年級代數函數教室',
              doorPlate: '會考代數總複習室 ⚡',
              buildingId: 'building-grade9',
              floorLevel: 3,
              doorPosition: { x: 620, y: 130 },
              challengeId: 'challenge-g9-algebra',
              description: '國中會考數學跨單元決戰模擬衝刺。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 130, y: 240 },
          },
        },
      ],
    },

    // 7. 藝術館
    {
      id: 'building-art',
      name: '藝術館',
      code: 'ART',
      description: '大溪國中美感與體適能基地，包含樂活教室、音樂教室與 4F 美術通道。',
      campusPosition: { x: 1380, y: 380 },
      floors: [
        {
          id: 'floor-art-1f',
          buildingId: 'building-art',
          floorLevel: 1,
          displayName: '藝術館 1F 樂活體能教室',
          mapId: 'building-art-1f',
          stairs: [
            {
              id: 'stair-art-1f-up',
              name: '藝術館東側樓梯 (往 2F 音樂美學館)',
              fromMap: 'building-art-1f',
              toMap: 'building-art-2f',
              direction: 'up',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-down',
            },
          ],
          rooms: [
            {
              id: 'room-art-fitness',
              displayName: '樂活體能教室',
              doorPlate: '樂活體能教室 🏃',
              buildingId: 'building-art',
              floorLevel: 1,
              doorPosition: { x: 380, y: 130 },
              challengeId: 'challenge-art-fitness',
              description: 'BMR 基礎代謝率與運動心率消耗公式。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 400, y: 440 },
            'spawn-stair-down': { x: 670, y: 240 },
          },
        },
        {
          id: 'floor-art-2f',
          buildingId: 'building-art',
          floorLevel: 2,
          displayName: '藝術館 2F 音樂與美學殿堂',
          mapId: 'building-art-2f',
          stairs: [
            {
              id: 'stair-art-2f-down',
              name: '藝術館東側樓梯 (往 1F)',
              fromMap: 'building-art-2f',
              toMap: 'building-art-1f',
              direction: 'down',
              position: { x: 720, y: 240 },
              targetSpawnId: 'spawn-stair-up',
            },
          ],
          rooms: [
            {
              id: 'room-art-music',
              displayName: '音樂教室',
              doorPlate: '音樂教室 🎵',
              buildingId: 'building-art',
              floorLevel: 2,
              doorPosition: { x: 240, y: 130 },
              challengeId: 'challenge-art-music',
              description: '十二平均律音階頻率等比級數。',
            },
            {
              id: 'room-art-visual',
              displayName: '4F 美術教室通道',
              doorPlate: '4F 美術教室通道 🎨',
              buildingId: 'building-art',
              floorLevel: 2,
              doorPosition: { x: 520, y: 130 },
              challengeId: 'challenge-art-visual',
              description: '黃金比例構圖與透視投影消失點。',
            },
          ],
          spawnPoints: {
            'spawn-stair-up': { x: 670, y: 240 },
          },
        },
      ],
    },

    // 8. 學生活動中心
    {
      id: 'building-activity',
      name: '學生活動中心',
      code: 'ACT',
      description: '大溪國中大型集會與體育場館，亦為國中會考巔峰決戰 The Grand Arena 所在地。',
      campusPosition: { x: 380, y: 640 },
      floors: [
        {
          id: 'floor-activity-1f',
          buildingId: 'building-activity',
          floorLevel: 1,
          displayName: '學生活動中心・會考大殿堂',
          mapId: 'building-activity',
          stairs: [],
          rooms: [
            {
              id: 'room-arena-stage',
              displayName: '司令講台',
              doorPlate: '司令講台 🎖',
              buildingId: 'building-activity',
              floorLevel: 1,
              doorPosition: { x: 450, y: 175 },
              challengeId: 'challenge-arena-stage',
              description: '全校師生會考誓師動員矩陣。',
            },
            {
              id: 'room-arena-stands',
              displayName: '觀眾席看台',
              doorPlate: '觀眾席看台 🏟',
              buildingId: 'building-activity',
              floorLevel: 1,
              doorPosition: { x: 100, y: 320 },
              challengeId: 'challenge-arena-stands',
              description: '看台階梯數列求和與容納量計算。',
            },
            {
              id: 'room-grand-arena',
              displayName: '會考最終戰大殿堂',
              doorPlate: '會考最終殿堂 🏆',
              buildingId: 'building-activity',
              floorLevel: 1,
              doorPosition: { x: 450, y: 330 },
              challengeId: 'challenge-grand-arena',
              description: '全國國中教育會考跨領域總決戰 BOSS 殿堂試煉。',
            },
          ],
          spawnPoints: {
            'spawn-from-campus': { x: 450, y: 530 },
          },
        },
      ],
    },
  ],
};

/**
 * 麵包屑導航路徑產出器 (支援全校 8 棟大樓所有樓層與特殊空間)
 */
export function getLocationBreadcrumb(mapId: string): string[] {
  switch (mapId) {
    case 'campus-outdoor':
      return ['桃園市立大溪國中', '校園戶外中庭'];

    // 科技館
    case 'tech-lab-interior':
      return ['大溪國中', '科技館', '1F', '能源核心實驗室'];
    case 'building-tech-2f':
      return ['桃園市立大溪國中', '科技館', '2F 理化創客館'];

    // 新大樓 (七年級)
    case 'building-new-1f':
      return ['桃園市立大溪國中', '新大樓 (七年級)', '1F 穿堂廣場'];
    case 'building-new-2f':
      return ['桃園市立大溪國中', '新大樓 (七年級)', '2F 走廊'];
    case 'building-new-3f':
      return ['桃園市立大溪國中', '新大樓 (七年級)', '3F 走廊'];
    case 'room-math-challenge':
      return ['大溪國中', '新大樓 (七年級)', '3F', '數學研究室'];

    // 行政大樓
    case 'building-admin-1f':
      return ['桃園市立大溪國中', '行政大樓', '1F 導師與行政廣場'];
    case 'building-admin-2f':
      return ['桃園市立大溪國中', '行政大樓', '2F 行政核心處室'];
    case 'building-admin-3f':
      return ['桃園市立大溪國中', '行政大樓', '3F 語言與研習中心'];

    // 綜合大樓 (圖書館)
    case 'building-multi-1f':
      return ['桃園市立大溪國中', '綜合大樓', '1F 校史與特教餐飲中心'];
    case 'building-multi-2f':
      return ['桃園市立大溪國中', '綜合大樓', '2F 圖書館與資訊中心'];
    case 'building-complex-1f':
      return ['桃園市立大溪國中', '綜合大樓 (圖書館)', '1F 樂活圖書館'];
    case 'building-complex-2f':
      return ['桃園市立大溪國中', '綜合大樓 (圖書館)', '2F 智慧資訊中心'];

    // 八年級教學棟
    case 'building-grade8-1f':
      return ['桃園市立大溪國中', '八年級教學棟', '1F 木藝與幼兒天地'];
    case 'building-grade8-2f':
      return ['桃園市立大溪國中', '八年級教學棟', '2F 幾何與代數探索區'];
    case 'building-grade8-3f':
      return ['桃園市立大溪國中', '八年級教學棟', '3F 桌遊與跨領域專科'];

    // 九年級教學棟
    case 'building-grade9-1f':
      return ['桃園市立大溪國中', '九年級教學棟', '1F 相似形探索區'];
    case 'building-grade9-2f':
      return ['桃園市立大溪國中', '九年級教學棟', '2F 圓與幾何綜合區'];
    case 'building-grade9-3f':
      return ['桃園市立大溪國中', '九年級教學棟', '3F 函數與會考決戰區'];

    // 藝術館
    case 'building-art-1f':
      return ['桃園市立大溪國中', '藝術館', '1F 樂活體能教室'];
    case 'building-art-2f':
      return ['桃園市立大溪國中', '藝術館', '2F 音樂與美學殿堂'];

    // 學生活動中心
    case 'building-activity':
      return ['桃園市立大溪國中', '學生活動中心', '會考大殿堂 The Grand Arena'];
    case 'building-gym-1f':
      return ['桃園市立大溪國中', '學生活動中心', '綜合球場'];

    default:
      return ['桃園市立大溪國中', '校園空間'];
  }
}

export function getBuildingById(buildingId: string): WorldBuilding | undefined {
  return DAXI_CAMPUS_WORLD.buildings.find((b) => b.id === buildingId);
}

export function getFloorByMapId(mapId: string): WorldFloor | undefined {
  for (const b of DAXI_CAMPUS_WORLD.buildings) {
    const floor = b.floors.find((f) => f.mapId === mapId);
    if (floor) return floor;
  }
  return undefined;
}

export function getRoomById(roomId: string): WorldRoom | undefined {
  for (const b of DAXI_CAMPUS_WORLD.buildings) {
    for (const f of b.floors) {
      const room = f.rooms.find((r) => r.id === roomId);
      if (room) return room;
    }
  }
  return undefined;
}

export const CAMPUS_STRUCTURE = DAXI_CAMPUS_WORLD;
