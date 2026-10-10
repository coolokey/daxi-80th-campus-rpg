import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { DialoguePanel } from './DialoguePanel';

it('allows the learner to accept the energy-core quest', async () => {
  const accept = vi.fn();
  render(<DialoguePanel onAccept={accept} />);
  await userEvent.setup().click(screen.getByRole('button', { name: '接受任務' }));
  expect(accept).toHaveBeenCalledOnce();
});
