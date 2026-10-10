import { summarizeByConcept } from './progress';
import type { Concept, LearningEvent } from '../types/game';

const conceptNames: Record<string, string> = {
  integer: '整數運算',
  exponent: '指數記法',
  factor: '因數與倍數',
  prime: '質因數分解',
  arithmetic: '基礎四則速算',
  algebra: '乘法公式與代數',
  geometry: '幾何推導證明',
  logic: '數理邏輯推理',
  statistics: '校園數據統計',
  probability: '機率運算',
};

export type Recommendation =
  | { kind: 'review'; concept: Concept; title: string }
  | { kind: 'advance'; title: string };

export function recommendNextStep(events: LearningEvent[]): Recommendation {
  const review = summarizeByConcept(events).find((item) => item.correct < item.attempts || item.hintUses > 0);
  if (review) {
    const conceptName = conceptNames[review.concept] ?? review.concept;
    return { kind: 'review', concept: review.concept, title: `建議先複習${conceptName}` };
  }
  return { kind: 'advance', title: '可以挑戰下一個數學任務' };
}
