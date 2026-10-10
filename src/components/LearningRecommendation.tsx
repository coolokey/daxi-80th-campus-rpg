import { recommendNextStep } from '../domain/recommendation';
import type { LearningEvent } from '../types/game';

export function LearningRecommendation({ events }: { events: LearningEvent[] }) {
  const recommendation = recommendNextStep(events);
  const description = recommendation.kind === 'review'
    ? '先以短題組回顧這個概念，再回到主線任務。'
    : '本章概念已穩定，可前往下一個解鎖區域。';
  return <section aria-label="適性任務建議" className="learning-recommendation"><p className="eyebrow">學習助教原型</p><h2>適性任務建議</h2><h3>{recommendation.title}</h3><p>{description}</p><p className="prototype-note">本機規則原型，尚未串接生成式 AI。</p></section>;
}
