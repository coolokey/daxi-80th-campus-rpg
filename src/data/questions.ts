import type { ChoiceQuestion } from '../types/game';

export const firstQuestQuestions: ChoiceQuestion[] = [
  {
    id: 'g7-int-01', grade: 7, concept: 'integer',
    prompt: '地下 3 層記為 -3，地上 5 層記為 5，兩者相差幾層？',
    choices: ['2', '5', '8', '-8'], answer: 2,
    hint: '以數線想像從 -3 走到 5。',
    explanation: '5 - (-3) = 8，所以相差 8 層。',
  },
  {
    id: 'g7-int-02', grade: 7, concept: 'integer',
    prompt: '-7 + 12 的值為何？', choices: ['-19', '-5', '5', '19'], answer: 2,
    hint: '先比較正負數的絕對值。',
    explanation: '12 的絕對值較大，12 - 7 = 5。',
  },
  {
    id: 'g7-exp-01', grade: 7, concept: 'exponent',
    prompt: '2 的 4 次方是多少？', choices: ['6', '8', '16', '32'], answer: 2,
    hint: '將 2 連乘 4 次。', explanation: '2 × 2 × 2 × 2 = 16。',
  },
  {
    id: 'g7-exp-02', grade: 7, concept: 'exponent',
    prompt: '下列何者等於 3³？', choices: ['3 + 3 + 3', '3 × 3 × 3', '3 × 3', '9 × 3 × 3'], answer: 1,
    hint: '次方表示相同底數連乘。', explanation: '3³ 表示 3 × 3 × 3。',
  },
  {
    id: 'g7-factor-01', grade: 7, concept: 'factor',
    prompt: '下列哪一個是 18 的因數？', choices: ['5', '6', '7', '8'], answer: 1,
    hint: '能整除 18 的數才是因數。', explanation: '18 ÷ 6 = 3，沒有餘數。',
  },
];
