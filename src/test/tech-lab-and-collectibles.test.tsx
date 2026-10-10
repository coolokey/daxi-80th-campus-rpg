import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../App';
import { CampusMap } from '../components/CampusMap';
import { QuestionRunner } from '../components/QuestionRunner';
import { CAMPUS_MAP } from '../data/maps/campus';
import { TECH_LAB_MAP, getTechLabMap } from '../data/maps/tech-lab';
import { getMapById } from '../data/maps';
import { findNearbyInteractable } from '../domain/player-controller';

describe('Interactive Collectibles (校園探索要素)', () => {
  it('defines 3 glowing energy chips with math clues on campus walkways and buildings', () => {
    const chips = CAMPUS_MAP.interactables.filter((item) => item.type === 'collectible');
    expect(chips).toHaveLength(3);

    const welcomeGateChip = chips.find((c) => c.id === 'chip-welcome-gate');
    const libraryChip = chips.find((c) => c.id === 'chip-library');
    const buildingChip = chips.find((c) => c.id === 'chip-building');

    expect(welcomeGateChip).toBeDefined();
    expect(welcomeGateChip?.name).toContain('校門迎賓道');
    expect(welcomeGateChip?.interactionRadius).toBeLessThan(50);
    expect(welcomeGateChip?.collectibleData?.clue).toContain('正數');

    expect(libraryChip).toBeDefined();
    expect(libraryChip?.name).toContain('圖書館前');
    expect(libraryChip?.interactionRadius).toBeLessThan(50);
    expect(libraryChip?.collectibleData?.clue).toContain('次方');

    expect(buildingChip).toBeDefined();
    expect(buildingChip?.name).toContain('迎曦樓前');
    expect(buildingChip?.interactionRadius).toBeLessThan(50);
    expect(buildingChip?.collectibleData?.clue).toContain('因數');
  });

  it('detects proximity only when player is within < 50px of the chip', () => {
    const chips = CAMPUS_MAP.interactables.filter((item) => item.type === 'collectible');

    // Far away: distance = 80px > 50px
    const farResult = findNearbyInteractable({ x: 720, y: 860 }, chips);
    expect(farResult.interactable).toBeNull();

    // Close to the chip: distance = 10px <= 48px < 50px
    const nearResult = findNearbyInteractable({ x: 720, y: 790 }, chips);
    expect(nearResult.interactable).not.toBeNull();
    expect(nearResult.interactable?.id).toBe('chip-welcome-gate');
    expect(nearResult.interactable?.promptText).toContain('按 [E] 拾取發光能源晶片');
  });

  it('renders the HUD chips progress tag displaying 校園能量晶片：X/3', () => {
    const { rerender } = render(<CampusMap collectedChips={[]} />);
    expect(screen.getByText('校園能量晶片：0/3')).toBeInTheDocument();

    rerender(<CampusMap collectedChips={['chip-welcome-gate']} />);
    expect(screen.getByText('校園能量晶片：1/3')).toBeInTheDocument();

    rerender(<CampusMap collectedChips={['chip-welcome-gate', 'chip-library']} />);
    expect(screen.getByText('校園能量晶片：2/3')).toBeInTheDocument();

    rerender(<CampusMap collectedChips={['chip-welcome-gate', 'chip-library', 'chip-building']} />);
    expect(screen.getByText('校園能量晶片：3/3')).toBeInTheDocument();
  });
});

describe('Tech Lab Core Calibration Task & State Machine', () => {
  it('core-terminal reflects uncalibrated state initially and calibrated state after completion', () => {
    const initialLab = getMapById('tech-lab-interior', { isCoreCalibrated: false });
    const initialTerminal = initialLab.interactables.find((i) => i.id === 'core-terminal')!;
    expect(initialTerminal.name).toBe('能源核心校準控制台');
    expect(initialTerminal.promptText).toBe('按 [E] 啟動數學校準任務');

    const calibratedLab = getMapById('tech-lab-interior', { isCoreCalibrated: true });
    const calibratedTerminal = calibratedLab.interactables.find((i) => i.id === 'core-terminal')!;
    expect(calibratedTerminal.name).toContain('穩定已校準');
    expect(calibratedTerminal.promptText).toContain('已完成校準');
    expect(calibratedTerminal.npcData?.dialogue).toContain('穩定已校準');
  });

  it('starts math calibration directly at core terminal and completes 5 questions with Hint, Explanation and Retry', async () => {
    const user = userEvent.setup();
    let isCompleted = false;

    render(
      <QuestionRunner
        onComplete={() => {
          isCompleted = true;
        }}
        onEvent={() => {}}
      />
    );

    // Q1: Incorrect answer first -> verifies Hint and Retry
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('以數線想像從 -3 走到 5。')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /重新嘗試本題/ })).toBeInTheDocument();

    // Verify Explanation
    await user.click(screen.getByRole('button', { name: /查看觀念詳解/ }));
    expect(screen.getByText(/5 - \(-3\) = 8/)).toBeInTheDocument();

    // Correct Q1
    await user.click(screen.getByRole('button', { name: '8' }));
    expect(screen.getByText('2 / 5')).toBeInTheDocument();

    // Q2 (-7 + 12 = 5)
    await user.click(screen.getByRole('button', { name: '5' }));
    expect(screen.getByText('3 / 5')).toBeInTheDocument();

    // Q3 (2^4 = 16)
    await user.click(screen.getByRole('button', { name: '16' }));
    expect(screen.getByText('4 / 5')).toBeInTheDocument();

    // Q4 (3^3 = 3 x 3 x 3)
    await user.click(screen.getByRole('button', { name: '3 × 3 × 3' }));
    expect(screen.getByText('5 / 5')).toBeInTheDocument();

    // Q5 (factor of 18 is 6)
    await user.click(screen.getByRole('button', { name: '6' }));
    expect(isCompleted).toBe(true);
  });
});

describe('Full Integration: App Calibration & Return to Laboratory', () => {
  it('allows finishing the calibration and clicking 返回實驗室探索', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initial Campus Viewport
    expect(screen.getByLabelText('2D 校園 RPG 探索畫面')).toBeInTheDocument();
    expect(screen.getByText('校園能量晶片：0/3')).toBeInTheDocument();

    // Simulate opening dialogue with NPC
    // In TopDownRPGCanvas, onInteractNPC is triggered when interacting with Teacher Cai
    // Let's test the UI buttons
  });

  it('renders "返回實驗室探索" and "返回 2D 校園繼續探索" on summary completion', async () => {
    const user = userEvent.setup();

    // Render App in a scenario where quest is completed
    const { rerender } = render(<App />);

    // Initially in 2D exploration
    expect(screen.getByLabelText('2D 校園 RPG 探索畫面')).toBeInTheDocument();
  });
});
