import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { TeacherSummary } from './TeacherSummary';

it('shows concept-level counts without learner names', () => {
  render(<TeacherSummary events={[{ questionId: 'x', concept: 'integer', correct: false, usedHint: true }]} />);
  expect(screen.getByText('整數運算')).toBeInTheDocument();
  expect(screen.getByText('正確 0 / 1')).toBeInTheDocument();
  expect(screen.queryByText(/姓名|學號/)).not.toBeInTheDocument();
});
