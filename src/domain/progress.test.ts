import { expect, it } from 'vitest';
import { summarizeByConcept } from './progress';

it('groups learner events by concept', () => {
  expect(summarizeByConcept([
    { questionId: 'a', concept: 'integer', correct: true, usedHint: false },
    { questionId: 'b', concept: 'integer', correct: false, usedHint: true },
  ])).toEqual([{ concept: 'integer', attempts: 2, correct: 1, hintUses: 1 }]);
});
