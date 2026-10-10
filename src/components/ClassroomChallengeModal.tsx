import { useState } from 'react';
import type { ClassroomChallenge } from '../data/challenges';
import { gradeChoice } from '../domain/grading';
import type { LearningEvent } from '../types/game';
import { soundManager } from '../domain/audio';

type Props = {
  challenge: ClassroomChallenge;
  mode?: 'story' | 'practice';
  onClose: () => void;
  onComplete: (challengeId: string, badge?: string) => void;
  onEvent?: (event: LearningEvent) => void;
};

export function ClassroomChallengeModal({
  challenge,
  mode = 'story',
  onClose,
  onComplete,
  onEvent,
}: Props) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const questions = challenge.questions;
  const currentQuestion = questions[index];

  const handleSelectChoice = (choiceIndex: number) => {
    setLastSelected(choiceIndex);
    const result = gradeChoice(currentQuestion, choiceIndex);
    const eventUsedHint = usedHint || showHint || !result.correct;

    onEvent?.({
      questionId: currentQuestion.id,
      concept: currentQuestion.concept,
      correct: result.correct,
      usedHint: eventUsedHint,
    });

    setFeedback(result.feedback);

    if (!result.correct) {
      soundManager.playBlip();
      setUsedHint(true);
      setHasError(true);
      return;
    }

    soundManager.playCollectChip();
    setHasError(false);

    if (index + 1 >= questions.length) {
      setIsFinished(true);
      if (challenge.id === 'challenge-daxi-80th') {
        soundManager.playAnniversaryFanfare();
      } else {
        soundManager.playMonumentChime();
      }
      onComplete(challenge.id, challenge.easterEggBadge);
      return;
    }

    // Advance to next question after brief moment
    setTimeout(() => {
      setIndex((c) => c + 1);
      setFeedback('');
      setUsedHint(false);
      setShowHint(false);
      setShowExplanation(false);
      setLastSelected(null);
    }, 400);
  };

  const handleRetryCurrent = () => {
    setFeedback('');
    setHasError(false);
    setLastSelected(null);
  };

  const handleRestart = () => {
    setIndex(0);
    setFeedback('');
    setUsedHint(false);
    setShowHint(false);
    setShowExplanation(false);
    setHasError(false);
    setLastSelected(null);
    setIsFinished(false);
  };

  return (
    <div className="classroom-modal-backdrop" role="dialog" aria-modal="true" aria-label={challenge.title}>
      <div className="classroom-modal-container animate-scale-up">
        {/* Modal Header */}
        <div className="classroom-modal-header">
          <div className="modal-header-titles">
            <div className="modal-room-tag">
              <span className="room-icon">🏫</span>
              <span>{challenge.roomName}</span>
              {challenge.isEasterEgg && <span className="easter-egg-tag">✨ 彩蛋任務</span>}
              {mode === 'practice' && <span className="practice-tag">🔄 自主演練</span>}
            </div>
            <h2 className="modal-title">{challenge.title}</h2>
            <p className="modal-subtitle">核心領域：{challenge.conceptTitle}</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="關閉挑戰"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        {!isFinished && currentQuestion ? (
          <div className="classroom-modal-body">
            {/* Progress Bar */}
            <div className="challenge-progress-bar">
              <div className="progress-info">
                <span>題目進度：第 {index + 1} / {questions.length} 題</span>
                <span>{Math.round(((index) / questions.length) * 100)}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${((index + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Prompt */}
            <div className="challenge-question-card">
              <h3 className="challenge-prompt">{currentQuestion.prompt}</h3>
            </div>

            {/* Choices Grid */}
            <div className="challenge-choice-grid">
              {currentQuestion.choices.map((choice, i) => {
                const isSelected = lastSelected === i;
                const isError = isSelected && hasError;
                const isSuccess = isSelected && !hasError && feedback.includes('正確');
                return (
                  <button
                    key={`${currentQuestion.id}-${choice}`}
                    className={`challenge-choice-btn ${isError ? 'btn-choice-error' : ''} ${
                      isSuccess ? 'btn-choice-success' : ''
                    }`}
                    onClick={() => handleSelectChoice(i)}
                    disabled={isSelected && !hasError && feedback.length > 0}
                  >
                    <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="choice-text">{choice}</span>
                  </button>
                );
              })}
            </div>

            {/* Learning Auxiliary Toolbar */}
            <div className="challenge-tools-bar">
              <button
                type="button"
                className={`tool-pill ${showHint ? 'tool-pill-active' : ''}`}
                onClick={() => setShowHint((p) => !p)}
              >
                💡 {showHint ? '收合解題提示' : '解題提示 (Hint)'}
              </button>

              <button
                type="button"
                className={`tool-pill ${showExplanation ? 'tool-pill-active' : ''}`}
                onClick={() => setShowExplanation((p) => !p)}
              >
                📖 {showExplanation ? '收合觀念詳解' : '觀念詳解 (Explanation)'}
              </button>

              {hasError && (
                <button
                  type="button"
                  className="tool-pill tool-pill-retry"
                  onClick={handleRetryCurrent}
                >
                  🔄 重新作答 (Retry)
                </button>
              )}
            </div>

            {/* Expandable Hint Box */}
            {showHint && (
              <div className="challenge-hint-box" role="note">
                <strong className="hint-label">💡 解題指引：</strong>
                <p>{currentQuestion.hint}</p>
              </div>
            )}

            {/* Expandable Explanation Box */}
            {showExplanation && (
              <div className="challenge-explanation-box" role="note">
                <strong className="exp-label">📖 數學觀念詳解：</strong>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Dynamic Result Feedback */}
            {feedback && (
              <div
                className={`challenge-feedback ${
                  hasError ? 'feedback-is-error' : 'feedback-is-success'
                }`}
                role="status"
              >
                {hasError ? '⚠️ ' : '🎉 '}
                {feedback}
              </div>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <div className="classroom-modal-completed">
            <div className="completion-icon-wrapper animate-bounce">
              {challenge.isEasterEgg ? '🏆' : '✨'}
            </div>
            <h3>恭喜！順利完成【{challenge.title}】</h3>
            <p>你已全數掌握 {challenge.conceptTitle} 的重點概念與運算技能！</p>

            {challenge.easterEggBadge && (
              <div className="easter-egg-unlock-badge">
                <span className="badge-sparkle">✦ 成就解鎖 ✦</span>
                <strong>{challenge.easterEggBadge}</strong>
              </div>
            )}

            <div className="completion-modal-actions">
              <button
                type="button"
                className="modal-action-btn primary-btn"
                onClick={handleRestart}
              >
                🔄 重新演練 (Practice Mode)
              </button>
              <button
                type="button"
                className="modal-action-btn secondary-btn"
                onClick={onClose}
              >
                ✦ 繼續探索校園
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
