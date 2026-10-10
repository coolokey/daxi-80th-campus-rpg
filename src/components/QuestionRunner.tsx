import { useState } from 'react';
import { firstQuestQuestions } from '../data/questions';
import { gradeChoice } from '../domain/grading';
import type { LearningEvent } from '../types/game';

type Props = {
  onComplete: () => void;
  onEvent: (event: LearningEvent) => void;
};

export function QuestionRunner({ onComplete, onEvent }: Props) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  const question = firstQuestQuestions[index];

  const choose = (choice: number) => {
    setLastSelected(choice);
    const result = gradeChoice(question, choice);
    const eventUsedHint = usedHint || showHint || !result.correct;

    onEvent({
      questionId: question.id,
      concept: question.concept,
      correct: result.correct,
      usedHint: eventUsedHint,
    });

    setFeedback(result.feedback);

    if (!result.correct) {
      setUsedHint(true);
      setHasError(true);
      return;
    }

    // Correct answer
    setHasError(false);
    if (index + 1 === firstQuestQuestions.length) {
      onComplete();
      return;
    }

    setIndex((current) => current + 1);
    setFeedback('');
    setUsedHint(false);
    setShowHint(false);
    setShowExplanation(false);
    setLastSelected(null);
  };

  const handleRetry = () => {
    setFeedback('');
    setHasError(false);
    setLastSelected(null);
  };

  const toggleHint = () => {
    setShowHint((prev) => !prev);
    setUsedHint(true);
  };

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  return (
    <section aria-label="能源核心任務" className="question-runner">
      <div className="runner-header">
        <p className="progress-label">
          {index + 1} / {firstQuestQuestions.length}
        </p>
        <p className="concept-label">七年級數學校準任務：{question.concept === 'integer' ? '正負數運算' : question.concept === 'exponent' ? '指數與乘方' : '因數與質數'}</p>
      </div>

      <h2 className="question-prompt">{question.prompt}</h2>

      <div className="choice-grid">
        {question.choices.map((choice, choiceIndex) => {
          const isSelected = lastSelected === choiceIndex;
          const isErrorChoice = isSelected && hasError;
          return (
            <button
              key={`${question.id}-${choice}`}
              className={`choice-button ${isErrorChoice ? 'choice-button--error' : ''}`}
              onClick={() => choose(choiceIndex)}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* Auxiliary Learning Tools: Hint, Explanation, Retry */}
      <div className="learning-tools-bar">
        <button
          type="button"
          className="tool-btn hint-toggle-btn"
          onClick={toggleHint}
          aria-expanded={showHint}
        >
          💡 {showHint ? '隱藏提示' : '查看解題提示 (Hint)'}
        </button>

        <button
          type="button"
          className="tool-btn exp-toggle-btn"
          onClick={toggleExplanation}
          aria-expanded={showExplanation}
        >
          📖 {showExplanation ? '隱藏詳解' : '查看觀念詳解 (Explanation)'}
        </button>

        {hasError && (
          <button
            type="button"
            className="tool-btn retry-btn"
            onClick={handleRetry}
          >
            🔄 重新嘗試本題 (Retry)
          </button>
        )}
      </div>

      {/* Hint card */}
      {showHint && (
        <div className="hint-card" role="note">
          <span className="hint-badge">💡 解題提示</span>
          <p className="hint-text">{question.hint}</p>
        </div>
      )}

      {/* Explanation card */}
      {showExplanation && (
        <div className="explanation-card" role="note">
          <span className="exp-badge">📖 觀念詳解</span>
          <p className="exp-text">{question.explanation}</p>
        </div>
      )}

      {/* Feedback banner */}
      {feedback && (
        <p role="status" className={`feedback ${hasError ? 'feedback--error' : 'feedback--success'}`}>
          {feedback}
        </p>
      )}
    </section>
  );
}
