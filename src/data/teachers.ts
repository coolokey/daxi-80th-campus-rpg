export type TeacherSubject =
  | 'math'
  | 'tech'
  | 'science'
  | 'chinese'
  | 'english'
  | 'social';

export type TeacherExpression =
  | 'normal'
  | 'smile'
  | 'thinking'
  | 'surprised'
  | 'serious'
  | 'encourage';

export interface TeacherExpressions {
  normal: string;
  smile: string;
  thinking: string;
  surprised: string;
  serious: string;
  encourage: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  displayName: string;
  domain: string;
  subject: TeacherSubject;
  rpgClass: string;
  rpgClassId: string;
  sprite: string;
  portrait: string;
  icon: string;
  themeColor: string;
  badge: string;
  introDialogue: string;
  dialogues: {
    greeting: string;
    questOffer: string;
    questComplete: string;
    hint: string;
    encourage: string;
  };
  expressions: TeacherExpressions;
  isMathTeam?: boolean;
  isConvener?: boolean;
}

/**
 * 數學領域全體 11 位教師清冊（依大溪國中 115-1 領域課程小組名單）
 */
export const MATH_TEACHERS: TeacherProfile[] = [
  {
    id: 'teacher-001',
    name: '蔡之民',
    displayName: '蔡之民老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '數字研究員／幾何工程師',
    rpgClassId: 'number-researcher',
    sprite: '/assets/teachers/teacher-001-full.png',
    portrait: '/assets/teachers/teacher-001-portrait.png',
    icon: '/assets/teachers/teacher-001-icon.png',
    themeColor: '#00E5FF',
    badge: '幾何與數值核心',
    isConvener: true,
    isMathTeam: true,
    introDialogue: '所有的複雜幾何與坐標，都是通往宇宙真理的密碼。準備好校準你的數值核心了嗎？',
    dialogues: {
      greeting: '你好，探索者！數學是校園運作的底層基石，隨時準備進行運算挑戰。',
      questOffer: '主核心的幾何能量網格出現偏移，需要精準計算正負數與指數來校正。',
      questComplete: '幾何坐標完全吻合！你的數值推導邏輯非常出色。',
      hint: '試著在腦海中畫一條數線，負負得正就像是在相反方向上再轉 180 度。',
      encourage: '不要怕算錯，每一次偏差修正都會讓數值模型更加穩固，再來試一次！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-001-expression-normal.png',
      smile: '/assets/teachers/teacher-001-expression-smile.png',
      thinking: '/assets/teachers/teacher-001-expression-thinking.png',
      surprised: '/assets/teachers/teacher-001-expression-surprised.png',
      serious: '/assets/teachers/teacher-001-expression-serious.png',
      encourage: '/assets/teachers/teacher-001-expression-encourage.png',
    },
  },
  {
    id: 'teacher-math-002',
    name: '游家興',
    displayName: '游家興主任',
    domain: '數學',
    subject: 'math',
    rpgClass: '數值分析師／矩陣拓撲師',
    rpgClassId: 'matrix-analyst',
    sprite: '/assets/teachers/teacher-math-002-full.png',
    portrait: '/assets/teachers/teacher-math-002-portrait.png',
    icon: '/assets/teachers/teacher-math-002-icon.png',
    themeColor: '#7C4DFF',
    badge: '莫比烏斯莫測核心',
    isMathTeam: true,
    introDialogue: '數學如同一條無窮伸展的莫比烏斯環，在轉折處總能看見心靈與邏輯的共鳴。',
    dialogues: {
      greeting: '探索者，在學習的路上如果感到迷茫，數學的純粹會為你指引方向。',
      questOffer: '輔導網絡的矩陣權重需要平衡，運用你的代數直覺找出未知數吧。',
      questComplete: '矩陣流動平穩順暢，你展現了兼具同理心與邏輯力的特質。',
      hint: '將複雜的多變量問題列成方程式組，未知數就會一步步清晰。',
      encourage: '解題也是一種成長歷程，深呼吸，我們一起找出癥結點。',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-002-portrait.png',
      smile: '/assets/teachers/teacher-math-002-portrait.png',
      thinking: '/assets/teachers/teacher-math-002-portrait.png',
      surprised: '/assets/teachers/teacher-math-002-portrait.png',
      serious: '/assets/teachers/teacher-math-002-portrait.png',
      encourage: '/assets/teachers/teacher-math-002-portrait.png',
    },
  },
  {
    id: 'teacher-math-003',
    name: '張秀萍',
    displayName: '張秀萍老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '代數幾何官／坐標運算師',
    rpgClassId: 'algebra-spatial-officer',
    sprite: '/assets/teachers/teacher-math-003-full.png',
    portrait: '/assets/teachers/teacher-math-003-portrait.png',
    icon: '/assets/teachers/teacher-math-003-icon.png',
    themeColor: '#76FF03',
    badge: '三維空間直角座標儀',
    isMathTeam: true,
    introDialogue: '空間中的每個交點都是代數方程式的解，掌握坐標，就能掌握整片天際。',
    dialogues: {
      greeting: '嗨！八年級的代數幾何世界正在展開，準備好探索立體坐標系了嗎？',
      questOffer: '迎曦樓上空的空間坐標儀出現維度擾動，快用二元一次聯立方程校正它！',
      questComplete: '三維坐標錨定完成！你的空間感知與代數推導非常精確。',
      hint: '先在平面畫出兩條直線的交點，那就是聯立方程式的唯一解。',
      encourage: '空間概念需要練習想像，動手畫出圖形，思路就會豁然開朗！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-003-portrait.png',
      smile: '/assets/teachers/teacher-math-003-portrait.png',
      thinking: '/assets/teachers/teacher-math-003-portrait.png',
      surprised: '/assets/teachers/teacher-math-003-portrait.png',
      serious: '/assets/teachers/teacher-math-003-portrait.png',
      encourage: '/assets/teachers/teacher-math-003-portrait.png',
    },
  },
  {
    id: 'teacher-math-004',
    name: '張雅琪',
    displayName: '張雅琪老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '函數架構師／曲線演算員',
    rpgClassId: 'function-architect',
    sprite: '/assets/teachers/teacher-math-004-full.png',
    portrait: '/assets/teachers/teacher-math-004-portrait.png',
    icon: '/assets/teachers/teacher-math-004-icon.png',
    themeColor: '#E040FB',
    badge: '雙曲線波形振盪器',
    isMathTeam: true,
    introDialogue: '輸入一個數值，對應一個唯一的答案，這就是函數的美妙秩序。',
    dialogues: {
      greeting: '今天想要畫出拋物線還是正弦波？函數的世界隨處都是規律的節奏。',
      questOffer: '能源核心的輸出功率隨著時間變動，請為它建構出精確的二次函數模型。',
      questComplete: '頂點坐標完美算出！能源波形已達到最高效益點。',
      hint: '配方法是找出拋物線頂點的關鍵，先提出首項係數再配方。',
      encourage: '曲線有高低起伏，學習也是一樣，只要把握住對稱軸就能看清全局！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-004-portrait.png',
      smile: '/assets/teachers/teacher-math-004-portrait.png',
      thinking: '/assets/teachers/teacher-math-004-portrait.png',
      surprised: '/assets/teachers/teacher-math-004-portrait.png',
      serious: '/assets/teachers/teacher-math-004-portrait.png',
      encourage: '/assets/teachers/teacher-math-004-portrait.png',
    },
  },
  {
    id: 'teacher-math-005',
    name: '陳小鈴',
    displayName: '陳小鈴老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '幾何繪圖師／黃金比例專員',
    rpgClassId: 'geometric-drafter',
    sprite: '/assets/teachers/teacher-math-005-full.png',
    portrait: '/assets/teachers/teacher-math-005-portrait.png',
    icon: '/assets/teachers/teacher-math-005-icon.png',
    themeColor: '#FF4081',
    badge: '斐波那契黃金螺旋盤',
    isMathTeam: true,
    introDialogue: '大自然裡的花瓣與海螺，都遵循著黃金比例；幾何繪圖是理性的最高美學。',
    dialogues: {
      greeting: '拿起尺規，每一條輔助線都是通往幾何證明的金鑰匙。',
      questOffer: '校園綠帶的造景設計需要符合黃金分割率，一起用尺規作圖完成它吧！',
      questComplete: '圖形比例完美和諧！你對幾何美學有著天生的敏銳度。',
      hint: '善用三角形全等性質，對應角與對應邊相等就是最強力的證據。',
      encourage: '證明題不要慌，寫下已知條件與求證目標，一步步推敲一定能解開。',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-005-portrait.png',
      smile: '/assets/teachers/teacher-math-005-portrait.png',
      thinking: '/assets/teachers/teacher-math-005-portrait.png',
      surprised: '/assets/teachers/teacher-math-005-portrait.png',
      serious: '/assets/teachers/teacher-math-005-portrait.png',
      encourage: '/assets/teachers/teacher-math-005-portrait.png',
    },
  },
  {
    id: 'teacher-math-006',
    name: '游貿仁',
    displayName: '游貿仁組長',
    domain: '數學',
    subject: 'math',
    rpgClass: '離散數據官／演算法研究員',
    rpgClassId: 'discrete-data-officer',
    sprite: '/assets/teachers/teacher-math-006-full.png',
    portrait: '/assets/teachers/teacher-math-006-portrait.png',
    icon: '/assets/teachers/teacher-math-006-icon.png',
    themeColor: '#00B0FF',
    badge: '二元樹與圖論節點儀',
    isMathTeam: true,
    introDialogue: '大數據與離散節點，構成了校園管理的核心運算網，每個數字都是責任。',
    dialogues: {
      greeting: '學籍資料庫與註冊網絡運作如常，離散數學正是資訊世界的骨幹。',
      questOffer: '選課分流演算法需要最佳化路徑圖，請計算各學科據點的最短路徑。',
      questComplete: '最佳路徑確認！校園人流調度效率提升了 30%。',
      hint: '排列與組合的差別在於「順序」：排隊要看順序，分組只要看成員。',
      encourage: '邏輯分析講求條理，將情況分類討論，就不會遺漏任何可能性！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-006-portrait.png',
      smile: '/assets/teachers/teacher-math-006-portrait.png',
      thinking: '/assets/teachers/teacher-math-006-portrait.png',
      surprised: '/assets/teachers/teacher-math-006-portrait.png',
      serious: '/assets/teachers/teacher-math-006-portrait.png',
      encourage: '/assets/teachers/teacher-math-006-portrait.png',
    },
  },
  {
    id: 'teacher-math-007',
    name: '方廷榕',
    displayName: '方廷榕老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '幾何工程師／坐標引導員',
    rpgClassId: 'coordinate-guide',
    sprite: '/assets/teachers/teacher-math-007-full.png',
    portrait: '/assets/teachers/teacher-math-007-portrait.png',
    icon: '/assets/teachers/teacher-math-007-icon.png',
    themeColor: '#00E5FF',
    badge: '稜鏡坐標測距儀',
    isMathTeam: true,
    introDialogue: '教育不是生硬的公式，而是耐心的引導與陪伴。坐標系上，每個人都能找到自己的位置。',
    dialogues: {
      greeting: '904 的大家，歡迎來到幾何實驗場，讓我們一步一腳印踏實學習。',
      questOffer: '科技館廣場的雷射測距儀需要定位校準，請利用畢氏定理求出斜邊距離。',
      questComplete: '直角三角形邊長精準無誤！你的基礎觀念非常紮實。',
      hint: 'a 平方加 b 平方等於 c 平方，記得先確認哪一條是最長邊（斜邊）。',
      encourage: '慢慢來，比較快。每算完一步就驗算一次，答案自然會浮現。',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-007-portrait.png',
      smile: '/assets/teachers/teacher-math-007-portrait.png',
      thinking: '/assets/teachers/teacher-math-007-portrait.png',
      surprised: '/assets/teachers/teacher-math-007-portrait.png',
      serious: '/assets/teachers/teacher-math-007-portrait.png',
      encourage: '/assets/teachers/teacher-math-007-portrait.png',
    },
  },
  {
    id: 'teacher-math-008',
    name: '康嘉玲',
    displayName: '康嘉玲老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '數線探索員／微積分典藏官',
    rpgClassId: 'numberline-explorer',
    sprite: '/assets/teachers/teacher-math-008-full.png',
    portrait: '/assets/teachers/teacher-math-008-portrait.png',
    icon: '/assets/teachers/teacher-math-008-icon.png',
    themeColor: '#FF6D00',
    badge: '連續數線光譜儀',
    isMathTeam: true,
    introDialogue: '從零出發，正數向右，負數向左，數線的世界無限寬廣！',
    dialogues: {
      greeting: '801 的夥伴們，今天也要帶著元氣，在數線上跳躍探索！',
      questOffer: '溫度控制感測器在零下環境失準，請計算正負數運算以重設溫控閾值。',
      questComplete: '絕對值與正負數校正完畢，溫度系統恢復穩定運作！',
      hint: '減去一個負數等於加上它的相反數，就如同向後倒退轉向走！',
      encourage: '錯了沒關係，數線上隨時可以折返，再推算一次就會對！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-008-portrait.png',
      smile: '/assets/teachers/teacher-math-008-portrait.png',
      thinking: '/assets/teachers/teacher-math-008-portrait.png',
      surprised: '/assets/teachers/teacher-math-008-portrait.png',
      serious: '/assets/teachers/teacher-math-008-portrait.png',
      encourage: '/assets/teachers/teacher-math-008-portrait.png',
    },
  },
  {
    id: 'teacher-math-009',
    name: '潘建銘',
    displayName: '潘建銘老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '統計分析師／數值運算官',
    rpgClassId: 'statistics-analyst',
    sprite: '/assets/teachers/teacher-math-009-full.png',
    portrait: '/assets/teachers/teacher-math-009-portrait.png',
    icon: '/assets/teachers/teacher-math-009-icon.png',
    themeColor: '#26A69A',
    badge: '常態分佈概率圓盤',
    isMathTeam: true,
    introDialogue: '數據不會說謊，只要善用統計圖表與機率模型，就能看穿亂數背後的真理。',
    dialogues: {
      greeting: '808 的同學們，今天我們用數據說話，解讀校園運行指標。',
      questOffer: '全校用電量分佈圖需要計算中位數與四分位距，請產出盒狀圖分析報告。',
      questComplete: '數據指標全部釐清！離群值已順利排除，分析非常專業。',
      hint: '找中位數前務必「先將資料由小到大排序」，偶數筆資料取中間兩數平均。',
      encourage: '統計需要耐心整理每一筆數據，細心檢查，你一定做得好！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-009-portrait.png',
      smile: '/assets/teachers/teacher-math-009-portrait.png',
      thinking: '/assets/teachers/teacher-math-009-portrait.png',
      surprised: '/assets/teachers/teacher-math-009-portrait.png',
      serious: '/assets/teachers/teacher-math-009-portrait.png',
      encourage: '/assets/teachers/teacher-math-009-portrait.png',
    },
  },
  {
    id: 'teacher-math-010',
    name: '徐君萍',
    displayName: '徐君萍老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '空間投影師／幾何巡航員',
    rpgClassId: 'spatial-projectionist',
    sprite: '/assets/teachers/teacher-math-010-full.png',
    portrait: '/assets/teachers/teacher-math-010-portrait.png',
    icon: '/assets/teachers/teacher-math-010-icon.png',
    themeColor: '#AB47BC',
    badge: '十二面體旋轉投影儀',
    isMathTeam: true,
    introDialogue: '三年相伴，願大家帶著數學的勇氣與邏輯，勇敢去追求屬於自己的人生！',
    dialogues: {
      greeting: '901 的同學們，無論面對多繁複的立體展開圖，只要理清面與邊的關係就能迎刃而解。',
      questOffer: '未來校舍模型的多面體表面積需要重新計算，你能展開正四面體求算總面積嗎？',
      questComplete: '展開圖完美吻合！立體空間投影運算無懈可擊。',
      hint: '立體幾何先畫出展開圖，化立體為平面，問題就簡單多了。',
      encourage: '相信自己的空間直覺，動手摺疊想像一下，答案馬上就出來了！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-010-portrait.png',
      smile: '/assets/teachers/teacher-math-010-portrait.png',
      thinking: '/assets/teachers/teacher-math-010-portrait.png',
      surprised: '/assets/teachers/teacher-math-010-portrait.png',
      serious: '/assets/teachers/teacher-math-010-portrait.png',
      encourage: '/assets/teachers/teacher-math-010-portrait.png',
    },
  },
  {
    id: 'teacher-math-011',
    name: '何昶毅',
    displayName: '何昶毅老師',
    domain: '數學',
    subject: 'math',
    rpgClass: '向量演算師／幾何邏輯員',
    rpgClassId: 'vector-logician',
    sprite: '/assets/teachers/teacher-math-011-full.png',
    portrait: '/assets/teachers/teacher-math-011-portrait.png',
    icon: '/assets/teachers/teacher-math-011-icon.png',
    themeColor: '#3F51B5',
    badge: '三向向量指示針',
    isMathTeam: true,
    introDialogue: '向量有大小也有方向，正如人生的航道；鎖定目標，全力前行！',
    dialogues: {
      greeting: '專注與邏輯，是數學演算中最堅韌的力量。今天也要保持最佳狀態。',
      questOffer: '無人巡邏機的飛行路徑出現側風漂移，請利用向量加法求出合成位移向量。',
      questComplete: '飛行向量修正完成！無人機精準返回停機坪，演算非常敏銳。',
      hint: '平行四邊形法或是首尾相連法，都能快速求出兩向量的合成結果。',
      encourage: '方向對了，就不怕路遠。再審視一次題目給予的向量角度！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-math-011-portrait.png',
      smile: '/assets/teachers/teacher-math-011-portrait.png',
      thinking: '/assets/teachers/teacher-math-011-portrait.png',
      surprised: '/assets/teachers/teacher-math-011-portrait.png',
      serious: '/assets/teachers/teacher-math-011-portrait.png',
      encourage: '/assets/teachers/teacher-math-011-portrait.png',
    },
  },
];

/**
 * 六大學習領域召集人清冊（依 Table 5 美術規格書規範）
 */
export const DOMAIN_CONVENERS: TeacherProfile[] = [
  MATH_TEACHERS[0], // 蔡之民 (數學)
  {
    id: 'teacher-002',
    name: '陳毅宏',
    displayName: '陳毅宏老師',
    domain: '科技',
    subject: 'tech',
    rpgClass: '數位工程師',
    rpgClassId: 'digital-engineer',
    sprite: '/assets/teachers/teacher-002-full.png',
    portrait: '/assets/teachers/teacher-002-portrait.png',
    icon: '/assets/teachers/teacher-002-icon.png',
    themeColor: '#FF9100',
    badge: '邏輯電路晶片',
    isConvener: true,
    introDialogue: '從演算法到實體機構，只要邏輯清晰，程式碼就能驅動整個未來校園！',
    dialogues: {
      greeting: '歡迎來到科技製造中心！這裏是將創意思維化為實體裝置的基地。',
      questOffer: '科技實驗室的智慧控制模組需要重構邏輯閘，你能幫忙測試程式碼嗎？',
      questComplete: '電路訊號完整接通！這正是優秀數位工程師的實踐力。',
      hint: '先分解問題，將大任務拆成輸入、處理、輸出三個步驟。',
      encourage: 'Debug 是工程師的家常便飯，找出 bug 就離成功更近一步了！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-002-expression-normal.png',
      smile: '/assets/teachers/teacher-002-expression-smile.png',
      thinking: '/assets/teachers/teacher-002-expression-thinking.png',
      surprised: '/assets/teachers/teacher-002-expression-surprised.png',
      serious: '/assets/teachers/teacher-002-expression-serious.png',
      encourage: '/assets/teachers/teacher-002-expression-encourage.png',
    },
  },
  {
    id: 'teacher-003',
    name: '張致信',
    displayName: '張致信老師',
    domain: '自然',
    subject: 'science',
    rpgClass: '元素研究員',
    rpgClassId: 'element-researcher',
    sprite: '/assets/teachers/teacher-003-full.png',
    portrait: '/assets/teachers/teacher-003-portrait.png',
    icon: '/assets/teachers/teacher-003-icon.png',
    themeColor: '#00E676',
    badge: '元素分子反應爐',
    isConvener: true,
    introDialogue: '觀察物質的微觀變化，平衡化學鍵與能量流，大自然的奧秘就在每一次實驗中展現。',
    dialogues: {
      greeting: '自然界的規律既嚴謹又美麗。你今天觀察到了什麼有趣的現象呢？',
      questOffer: '生態溫室的光合作用轉化率異常，我們需要分析元素反應與光譜數據。',
      questComplete: '元素能量守恆達成平衡！你的科學探究精神值得肯定。',
      hint: '回想質量守恆定律：反應前後原子的種類與數目是不會無端增減的。',
      encourage: '科學就是在假設與求證中前進的，換個變因再觀察一次！',
    },
    expressions: {
      normal: '/assets/teachers/teacher-003-expression-normal.png',
      smile: '/assets/teachers/teacher-003-expression-smile.png',
      thinking: '/assets/teachers/teacher-003-expression-thinking.png',
      surprised: '/assets/teachers/teacher-003-expression-surprised.png',
      serious: '/assets/teachers/teacher-003-expression-serious.png',
      encourage: '/assets/teachers/teacher-003-expression-encourage.png',
    },
  },
  {
    id: 'teacher-004',
    name: '文明慧',
    displayName: '文明慧老師',
    domain: '國文',
    subject: 'chinese',
    rpgClass: '文字典藏師',
    rpgClassId: 'text-archivist',
    sprite: '/assets/teachers/teacher-004-full.png',
    portrait: '/assets/teachers/teacher-004-portrait.png',
    icon: '/assets/teachers/teacher-004-icon.png',
    themeColor: '#FF5252',
    badge: '典籍墨韻卷軸',
    isConvener: true,
    introDialogue: '文字是時光的容器，一筆一畫蘊藏著千年智慧。讓我們在數位墨香中解鎖心靈的篇章。',
    dialogues: {
      greeting: '書香致遠，字字有光。今天想閱讀哪一段歷史長河裡的動人篇章？',
      questOffer: '古籍數位典藏庫有一卷損毀的文獻，需要透過字意脈絡加以辨析還原。',
      questComplete: '文字的意境豁然開朗！你深刻體會到了文字背後的情感與寓意。',
      hint: '注意文眼與上下文的承轉關係，字詞在不同的語境常有不同的寄託。',
      encourage: '語感的培養需要時間沉澱，慢慢咀嚼這段文句，再讀一遍試試。',
    },
    expressions: {
      normal: '/assets/teachers/teacher-004-expression-normal.png',
      smile: '/assets/teachers/teacher-004-expression-smile.png',
      thinking: '/assets/teachers/teacher-004-expression-thinking.png',
      surprised: '/assets/teachers/teacher-004-expression-surprised.png',
      serious: '/assets/teachers/teacher-004-expression-serious.png',
      encourage: '/assets/teachers/teacher-004-expression-encourage.png',
    },
  },
  {
    id: 'teacher-005',
    name: '李昱瑩',
    displayName: '李昱瑩老師',
    domain: '英語',
    subject: 'english',
    rpgClass: '語言導航員',
    rpgClassId: 'language-navigator',
    sprite: '/assets/teachers/teacher-005-full.png',
    portrait: '/assets/teachers/teacher-005-portrait.png',
    icon: '/assets/teachers/teacher-005-icon.png',
    themeColor: '#2979FF',
    badge: '全球音頻導航儀',
    isConvener: true,
    introDialogue: 'Language connects our world and beyond! 戴上導航耳機，勇敢用英語跨越所有溝通邊界。',
    dialogues: {
      greeting: 'Hello there, explorer! Ready to expand your horizon through language?',
      questOffer: '國際空間站發來一段雙語通訊信號，需要我們解讀關鍵字彙與句構。',
      questComplete: 'Crystal clear! 通訊頻道順利導通，你的語言掌握力令人驚豔。',
      hint: 'Listen closely to the tone and look for key transition words like "however" and "therefore".',
      encourage: 'Practice makes progress! Don’t be afraid of making mistakes, let’s try again!',
    },
    expressions: {
      normal: '/assets/teachers/teacher-005-expression-normal.png',
      smile: '/assets/teachers/teacher-005-expression-smile.png',
      thinking: '/assets/teachers/teacher-005-expression-thinking.png',
      surprised: '/assets/teachers/teacher-005-expression-surprised.png',
      serious: '/assets/teachers/teacher-005-expression-serious.png',
      encourage: '/assets/teachers/teacher-005-expression-encourage.png',
    },
  },
  {
    id: 'teacher-006',
    name: '黃瓘婷',
    displayName: '黃瓘婷老師',
    domain: '社會',
    subject: 'social',
    rpgClass: '時空檔案員',
    rpgClassId: 'spatiotemporal-archivist',
    sprite: '/assets/teachers/teacher-006-full.png',
    portrait: '/assets/teachers/teacher-006-portrait.png',
    icon: '/assets/teachers/teacher-006-icon.png',
    themeColor: '#FFD600',
    badge: '時空星盤儀',
    isConvener: true,
    introDialogue: '每一段歷史都是未來的借鏡，每幅地圖都刻印著人類的足跡。讓我們翻開大溪與世界的時空檔案。',
    dialogues: {
      greeting: '歷史是過往的迴響，地理是舞台的經緯。探索過去，方能看清未來。',
      questOffer: '大漢溪流域的百年時空資料流出現紊亂，需要比對古地圖與人文演進史。',
      questComplete: '歷史脈絡完整串連！大溪老街與河港的繁華印記再度鮮活呈現。',
      hint: '結合地形與交通要道來思考，自然環境往往深刻影響著聚落與社會的發展。',
      encourage: '時空的拼圖需要耐心尋找線索，回顧一下時代背景，你一定能找到答案。',
    },
    expressions: {
      normal: '/assets/teachers/teacher-006-expression-normal.png',
      smile: '/assets/teachers/teacher-006-expression-smile.png',
      thinking: '/assets/teachers/teacher-006-expression-thinking.png',
      surprised: '/assets/teachers/teacher-006-expression-surprised.png',
      serious: '/assets/teachers/teacher-006-expression-serious.png',
      encourage: '/assets/teachers/teacher-006-expression-encourage.png',
    },
  },
];

/**
 * 完整教師資料庫（合併 6 大領域召集人與全體 11 位數學教師，無重複項）
 */
export const TEACHERS: TeacherProfile[] = [
  ...DOMAIN_CONVENERS,
  ...MATH_TEACHERS.slice(1), // 排除重複的召集人蔡之民 (teacher-001)
];

export function getTeacherById(id: string): TeacherProfile | undefined {
  if (id === 'teacher-math-001') {
    return MATH_TEACHERS[0];
  }
  return TEACHERS.find((t) => t.id === id);
}

export function getTeacherBySubject(subject: TeacherSubject): TeacherProfile | undefined {
  return DOMAIN_CONVENERS.find((t) => t.subject === subject) || TEACHERS.find((t) => t.subject === subject);
}

export function getAllTeachers(): TeacherProfile[] {
  return TEACHERS;
}

export function getMathTeachers(): TeacherProfile[] {
  return MATH_TEACHERS;
}

export function getDomainConveners(): TeacherProfile[] {
  return DOMAIN_CONVENERS;
}

export function getTeacherExpression(
  teacherId: string,
  expression: TeacherExpression = 'normal'
): string {
  const teacher = getTeacherById(teacherId);
  if (!teacher) return '';
  return teacher.expressions[expression] || teacher.portrait;
}
