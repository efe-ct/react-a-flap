export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  id: number;
  x: number;
  gapY: number;
  gapSize: number;
  width: number;
  passed: boolean;
}

export interface BirdState {
  position: Position;
  velocity: number;
  rotation: number;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver';

export interface GameConfig {
  gravity: number;
  flapStrength: number;
  obstacleSpeed: number;
  obstacleGap: number;
  obstacleWidth: number;
  birdSize: number;
  gameWidth: number;
  gameHeight: number;
}