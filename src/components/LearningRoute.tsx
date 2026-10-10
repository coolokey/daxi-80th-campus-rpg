import { learningRoute } from '../data/learning-route';

const statusLabel = { active: '目前可玩', planned: '規劃中', final: '最終挑戰' } as const;

export function LearningRoute() {
  return <section aria-label="三年數學任務航線" className="learning-route"><div><p className="eyebrow">依教材單元設計</p><h2>三年數學任務航線</h2></div><ol>{learningRoute.map((stage) => <li key={stage.id} className={`route-card route-card--${stage.status}`}><span className="route-status">{statusLabel[stage.status]}</span><h3>{stage.title}</h3><p>{stage.detail}</p></li>)}</ol></section>;
}
