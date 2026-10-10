export type CoreConcept = 'integer' | 'exponent' | 'factor';

export type Concept =
  | CoreConcept
  | 'prime'
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'logic'
  | 'statistics'
  | 'probability'
  | (string & {});

export type ChoiceQuestion = {
  id: string;
  grade: 7 | 8 | 9 | number;
  concept: Concept;
  prompt: string;
  choices: string[];
  answer: number;
  hint: string;
  explanation: string;
};

export type Location = {
  id: string;
  name: string;
  x: number;
  y: number;
  npcId?: string;
};

export type LearningEvent = {
  questionId: string;
  concept: Concept;
  correct: boolean;
  usedHint: boolean;
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PlayerState = {
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  isMoving: boolean;
  walkFrame: number;
  speed: number;
};

export type WorldNPC = {
  id: string;
  name: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  dialogue: string;
};

