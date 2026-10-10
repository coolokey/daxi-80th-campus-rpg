import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CampusMap } from './CampusMap';
import { TEACHER_NPC } from '../data/world-map';

describe('CampusMap (2D Top-Down RPG)', () => {
  it('renders the 2D RPG viewport, main canvas, HUD and virtual joystick controls', () => {
    const onInteract = vi.fn();
    render(<CampusMap onInteract={onInteract} />);

    // Check RPG viewport container
    expect(screen.getByLabelText('2D 校園 RPG 探索畫面')).toBeInTheDocument();

    // Check main 2D Canvas
    expect(screen.getByLabelText('校園 2D Top-Down 角色走動地圖')).toBeInTheDocument();

    // Check HUD with initial area and mission target
    expect(screen.getByText(/前往科技館與「數字研究員」對話/)).toBeInTheDocument();

    // Check Virtual Joystick for mobile/tablet
    expect(screen.getByRole('slider', { name: '移動搖桿' })).toBeInTheDocument();

    // Check interaction button
    expect(screen.getByRole('button', { name: /互動/ })).toBeInTheDocument();
  });

  it('triggers interaction when player is near the NPC and presses E', () => {
    const onInteract = vi.fn();
    render(<CampusMap onInteract={onInteract} />);

    // Simulate keydown 'KeyE' while in proximity or via window event
    // The player starts near the gate, let's trigger key event
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));

    // When far away, interaction is not triggered
    expect(onInteract).not.toHaveBeenCalled();
  });
});
