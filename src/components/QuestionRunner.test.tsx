import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QuestionRunner } from './QuestionRunner';

describe('QuestionRunner (Grade 7 Math Calibration)', () => {
  it('shows a hint after a wrong answer and advances after a correct answer', async () => {
    const user = userEvent.setup();
    render(<QuestionRunner onComplete={vi.fn()} onEvent={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('以數線想像從 -3 走到 5。')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '8' }));
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('allows learner to toggle hint and explanation independently', async () => {
    const user = userEvent.setup();
    render(<QuestionRunner onComplete={vi.fn()} onEvent={vi.fn()} />);

    // Toggle hint before answering
    const hintBtn = screen.getByRole('button', { name: /查看解題提示/i });
    await user.click(hintBtn);
    expect(screen.getByText('以數線想像從 -3 走到 5。')).toBeInTheDocument();

    // Toggle explanation
    const expBtn = screen.getByRole('button', { name: /查看觀念詳解/i });
    await user.click(expBtn);
    expect(screen.getByText(/5 - \(-3\) = 8/i)).toBeInTheDocument();
  });

  it('provides a retry mechanism when an answer is incorrect', async () => {
    const user = userEvent.setup();
    render(<QuestionRunner onComplete={vi.fn()} onEvent={vi.fn()} />);

    // Pick wrong answer
    await user.click(screen.getByRole('button', { name: '2' }));
    const retryBtn = screen.getByRole('button', { name: /重新嘗試本題/i });
    expect(retryBtn).toBeInTheDocument();

    // Click retry
    await user.click(retryBtn);
    expect(screen.queryByRole('button', { name: /重新嘗試本題/i })).not.toBeInTheDocument();
  });

  it('advances through all 5 Grade 7 questions and calls onComplete upon finishing', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<QuestionRunner onComplete={onComplete} onEvent={vi.fn()} />);

    // Q1: '8'
    await user.click(screen.getByRole('button', { name: '8' }));
    // Q2: '5'
    await user.click(screen.getByRole('button', { name: '5' }));
    // Q3: '16'
    await user.click(screen.getByRole('button', { name: '16' }));
    // Q4: '3 × 3 × 3'
    await user.click(screen.getByRole('button', { name: '3 × 3 × 3' }));
    // Q5: '6'
    await user.click(screen.getByRole('button', { name: '6' }));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
