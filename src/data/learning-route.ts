export type RouteStage = {
  id: string;
  title: string;
  detail: string;
  status: 'active' | 'planned' | 'final';
};

export const learningRoute: RouteStage[] = [
  {
    id: 'grade-7',
    title: '七年級：數與數線',
    detail: '正負數、指數記法與質因數分解，建立任務解題的基礎能量。',
    status: 'active',
  },
  {
    id: 'grade-8',
    title: '八年級：多項式與乘法公式',
    detail: '從代數運算、平方根到畢氏定理，解鎖校園研究區。',
    status: 'planned',
  },
  {
    id: 'grade-9',
    title: '九年級：二次函數',
    detail: '連結函數圖形、統計機率與立體圖形，準備畢業挑戰。',
    status: 'planned',
  },
  {
    id: 'final-review',
    title: '能源核心總複習',
    detail: '依概念表現挑選跨年級原創任務，完成校園最終校準。',
    status: 'final',
  },
];
