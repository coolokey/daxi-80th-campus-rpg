import { summarizeByConcept } from '../domain/progress';
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

export function TeacherSummary({ events }: { events: LearningEvent[] }) {
  const summaries = summarizeByConcept(events);
  return <section aria-label="教師摘要" className="teacher-summary"><p className="eyebrow">匿名學習事件彙整</p><h2>教師摘要</h2><p>本畫面只提供概念層級彙整，不包含可識別的個人資料。</p><div className="summary-grid">{summaries.map((item) => <article key={item.concept} className="summary-card"><h3>{conceptNames[item.concept] ?? item.concept}</h3><p>正確 {item.correct} / {item.attempts}</p><p>提示使用 {item.hintUses}</p></article>)}</div></section>;
}
