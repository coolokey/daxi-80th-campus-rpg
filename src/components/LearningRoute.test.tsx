import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LearningRoute } from './LearningRoute';

it('shows the Grade 7 to Grade 9 learning route and final review', () => {
  render(<LearningRoute />);
  expect(screen.getByRole('heading', { name: '三年數學任務航線' })).toBeInTheDocument();
  expect(screen.getByText('七年級：數與數線')).toBeInTheDocument();
  expect(screen.getByText('八年級：多項式與乘法公式')).toBeInTheDocument();
  expect(screen.getByText('九年級：二次函數')).toBeInTheDocument();
  expect(screen.getByText('能源核心總複習')).toBeInTheDocument();
  expect(screen.getByText('目前可玩')).toBeInTheDocument();
});
