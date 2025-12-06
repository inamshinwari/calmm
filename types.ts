export enum ButtonType {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  ACTION = 'ACTION', // Clear, Delete, Equals
}

export interface CalcButton {
  label: string;
  value: string;
  type: ButtonType;
  className?: string; // Optional custom styling override
}

export type Operator = '+' | '-' | '*' | '/' | '%';
