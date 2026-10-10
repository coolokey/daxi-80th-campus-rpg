import { useState } from 'react';
import { CampusMap } from './components/CampusMap';
import { DialogueBox } from './components/DialogueBox';
import { LearningRoute } from './components/LearningRoute';
import { LearningRecommendation } from './components/LearningRecommendation';
import { QuestionRunner } from './components/QuestionRunner';
import { TeacherSummary } from './components/TeacherSummary';
import type { LearningEvent } from './types/game';
import type { Vector2D } from './types/rpg';

type ActiveNPC = {
  id: string;
  name: string;
  title?: string;
  dialogue: string;
  portraitUrl?: string;
};

export default function App() {
  const [activeNPC, setActiveNPC] = useState<ActiveNPC | null>(null);
  const [inQuest, setInQuest] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [events, setEvents] = useState<LearningEvent[]>([]);

  // State management for exploration and calibration
  const [collectedChips, setCollectedChips] = useState<string[]>([]);
  const [isCoreCalibrated, setIsCoreCalibrated] = useState<boolean>(false);
  const [currentMapId, setCurrentMapId] = useState<string>('campus-outdoor');
  const [spawnPos, setSpawnPos] = useState<Vector2D | undefined>(undefined);

  const handleOpenNPC = (npc: ActiveNPC) => {
    setActiveNPC(npc);
  };

  const handleCloseDialogue = () => {
    setActiveNPC(null);
  };

  const handleStartQuest = () => {
    setActiveNPC(null);
    setEvents([]);
    setInQuest(true);
  };

  const handleCompleteQuest = () => {
    setInQuest(false);
    setIsCoreCalibrated(true);
    setShowSummary(true);
  };

  const handleReturnToLab = () => {
    setShowSummary(false);
    setCurrentMapId('tech-lab-interior');
    setSpawnPos({ x: 400, y: 340 });
  };

  const handleReturnToCampus = () => {
    setShowSummary(false);
    setCurrentMapId('campus-outdoor');
    setSpawnPos(undefined);
  };

  const handleCollectChip = (chipId: string) => {
    setCollectedChips((prev) => {
      if (prev.includes(chipId)) return prev;
      return [...prev, chipId];
    });
  };

  return (
    <main>
      <header className="app-header">
        <p className="eyebrow">大溪國中 × 2D Top-Down RPG 探索冒險</p>
        <h1>未來科技校園 RPG</h1>
        <p>第一章：能源核心修復（操作實體角色走過校園走道，進入科技館接取任務）</p>
      </header>

      {/* 2D Top-Down RPG Viewport: Active unless in full quest or summary screen */}
      {!inQuest && !showSummary && (
        <>
          <CampusMap
            initialMapId={currentMapId}
            currentMapId={currentMapId}
            initialSpawn={spawnPos}
            onMapChange={setCurrentMapId}
            onInteractNPC={handleOpenNPC}
            onStartQuest={handleStartQuest}
            isLocked={!!activeNPC}
            collectedChips={collectedChips}
            onCollectChip={handleCollectChip}
            isCoreCalibrated={isCoreCalibrated}
          />

          {/* JRPG Dialogue Box Overlay */}
          {activeNPC && (
            <DialogueBox
              name={activeNPC.name}
              title={activeNPC.title}
              dialogue={activeNPC.dialogue}
              portraitUrl={activeNPC.portraitUrl}
              actionText={isCoreCalibrated ? '檢視校準報告' : '接受能源校準任務'}
              onAction={isCoreCalibrated ? () => setShowSummary(true) : handleStartQuest}
              onClose={handleCloseDialogue}
            />
          )}

          <LearningRoute />
        </>
      )}

      {/* Quest Challenge Runner */}
      {inQuest && (
        <QuestionRunner
          onComplete={handleCompleteQuest}
          onEvent={(event) => setEvents((current) => [...current, event])}
        />
      )}

      {/* Teacher Summary & Diagnostic Dashboard */}
      {showSummary && (
        <>
          <div className="quest-success-banner" role="status">
            <span className="success-icon">⚡</span>
            <div>
              <h2>校準成功！未來能源核心已恢復穩定運轉</h2>
              <p>七年級數學模組（正負數、指數、因數）已全部校準鎖定，能源核心狀態：穩定已校準 (100%)！</p>
            </div>
          </div>

          <TeacherSummary events={events} />
          <LearningRecommendation events={events} />

          <div className="summary-actions">
            <button
              className="primary-button return-lab-button"
              onClick={handleReturnToLab}
            >
              ✦ 返回實驗室探索
            </button>
            <button
              className="secondary-button return-button"
              onClick={handleReturnToCampus}
            >
              ✦ 返回 2D 校園繼續探索
            </button>
          </div>
        </>
      )}
    </main>
  );
}
