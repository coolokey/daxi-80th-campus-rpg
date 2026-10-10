import type { ChoiceQuestion } from '../types/game';

export function gradeChoice(question: ChoiceQuestion, selected: number) {
  const correct = question.answer === selected;
  return { correct, feedback: correct ? question.explanation : question.hint };
}
