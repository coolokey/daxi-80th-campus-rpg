import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LearningRecommendation } from './LearningRecommendation';

it('shows the rule-based prototype disclosure and a review recommendation', () => {
  render(<LearningRecommendation events={[{ questionId: 'a', concept: 'integer', correct: false, usedHint: true }]} />);
  expect(screen.getByRole('heading', { name: '適性任務建議' })).toBeInTheDocument();
  expect(screen.getByText('建議先複習整數運算')).toBeInTheDocument();
  expect(screen.getByText('本機規則原型，尚未串接生成式 AI。')).toBeInTheDocument();
});
