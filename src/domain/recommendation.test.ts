import { expect, it } from 'vitest';
import { recommendNextStep } from './recommendation';

it('recommends review when a concept has an incorrect attempt or hint use', () => {
  expect(recommendNextStep([
    { questionId: 'a', concept: 'integer', correct: false, usedHint: true },
    { questionId: 'a', concept: 'integer', correct: true, usedHint: true },
  ])).toEqual({
    kind: 'review',
    concept: 'integer',
    title: '建議先複習整數運算',
  });
});

it('recommends the next route when all attempts are correct without hints', () => {
  expect(recommendNextStep([
    { questionId: 'a', concept: 'integer', correct: true, usedHint: false },
  ])).toEqual({
    kind: 'advance',
    title: '可以挑戰下一個數學任務',
  });
});
