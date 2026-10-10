import { describe, expect, it } from 'vitest';
import { firstQuestQuestions } from './questions';

describe('firstQuestQuestions', () => {
  it('contains five original Grade 7 questions with feedback', () => {
    expect(firstQuestQuestions).toHaveLength(5);
    for (const question of firstQuestQuestions) {
      expect(question.grade).toBe(7);
      expect(question.prompt.length).toBeGreaterThan(0);
      expect(question.hint.length).toBeGreaterThan(0);
      expect(question.explanation.length).toBeGreaterThan(0);
    }
  });
});
