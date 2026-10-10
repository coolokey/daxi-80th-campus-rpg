import type { Concept, LearningEvent } from '../types/game';

export type ConceptSummary = {
  concept: Concept;
  attempts: number;
  correct: number;
  hintUses: number;
};

export function summarizeByConcept(events: LearningEvent[]): ConceptSummary[] {
  return Object.values(events.reduce<Record<string, ConceptSummary>>((all, event) => {
    const item = all[event.concept] ?? {
      concept: event.concept,
      attempts: 0,
      correct: 0,
      hintUses: 0,
    };
    item.attempts += 1;
    item.correct += Number(event.correct);
    item.hintUses += Number(event.usedHint);
    all[event.concept] = item;
    return all;
  }, {}));
}
