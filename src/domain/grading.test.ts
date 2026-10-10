import { describe, expect, it } from 'vitest';
import { firstQuestQuestions } from '../data/questions';
import { gradeChoice } from './grading';

describe('gradeChoice', () => {
  it('marks the stored answer as correct', () => {
    expect(gradeChoice(firstQuestQuestions[0], 2)).toEqual({
      correct: true,
      feedback: firstQuestQuestions[0].explanation,
    });
  });

  it('returns the hint for an incorrect answer', () => {
    expect(gradeChoice(firstQuestQuestions[0], 0)).toEqual({
      correct: false,
      feedback: firstQuestQuestions[0].hint,
    });
  });
});
