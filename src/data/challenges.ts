import type { ChoiceQuestion } from '../types/game';

export interface ClassroomChallenge {
  id: string;
  title: string;
  roomName: string;
  grade: 7 | 8 | 9 | 'general';
  concept: string;
  conceptTitle: string;
  isEasterEgg?: boolean;
  easterEggBadge?: string;
  questions: ChoiceQuestion[];
}

/**
 * 完整七、八、九年級各班級教室、質數特訓關卡與校園彩蛋題庫
 */
export const CLASSROOM_CHALLENGES: Record<string, ClassroomChallenge> = {
  // 七年級主要數學校準核心（蔡老師研究室）
  'challenge-g7-math': {
    id: 'challenge-g7-math',
    title: '七年級核心數學校準任務',
    roomName: '七年級數學研究室',
    grade: 7,
    concept: 'core-math',
    conceptTitle: '正負數、指數與因數綜合校準',
    questions: [
      {
        id: 'g7-int-01',
        grade: 7,
        concept: 'integer',
        prompt: '地下 3 層記為 -3，地上 5 層記為 5，兩者相差幾層？',
        choices: ['2', '5', '8', '-8'],
        answer: 2,
        hint: '以數線想像從 -3 走到 5。',
        explanation: '5 - (-3) = 8，所以相差 8 層。',
      },
      {
        id: 'g7-int-02',
        grade: 7,
        concept: 'integer',
        prompt: '-7 + 12 的值為何？',
        choices: ['-19', '-5', '5', '19'],
        answer: 2,
        hint: '先比較正負數的絕對值。',
        explanation: '12 的絕對值較大，12 - 7 = 5。',
      },
      {
        id: 'g7-exp-01',
        grade: 7,
        concept: 'exponent',
        prompt: '2 的 4 次方是多少？',
        choices: ['6', '8', '16', '32'],
        answer: 2,
        hint: '將 2 連乘 4 次。',
        explanation: '2 × 2 × 2 × 2 = 16。',
      },
      {
        id: 'g7-exp-02',
        grade: 7,
        concept: 'exponent',
        prompt: '下列何者等於 3³？',
        choices: ['3 + 3 + 3', '3 × 3 × 3', '3 × 3', '9 × 3 × 3'],
        answer: 1,
        hint: '次方表示相同底數連乘。',
        explanation: '3³ 表示 3 × 3 × 3。',
      },
      {
        id: 'g7-factor-01',
        grade: 7,
        concept: 'factor',
        prompt: '下列哪一個是 18 的因數？',
        choices: ['5', '6', '7', '8'],
        answer: 1,
        hint: '能整除 18 的數才是因數。',
        explanation: '18 ÷ 6 = 3，沒有餘數。',
      },
    ],
  },

  // 706 教室 / 質數判別特訓關卡（偽質數粉碎者與質數獵人）
  'challenge-prime-hunter': {
    id: 'challenge-prime-hunter',
    title: '706 質數研究室：質數獵人特訓關卡',
    roomName: '706 質因數研究室',
    grade: 7,
    concept: 'prime-myth-buster',
    conceptTitle: '質數概念與經典迷思破解',
    isEasterEgg: true,
    easterEggBadge: '🎯 質數獵人 (Prime Hunter)',
    questions: [
      {
        id: 'prime-01',
        grade: 7,
        concept: 'prime',
        prompt: '【經典偽質數】下列哪一個數「不是」質數？',
        choices: ['79', '97', '91', '83'],
        answer: 2,
        hint: '試著用 7 或 11 檢查看看。',
        explanation: '91 = 7 × 13，能被 7 與 13 整除，是合數！79、83、97 都是質數。',
      },
      {
        id: 'prime-02',
        grade: 7,
        concept: 'prime',
        prompt: '51 是質數還是合數？請選出正確論述：',
        choices: [
          '質數，因為個位數是 1',
          '合數，因為各數字和 5+1=6 能被 3 整除 (51 = 3 × 17)',
          '質數，只有 1 和 51 兩個因數',
          '既不是質數也不是合數',
        ],
        answer: 1,
        hint: '觀察各數字和：5 + 1 = 6 是 3 的倍數。',
        explanation: '51 的數字和為 6，是 3 的倍數，51 = 3 × 17，為合數！',
      },
      {
        id: 'prime-03',
        grade: 7,
        concept: 'prime',
        prompt: '關於「質數」的性質，下列哪一項敘述「完全正確」？',
        choices: [
          '1 是最小的質數',
          '所有的質數都是奇數',
          '2 是最小的質數，也是唯一的偶數質數',
          '所有的奇數都是質數',
        ],
        answer: 2,
        hint: '回想 1 和 2 的定義，以及 9 是否為質數。',
        explanation: '2 恰好只有 1 和 2 兩個正因數，是最小質數也是唯一的偶數質數；1 既非質數亦非合數。',
      },
      {
        id: 'prime-04',
        grade: 7,
        concept: 'prime',
        prompt: '下列哪一組數字「全部都是質數」？',
        choices: [
          '2, 3, 5, 7, 9',
          '11, 13, 17, 19',
          '51, 53, 59',
          '87, 89, 97',
        ],
        answer: 1,
        hint: '注意 9、51、87 分別能被 3 整除。',
        explanation: '9=3², 51=3×17, 87=3×29 皆為合數。只有 (11, 13, 17, 19) 全部為質數。',
      },
    ],
  },

  // 幼兒園 / 桌遊教室彩蛋：國小九九乘法表
  'challenge-multiplication-easter': {
    id: 'challenge-multiplication-easter',
    title: '非營利幼兒園彩蛋：國小九九乘法速問',
    roomName: '非營利幼兒園 / 啟蒙教室',
    grade: 'general',
    concept: 'multiplication-table',
    conceptTitle: '童心未泯九九乘法表',
    isEasterEgg: true,
    easterEggBadge: '🌟 九九乘法大師 (Times Table Master)',
    questions: [
      {
        id: 'easter-99-01',
        grade: 7,
        concept: 'arithmetic',
        prompt: '【九九乘法速問】7 × 8 等於多少？',
        choices: ['54', '56', '58', '64'],
        answer: 1,
        hint: '七七四十九，再多加一個 7。',
        explanation: '7 × 8 = 56。七八五十六，基礎九九乘法！',
      },
      {
        id: 'easter-99-02',
        grade: 7,
        concept: 'arithmetic',
        prompt: '【九九乘法速問】9 × 9 等於多少？',
        choices: ['72', '81', '89', '99'],
        answer: 1,
        hint: '九九乘法表的最大乘積。',
        explanation: '9 × 9 = 81。九九八十一！',
      },
      {
        id: 'easter-99-03',
        grade: 7,
        concept: 'arithmetic',
        prompt: '【九九乘法速問】6 × 7 等於多少？',
        choices: ['42', '48', '36', '49'],
        answer: 0,
        hint: '六六三十六，再加 6。',
        explanation: '6 × 7 = 42。六七四十二！',
      },
    ],
  },

  // 合作社彩蛋：生活速算
  'challenge-coop-speed-math': {
    id: 'challenge-coop-speed-math',
    title: '員生合作社彩蛋：下課結帳生活速算',
    roomName: '員生合作社',
    grade: 'general',
    concept: 'speed-math',
    conceptTitle: '生活情境四則速算',
    isEasterEgg: true,
    easterEggBadge: '🪙 合作社速算之王',
    questions: [
      {
        id: 'coop-01',
        grade: 7,
        concept: 'arithmetic',
        prompt: '買了一瓶 25 元的豆漿與一個 38 元的三明治，拿 100 元鈔票付款應找回多少？',
        choices: ['27 元', '37 元', '47 元', '43 元'],
        answer: 1,
        hint: '先算總花費：25 + 38 = 63。',
        explanation: '100 - (25 + 38) = 100 - 63 = 37 元。',
      },
      {
        id: 'coop-02',
        grade: 7,
        concept: 'arithmetic',
        prompt: '合作社麵包買二送一（每組 3 個算 2 個錢），每個麵包 30 元。買 6 個共需多少元？',
        choices: ['120 元', '150 元', '180 元', '90 元'],
        answer: 0,
        hint: '6 個剛好是 2 組「買二送一」，每組付 2 個錢。',
        explanation: '買 6 個只需付 4 個的價錢：4 × 30 = 120 元。',
      },
    ],
  },

  // 八年級 803 教室：乘法公式與多項式
  'challenge-g8-algebra': {
    id: 'challenge-g8-algebra',
    title: '八年級代數研究室：乘法公式與因式分解',
    roomName: '803 乘法公式研究室',
    grade: 8,
    concept: 'algebra-formulas',
    conceptTitle: '乘法公式與多項式運算',
    questions: [
      {
        id: 'g8-alg-01',
        grade: 8,
        concept: 'algebra',
        prompt: '(a + b)² 展開後等於下列何者？',
        choices: ['a² + b²', 'a² + 2ab + b²', 'a² - 2ab + b²', '2a + 2b'],
        answer: 1,
        hint: '和的平方公式：(a+b)(a+b)。',
        explanation: '(a + b)² = a² + 2ab + b²。',
      },
      {
        id: 'g8-alg-02',
        grade: 8,
        concept: 'algebra',
        prompt: '(a + b)(a - b) 展開後等於？',
        choices: ['a² - b²', 'a² + b²', 'a² - 2ab + b²', '(a - b)²'],
        answer: 0,
        hint: '平方差公式，中間項正負抵消。',
        explanation: '(a + b)(a - b) = a² - ab + ba - b² = a² - b²。',
      },
    ],
  },

  // 九年級 903 教室：幾何推導與圓定理
  'challenge-g9-geometry': {
    id: 'challenge-g9-geometry',
    title: '九年級幾何研究室：圓形幾何推導',
    roomName: '903 幾何研究室',
    grade: 9,
    concept: 'geometry-circle',
    conceptTitle: '圓周角與圓內接四邊形定理',
    questions: [
      {
        id: 'g9-geo-01',
        grade: 9,
        concept: 'geometry',
        prompt: '圓內接四邊形的一組對角度數有何關係？',
        choices: ['相等', '互補 (和為 180°)', '互餘 (和為 90°)', '和為 360°'],
        answer: 1,
        hint: '對角所對應的圓弧合計恰好是整圓 360 度。',
        explanation: '圓周角度數為所對弧度的一半，整圓弧為 360°，故兩對角之和為 180°（互補）。',
      },
      {
        id: 'g9-geo-02',
        grade: 9,
        concept: 'geometry',
        prompt: '若同一個圓中，同弧所對的圓心角為 80°，則其所對的圓周角為多少度？',
        choices: ['160°', '80°', '40°', '20°'],
        answer: 2,
        hint: '圓周角是所對弧度數（或圓心角）的一半。',
        explanation: '圓周角 = 圓心角 ÷ 2 = 80° ÷ 2 = 40°。',
      },
    ],
  },

  // 綜合大樓圖書館：邏輯推理挑戰
  'challenge-library-research': {
    id: 'challenge-library-research',
    title: '樂活圖書館：資訊檢索與邏輯推理',
    roomName: '樂活圖書館 1F 閱覽區',
    grade: 'general',
    concept: 'logic-reasoning',
    conceptTitle: '數理邏輯與資訊辨識',
    questions: [
      {
        id: 'lib-01',
        grade: 7,
        concept: 'logic',
        prompt: '圖書館索書號按照小數點排序，下列何者排列由小到大完全正確？',
        choices: [
          '310.2, 310.15, 310.3',
          '310.15, 310.2, 310.25',
          '310.25, 310.2, 310.15',
          '310.3, 310.2, 310.1',
        ],
        answer: 1,
        hint: '比較十分位與百分位：0.15 < 0.20 < 0.25。',
        explanation: '310.15 < 310.20 < 310.25，依序由小到大。',
      },
    ],
  },

  // 行政大樓：校園統計數據分析
  'challenge-admin-stats': {
    id: 'challenge-admin-stats',
    title: '行政大樓：大溪校園數據統計挑戰',
    roomName: '行政大樓 1F 處室大廳',
    grade: 'general',
    concept: 'data-statistics',
    conceptTitle: '平均數與統計圖表判讀',
    questions: [
      {
        id: 'admin-01',
        grade: 7,
        concept: 'statistics',
        prompt: '七年級 4 個班的人數分別為 28, 30, 31, 31 人，這 4 班的平均人數為多少？',
        choices: ['29 人', '30 人', '31 人', '30.5 人'],
        answer: 1,
        hint: '(28 + 30 + 31 + 31) ÷ 4。',
        explanation: '總人數 = 120 人，120 ÷ 4 = 30 人。',
      },
    ],
  },

  // 幼兒園 / 健康中心彩蛋：國小基礎加法與湊十法速算
  'easter-egg-kindergarten-blocks': {
    id: 'easter-egg-kindergarten-blocks',
    title: '幼兒園小積木彩蛋：國小趣味加法與湊十法速算',
    roomName: '非營利幼兒園 / 積木空間',
    grade: 'general',
    concept: 'addition-blocks',
    conceptTitle: '國小加法與湊十速算法',
    isEasterEgg: true,
    easterEggBadge: '🧩 速算小神童 (Mental Math Prodigy)',
    questions: [
      {
        id: 'blocks-add-01',
        grade: 7,
        concept: 'arithmetic',
        prompt: '【湊十法速算】8 + 7 等於多少？（試著將 7 拆成 2 和 5，8 + 2 = 10）',
        choices: ['13', '14', '15', '16'],
        answer: 2,
        hint: '8 差 2 就湊成 10，10 + 5 = 15。',
        explanation: '8 + 7 = 8 + (2 + 5) = (8 + 2) + 5 = 10 + 5 = 15！',
      },
      {
        id: 'blocks-add-02',
        grade: 7,
        concept: 'arithmetic',
        prompt: '【二位數速算】28 + 15 的值為何？',
        choices: ['41', '43', '45', '53'],
        answer: 1,
        hint: '28 + 2 = 30，30 + 13 = 43。',
        explanation: '28 + 15 = 28 + (2 + 13) = 30 + 13 = 43！',
      },
      {
        id: 'blocks-add-03',
        grade: 7,
        concept: 'arithmetic',
        prompt: '【百位數湊整】98 + 47 的值為何？',
        choices: ['135', '145', '147', '155'],
        answer: 1,
        hint: '98 + 2 = 100，100 + 45 = 145。',
        explanation: '98 + 47 = (98 + 2) + (47 - 2) = 100 + 45 = 145！',
      },
    ],
  },

  // 健康中心心率與BMI數值加總速算法
  'easter-egg-health-addition': {
    id: 'easter-egg-health-addition',
    title: '健康中心彩蛋：體適能數值與心率加總速算',
    roomName: '健康中心 ✙',
    grade: 'general',
    concept: 'health-addition',
    conceptTitle: '心率與健康數值加總',
    isEasterEgg: true,
    easterEggBadge: '🩺 心算達人 (Heartbeat Calc Master)',
    questions: [
      {
        id: 'health-add-01',
        grade: 7,
        concept: 'arithmetic',
        prompt: '運動前後的心率分別為 72 下與 128 下，兩次測量的心率總和為多少？',
        choices: ['190', '200', '210', '220'],
        answer: 1,
        hint: '72 + 128 = (70 + 120) + (2 + 8) = 190 + 10。',
        explanation: '72 + 128 = 200 下。',
      },
      {
        id: 'health-add-02',
        grade: 7,
        concept: 'arithmetic',
        prompt: '健康檢查量測身高體重，兩位同學的身高分別為 158 公分與 164 公分，身高總和是多少？',
        choices: ['312 公分', '322 公分', '320 公分', '332 公分'],
        answer: 1,
        hint: '158 + 164 = 158 + 2 + 162 = 160 + 162。',
        explanation: '158 + 164 = 322 公分。',
      },
    ],
  },

  // 桌遊教室：數學益智博弈
  'easter-egg-boardgame-math': {
    id: 'easter-egg-boardgame-math',
    title: '桌遊教室彩蛋：骰子機率與棋盤博弈推理',
    roomName: '桌遊思考教室 🎲',
    grade: 'general',
    concept: 'boardgame-logic',
    conceptTitle: '骰子與棋盤最佳策略',
    isEasterEgg: true,
    easterEggBadge: '🎲 桌遊智多星 (Boardgame Strategist)',
    questions: [
      {
        id: 'bg-01',
        grade: 8,
        concept: 'probability',
        prompt: '同時擲兩顆公正骰子，點數和為 7 的機率是多少？',
        choices: ['1/6', '1/12', '7/36', '5/36'],
        answer: 0,
        hint: '點數和為 7 的組合有 (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) 共 6 種。',
        explanation: '兩顆骰子共有 36 種組合，和為 7 的情形有 6 種，機率 = 6/36 = 1/6。',
      },
    ],
  },

  // 707 教室：一元一次方程式與移項法則
  'challenge-g7-07': {
    id: 'challenge-g7-07',
    title: '707 教室：一元一次方程式與移項法則',
    roomName: '707 一元一次方程式教室',
    grade: 7,
    concept: 'linear-equation',
    conceptTitle: '等量公理與移項變號法則',
    questions: [
      {
        id: 'g7-eq-01',
        grade: 7,
        concept: 'linear-equation',
        prompt: '解一元一次方程式 3x - 5 = 16，其解 x 的值為何？',
        choices: ['x = 7', 'x = 11/3', 'x = 9', 'x = 3'],
        answer: 0,
        hint: '將 -5 移項到等號右邊變為 +5，得 3x = 16 + 5 = 21。',
        explanation: '移項本質為等量公理：3x = 16 + 5 = 21，兩邊同除以 3 得 x = 7。迷思概念說明：移項時常忘記「變號」，誤算為 3x = 11。',
      },
      {
        id: 'g7-eq-02',
        grade: 7,
        concept: 'linear-equation',
        prompt: '解方程式 2(x - 3) = 4 - x，求 x 的值：',
        choices: ['x = 10/3', 'x = 2', 'x = 7/3', 'x = -2'],
        answer: 0,
        hint: '先以乘法分配律展開左側括號：2x - 6 = 4 - x。',
        explanation: '展開得 2x - 6 = 4 - x，移項整理得 2x + x = 4 + 6 => 3x = 10，故 x = 10/3。迷思概念說明：去括號時常漏乘第二項（誤寫為 2x - 3）。',
      },
      {
        id: 'g7-eq-03',
        grade: 7,
        concept: 'linear-equation',
        prompt: '大溪國中學生在合作社買了 3 瓶鮮奶，每瓶 x 元，付了 200 元鈔票，找回 65 元。依題意列出一元一次方程式並求解 x：',
        choices: ['200 - 3x = 65，x = 45', '3x - 65 = 200，x = 88', '200 + 3x = 65，x = 45', '3x = 200 + 65，x = 85'],
        answer: 0,
        hint: '付款金額 (200) 扣除商品總花費 (3x) 等於找零 (65)。',
        explanation: '方程式為 200 - 3x = 65 => 3x = 135 => x = 45 元。迷思概念說明：找零情境常將被減數與減數顛倒，誤列成 3x - 200 = 65。',
      },
    ],
  },

  // 801 教室：平方根概念與最簡根式化簡
  'challenge-g8-01': {
    id: 'challenge-g8-01',
    title: '801 教室：平方根化簡與最簡根式',
    roomName: '801 平方根研究室',
    grade: 8,
    concept: 'square-root',
    conceptTitle: '平方根運算與最簡根式',
    questions: [
      {
        id: 'g8-sqrt-01',
        grade: 8,
        concept: 'square-root',
        prompt: '將根式 √72 化為最簡根式，其結果為何？',
        choices: ['6√2', '3√8', '2√18', '8√2'],
        answer: 0,
        hint: '將 72 質因數分解：72 = 36 × 2 = 6² × 2。',
        explanation: '√72 = √(36 × 2) = 6√2。迷思概念說明：3√8 雖然數值相等，但根號內仍包含平方因數 4，不符合最簡根式要求。',
      },
      {
        id: 'g8-sqrt-02',
        grade: 8,
        concept: 'square-root',
        prompt: '若某數 x 滿足 x² = 25，則 x 的值為何？',
        choices: ['±5 (5 或 -5)', '只有 5', '只有 -5', '√5'],
        answer: 0,
        hint: '注意負數的平方也是正數：(-5)² = 25。',
        explanation: '因為 5² = 25 且 (-5)² = 25，故 25 的平方根有正負兩個：±5。迷思概念說明：注意區分「25 的正平方根 √25 = 5」與「x² = 25 之解為 ±5」。',
      },
    ],
  },

  // 802 教室：畢氏定理幾何驗證
  'challenge-g8-02': {
    id: 'challenge-g8-02',
    title: '802 教室：畢氏定理與直角三角形計算',
    roomName: '802 畢氏幾何研究室',
    grade: 8,
    concept: 'pythagorean-theorem',
    conceptTitle: '畢氏定理與三邊長關係',
    questions: [
      {
        id: 'g8-pyth-01',
        grade: 8,
        concept: 'pythagorean-theorem',
        prompt: '直角三角形的兩股長度分別為 5 與 12，則其斜邊長度為多少？',
        choices: ['13', '17', '15', '√119'],
        answer: 0,
        hint: '利用畢氏定理：斜邊長 c = √(a² + b²)。',
        explanation: 'c = √(5² + 12²) = √(25 + 144) = √169 = 13。迷思概念說明：不可將兩股直接相加（5 + 12 = 17 是常見直覺迷思）。',
      },
      {
        id: 'g8-pyth-02',
        grade: 8,
        concept: 'pythagorean-theorem',
        prompt: '下列各組數字中，哪一組「可以」作為直角三角形的三邊長？',
        choices: ['6, 8, 10', '4, 5, 6', '5, 12, 14', '7, 24, 26'],
        answer: 0,
        hint: '驗證較小兩邊平方和是否等於最大邊平方。',
        explanation: '6² + 8² = 36 + 64 = 100 = 10²，合乎畢氏定理。迷思概念說明：常有同學將常見直角三角形三邊組 7, 24, 25 誤背成 7, 24, 26。',
      },
    ],
  },

  // 803 教室：多項式長除法與乘法公式
  'challenge-g8-03': {
    id: 'challenge-g8-03',
    title: '803 教室：多項式長除法與乘法公式',
    roomName: '803 多項式運算研究室',
    grade: 8,
    concept: 'polynomial-division',
    conceptTitle: '多項式四則與長除法',
    questions: [
      {
        id: 'g8-poly-01',
        grade: 8,
        concept: 'polynomial',
        prompt: '計算多項式除法 (2x² + 7x + 5) ÷ (2x + 1)，其商式與餘式分別為何？',
        choices: ['商式為 x + 3，餘式為 2', '商式為 x + 2，餘式為 3', '商式為 2x + 3，餘式為 0', '商式為 x + 3，餘式為 -2'],
        answer: 0,
        hint: '利用長除法：最高次項對齊，2x² ÷ 2x = x。',
        explanation: '(2x² + 7x + 5) = (2x + 1)(x + 3) + 2，商式為 x + 3，餘式為 2。迷思概念說明：長除法上下相減時正負號常弄錯，注意 (7x - x) 與 (5 - 3)。',
      },
      {
        id: 'g8-poly-02',
        grade: 8,
        concept: 'algebra',
        prompt: '將 (2x - 3)² 展開後的結果為何？',
        choices: ['4x² - 12x + 9', '4x² - 9', '4x² + 12x + 9', '4x² - 6x + 9'],
        answer: 0,
        hint: '利用差平方公式：(a - b)² = a² - 2ab + b²。',
        explanation: '(2x - 3)² = (2x)² - 2(2x)(3) + 3² = 4x² - 12x + 9。迷思概念說明：最典型迷思是寫成 4x² - 9，遺漏中間交叉項 -2ab。',
      },
    ],
  },

  // 804 教室：平方差公式與數字巧算
  'challenge-g8-04': {
    id: 'challenge-g8-04',
    title: '804 教室：平方差乘法公式與數字巧算',
    roomName: '804 乘法公式專科教室',
    grade: 8,
    concept: 'multiplication-formulas',
    conceptTitle: '平方差公式與因式分解展開',
    questions: [
      {
        id: 'g8-diff-01',
        grade: 8,
        concept: 'algebra',
        prompt: '利用乘法公式巧算 103 × 97，下列哪一個式子與計算結果完全正確？',
        choices: ['(100 + 3)(100 - 3) = 10000 - 9 = 9991', '(100 + 3)(100 - 3) = 10000 - 6 = 9994', '(100 + 3)² - 97² = 9991', '100² - 3 = 9997'],
        answer: 0,
        hint: '以 100 為基準：103 = 100 + 3, 97 = 100 - 3，套用 (a+b)(a-b) = a² - b²。',
        explanation: '(100 + 3)(100 - 3) = 100² - 3² = 10000 - 9 = 9991。迷思概念說明：平方差減去的是 3² = 9，而非 2 × 3 = 6。',
      },
    ],
  },

  // 805 教室：一元二次方程式公式解與因式分解
  'challenge-g8-05': {
    id: 'challenge-g8-05',
    title: '805 教室：一元二次方程式求解與判別式',
    roomName: '805 一元二次方程式教室',
    grade: 8,
    concept: 'quadratic-equation',
    conceptTitle: '十字交乘法與根的判別式',
    questions: [
      {
        id: 'g8-quad-01',
        grade: 8,
        concept: 'quadratic-equation',
        prompt: '解一元二次方程式 x² - 5x + 6 = 0，其兩根為何？',
        choices: ['x = 2 或 x = 3', 'x = -2 或 x = -3', 'x = 1 或 x = 6', 'x = -1 或 x = -6'],
        answer: 0,
        hint: '十字交乘拆解常數項 6：(-2) × (-3) = 6，且 (-2) + (-3) = -5。',
        explanation: '(x - 2)(x - 3) = 0，故 x = 2 或 x = 3。迷思概念說明：由因式 (x - 2) 得到根為 +2，常有同學粗心填成相反數 -2。',
      },
      {
        id: 'g8-quad-02',
        grade: 8,
        concept: 'quadratic-equation',
        prompt: '關於一元二次方程式 x² - 4x + 4 = 0 的根，下列何者敘述正確？',
        choices: ['有兩相等實根（重根，x = 2）', '有兩相異實根（x = 2 或 -2）', '無實數根', '只有單一根 x = 4'],
        answer: 0,
        hint: '計算判別式 D = b² - 4ac，或將左式因式分解成完全平方式。',
        explanation: 'x² - 4x + 4 = (x - 2)² = 0，故有兩相等實根 x = 2。判別式 D = (-4)² - 4(1)(4) = 0。迷思概念說明：重根在幾何上代表拋物線與 x 軸相切於一點。',
      },
    ],
  },

  // 901 教室：二次函數極值與圖形平移
  'challenge-g9-01': {
    id: 'challenge-g9-01',
    title: '901 教室：二次函數圖形平移與頂點極值',
    roomName: '901 二次函數研究室',
    grade: 9,
    concept: 'quadratic-function-extrema',
    conceptTitle: '頂點坐標、開口方向與極值',
    questions: [
      {
        id: 'g9-func-01',
        grade: 9,
        concept: 'functions',
        prompt: '二次函數 y = -2(x - 3)² + 8，當 x 為何值時有極值？極值為多少？',
        choices: ['當 x = 3 時，有最大值 8', '當 x = 3 時，有最小值 8', '當 x = -3 時，有最大值 8', '當 x = -3 時，有最小值 -8'],
        answer: 0,
        hint: '觀察 a = -2 < 0 開口向下（有最高點），頂點為 (h, k)。',
        explanation: '開口向下有最大值，頂點為 (3, 8)，故當 x = 3 時有最大值 8。迷思概念說明：括號內為 (x - 3)，頂點 x 坐標為 +3，常有同學誤填為 -3。',
      },
      {
        id: 'g9-func-02',
        grade: 9,
        concept: 'functions',
        prompt: '將二次函數 y = x² 的圖形向右平移 2 單位、再向上平移 5 單位，所得之新函數為何？',
        choices: ['y = (x - 2)² + 5', 'y = (x + 2)² + 5', 'y = (x - 2)² - 5', 'y = (x + 2)² - 5'],
        answer: 0,
        hint: '自變數平移口訣：左加右減；常數項平移口訣：上加下減。',
        explanation: '向右平移 2 單位將 x 代為 (x - 2)，向上平移 5 單位加 5，得 y = (x - 2)² + 5。迷思概念說明：向右平移常被直覺誤當成 (x + 2)。',
      },
    ],
  },

  // 902 教室：統計抽樣與四分位數盒狀圖
  'challenge-g9-02': {
    id: 'challenge-g9-02',
    title: '902 教室：統計抽樣、四分位數與盒狀圖',
    roomName: '902 統計分析研究室',
    grade: 9,
    concept: 'statistics-sampling',
    conceptTitle: '四分位數、四分位距與盒狀圖判讀',
    questions: [
      {
        id: 'g9-stat-01',
        grade: 9,
        concept: 'statistics',
        prompt: '某次模擬考盒狀圖中，第三四分位數 Q3 = 75 分，第一四分位數 Q1 = 45 分，則其四分位距 (IQR) 為多少？',
        choices: ['30 分', '60 分', '120 分', '15 分'],
        answer: 0,
        hint: '四分位距 IQR 定義為 Q3 - Q1。',
        explanation: 'IQR = Q3 - Q1 = 75 - 45 = 30 分。四分位距表示中間 50% 成績之分散程度，不易受離群值干擾。',
      },
    ],
  },

  // 903 教室：機率與樹狀圖分析
  'challenge-g9-03': {
    id: 'challenge-g9-03',
    title: '903 教室：古典機率與不重複抽樣',
    roomName: '903 機率與決策研究室',
    grade: 9,
    concept: 'probability-tree',
    conceptTitle: '古典機率理論與樣本空間',
    questions: [
      {
        id: 'g9-prob-01',
        grade: 9,
        concept: 'probability',
        prompt: '摸彩箱中裝有 3 顆紅球與 2 顆綠球，每顆球被抽中機率均等。隨機抽出一球，抽到紅球的機率為何？',
        choices: ['3/5 (60%)', '3/2 (150%)', '2/5 (40%)', '1/3 (約 33.3%)'],
        answer: 0,
        hint: '機率 = 符合事件數 ÷ 總樣本數 (3 + 2 = 5)。',
        explanation: '總球數為 5，紅球為 3，機率 = 3/5。迷思概念說明：機率絕不會大於 1，千萬不能拿紅綠球之比 3:2 當成機率！',
      },
    ],
  },

  // 906 教室：相似形與平行線截比例線段
  'challenge-g9-06': {
    id: 'challenge-g9-06',
    title: '906 教室：相似三角形與平行線比例線段',
    roomName: '906 相似形幾何研究室',
    grade: 9,
    concept: 'similar-triangles',
    conceptTitle: '相似多邊形性質與邊長面積比',
    questions: [
      {
        id: 'g9-sim-01',
        grade: 9,
        concept: 'geometry',
        prompt: '兩個相似多邊形的對應邊長比為 2 : 3，則其對應面積比為何？',
        choices: ['4 : 9', '2 : 3', '8 : 27', '√2 : √3'],
        answer: 0,
        hint: '相似形周長比等於邊長比，但面積比等於「邊長的平方比」。',
        explanation: '面積為二維度量，相似形的面積比為對應邊長的平方比：2² : 3² = 4 : 9。迷思概念說明：最常見迷思為誤將邊長比 2:3 直接當作面積比。',
      },
      {
        id: 'g9-sim-02',
        grade: 9,
        concept: 'geometry',
        prompt: '在 △ABC 中，D、E 分別在 AB 與 AC 上，且 DE // BC。若 AD = 3，DB = 2，DE = 6，則 BC 的長度為多少？',
        choices: ['10', '9', '4', '8'],
        answer: 0,
        hint: '注意全邊長 AB = AD + DB = 3 + 2 = 5，由 △ADE ~ △ABC 邊長成比例求得。',
        explanation: 'AD / AB = 3 / (3 + 2) = 3/5。因為 △ADE ~ △ABC，所以 DE / BC = 3/5 => 6 / BC = 3/5 => BC = 10。迷思概念說明：常見錯誤為直接以 AD / DB = 3/2 來推算 DE / BC，導致算出 BC = 4。',
      },
    ],
  },

  // 學生活動中心：會考最終戰跨單元三年總複習大戰 (The Grand Arena)
  'challenge-grand-arena': {
    id: 'challenge-grand-arena',
    title: '會考最終戰：跨單元三年總複習巔峰擂台',
    roomName: '學生活動中心・會考大擂台 The Grand Arena',
    grade: 'general',
    concept: 'capstone-comprehensive-math',
    conceptTitle: '國中三年數學跨單元總合戰',
    isEasterEgg: true,
    easterEggBadge: '🏆 會考數學大宗師 (Grandmaster of Junior Math)',
    questions: [
      {
        id: 'arena-01',
        grade: 7,
        concept: 'integer-exponent',
        prompt: '【七年級跨單元運算】計算 |-8| - (-3) × 2 + (-4)² ÷ 8 之值為何？',
        choices: ['16', '12', '4', '-2'],
        answer: 0,
        hint: '先算絕對值與乘方：|-8| = 8，(-4)² = 16，再先乘除後加減。',
        explanation: '|-8| = 8；(-3) × 2 = -6；(-4)² ÷ 8 = 16 ÷ 8 = 2。原式 = 8 - (-6) + 2 = 8 + 6 + 2 = 16。',
      },
      {
        id: 'arena-02',
        grade: 8,
        concept: 'pythagorean-algebra',
        prompt: '【八年級幾何代數跨單元】直角三角形三邊長為連續偶數 2n, 2n+2, 2n+4，且斜邊為 2n+4。求此直角三角形之三邊長？',
        choices: ['6, 8, 10', '4, 6, 8', '8, 10, 12', '10, 12, 14'],
        answer: 0,
        hint: '利用畢氏定理 (2n)² + (2n+2)² = (2n+4)²，或回想最著名的 3:4:5 放大直角三角形。',
        explanation: '6² + 8² = 36 + 64 = 100 = 10²，且 6, 8, 10 為連續偶數，滿足直角三角形三邊條件。',
      },
      {
        id: 'arena-03',
        grade: 9,
        concept: 'functions-geometry',
        prompt: '【九年級函數幾何素養】大溪武德殿前設立一拋物線拱門，頂點坐標為 (0, 4)，通過地面兩支點 (-4, 0) 與 (4, 0)。此二次函數關係式為何？',
        choices: ['y = -1/4 x² + 4', 'y = -1/2 x² + 4', 'y = -x² + 4', 'y = 1/4 x² + 4'],
        answer: 0,
        hint: '頂點在 (0, 4)，設 y = ax² + 4，將 (4, 0) 代入求開口係數 a。',
        explanation: '代入 (4, 0)：0 = a(4)² + 4 => 16a = -4 => a = -1/4，關係式為 y = -1/4 x² + 4。',
      },
      {
        id: 'arena-04',
        grade: 9,
        concept: 'modeling-application',
        prompt: '【會考生活情境題】大溪老街豆干每包定價 x 元。店慶特惠「買 3 包打八折，結帳再折抵 20 元抵用券，實付 220 元」。求豆干每包原價 x 為多少元？',
        choices: ['100 元', '90 元', '110 元', '120 元'],
        answer: 0,
        hint: '買 3 包打八折總價為 3x × 0.8 = 2.4x，扣除 20 元抵用券等於 220 元。',
        explanation: '2.4x - 20 = 220 => 2.4x = 240 => x = 100 元。',
      },
    ],
  },
};

// Aliases for multi-building classroom challenge IDs
CLASSROOM_CHALLENGES['easter-egg-kindergarten-multiplication'] = CLASSROOM_CHALLENGES['challenge-multiplication-easter'];
CLASSROOM_CHALLENGES['easter-egg-coop-change'] = CLASSROOM_CHALLENGES['challenge-coop-speed-math'];
CLASSROOM_CHALLENGES['challenge-g7-06'] = CLASSROOM_CHALLENGES['challenge-prime-hunter'];
CLASSROOM_CHALLENGES['challenge-admin-academic'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-multi-library'] = CLASSROOM_CHALLENGES['challenge-library-research'];
CLASSROOM_CHALLENGES['challenge-g9-07'] = CLASSROOM_CHALLENGES['challenge-g9-geometry'];
CLASSROOM_CHALLENGES['challenge-arena-stage'] = CLASSROOM_CHALLENGES['challenge-grand-arena'];
CLASSROOM_CHALLENGES['challenge-arena-stands'] = CLASSROOM_CHALLENGES['challenge-grand-arena'];
CLASSROOM_CHALLENGES['challenge-g9-algebra'] = CLASSROOM_CHALLENGES['challenge-grand-arena'];
CLASSROOM_CHALLENGES['challenge-g8-geometry'] = CLASSROOM_CHALLENGES['challenge-g8-02'];

// Additional general aliases so all rooms have functional challenges
CLASSROOM_CHALLENGES['challenge-g7-01'] = CLASSROOM_CHALLENGES['challenge-g7-math'];
CLASSROOM_CHALLENGES['challenge-g7-02'] = CLASSROOM_CHALLENGES['challenge-g7-math'];
CLASSROOM_CHALLENGES['challenge-g7-03'] = CLASSROOM_CHALLENGES['challenge-g7-math'];
CLASSROOM_CHALLENGES['challenge-g7-09'] = CLASSROOM_CHALLENGES['challenge-g7-math'];
CLASSROOM_CHALLENGES['challenge-g7-office'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-g7-pta'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-g7-union'] = CLASSROOM_CHALLENGES['challenge-g7-math'];
CLASSROOM_CHALLENGES['challenge-g8-06'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-g8-07'] = CLASSROOM_CHALLENGES['challenge-g8-05'];
CLASSROOM_CHALLENGES['challenge-g8-08'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-g8-09'] = CLASSROOM_CHALLENGES['challenge-g9-01'];
CLASSROOM_CHALLENGES['challenge-g8-woodcraft'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-g9-04'] = CLASSROOM_CHALLENGES['challenge-g9-07'];
CLASSROOM_CHALLENGES['challenge-g9-05'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-g9-08'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-g9-clubs'] = CLASSROOM_CHALLENGES['challenge-g9-02'];
CLASSROOM_CHALLENGES['challenge-science-lab-1'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-science-lab-2'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-tech-maker'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-tech-digital'] = CLASSROOM_CHALLENGES['challenge-library-research'];
CLASSROOM_CHALLENGES['challenge-tech-av'] = CLASSROOM_CHALLENGES['challenge-library-research'];
CLASSROOM_CHALLENGES['challenge-tech-living-1'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-tech-living-2'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-art-fitness'] = CLASSROOM_CHALLENGES['easter-egg-health-addition'];
CLASSROOM_CHALLENGES['challenge-art-music'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-art-visual'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
CLASSROOM_CHALLENGES['challenge-multi-history'] = CLASSROOM_CHALLENGES['challenge-library-research'];
CLASSROOM_CHALLENGES['challenge-multi-cooking'] = CLASSROOM_CHALLENGES['challenge-coop-speed-math'];
CLASSROOM_CHALLENGES['challenge-multi-special'] = CLASSROOM_CHALLENGES['easter-egg-kindergarten-blocks'];
CLASSROOM_CHALLENGES['challenge-multi-computer'] = CLASSROOM_CHALLENGES['challenge-library-research'];
CLASSROOM_CHALLENGES['challenge-multi-server'] = CLASSROOM_CHALLENGES['challenge-library-research'];
CLASSROOM_CHALLENGES['challenge-admin-teachers'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-counseling'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-principal'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-general'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-hr'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-accounting'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-lang'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-faculty'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-admin-seminar'] = CLASSROOM_CHALLENGES['challenge-admin-stats'];
CLASSROOM_CHALLENGES['challenge-g8-arts'] = CLASSROOM_CHALLENGES['challenge-g8-02'];
// 大溪國中 80 週年校慶特別紀念彩蛋關卡
CLASSROOM_CHALLENGES['challenge-daxi-80th'] = {
  id: 'challenge-daxi-80th',
  title: '大溪國中 80 週年校慶：時光紀念問答',
  roomName: '80 週年時光石碑',
  grade: 'general',
  concept: 'daxi-history-80th',
  conceptTitle: '創校甲子又廿：八十載榮耀回顧',
  isEasterEgg: true,
  easterEggBadge: '🏛️ 大溪國中 80 週年榮譽校友',
  questions: [
    {
      id: 'daxi-80-01',
      grade: 7,
      concept: 'history',
      prompt: '大溪國中創立於民國 35 年（西元 1946 年），到今年慶祝幾週年校慶？',
      choices: ['60 週年', '70 週年', '80 週年', '100 週年'],
      answer: 2,
      hint: '回顧溪中自 1946 年創立至今的八十年歲月！',
      explanation: '大溪國中於民國 35 年（1946年）創校，走過整整八十載光輝歲月，歡度 80 週年校慶！',
    },
    {
      id: 'daxi-80-02',
      grade: 7,
      concept: 'math-culture',
      prompt: '【溪中數學趣味】若八十週年以「十進位」與「倍數」計算，80 的最大質因數是多少？',
      choices: ['2', '5', '8', '10'],
      answer: 1,
      hint: '將 80 質因數分解：80 = 2⁴ × 5。',
      explanation: '80 = 16 × 5 = 2⁴ × 5，因此 80 的最大質因數是 5！',
    },
    {
      id: 'daxi-80-03',
      grade: 7,
      concept: 'heritage',
      prompt: '大溪國中依傍著名的大漢溪與大溪老街，校訓精神注重敦品勵學。校慶之際，師生最引以為傲的是？',
      choices: ['只重視考試成績', '文武兼備、多元展能與傳承溪中精神', '不需要自主學習', '停止所有社團活動'],
      answer: 1,
      hint: '溪中全人教育與科技未來願景。',
      explanation: '大溪國中培育無數社會棟樑，以「文武兼備、多元適性、傳承與創新」共同邁向光榮 80 週年！',
    },
  ],
};

export function getChallengeById(id: string): ClassroomChallenge | undefined {
  return CLASSROOM_CHALLENGES[id];
}


