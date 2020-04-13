export type position = [number, number];

export type SnakeSpace = Array<position>;

export type BBox = [[number, number], [number, number]];
export enum MODES {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
  crazy = 'crazy'
}
export const MODE_SPEED: {
  [key in MODES]: number
} = {
  easy: 1000,
  medium: 500,
  hard: 200,
  crazy: 50
};
